import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("Loading your bookings...");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const getBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/user/${user.id}` 
        ); 
 
        const data = await response.json(); 
 
        if (response.ok) { 
          setBookings(data); 
          setMessage(""); 
        } else { 
          setMessage("Failed to load your bookings."); 
        } 
      } catch (error) { 
        console.error(error); 
        setMessage("Cannot connect to server."); 
      } 
    }; 
 
    getBookings(); 
  }, [navigate, user?.id]); 
 
  const handleLogout = () => { 
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
 
    navigate("/login"); 
  }; 
 
  return ( 
    <div className="dashboard-page"> 
 
      {/* DASHBOARD HEADER */} 
 
      <section className="dashboard-header"> 
 
        <div> 
          <p>YOUR EVENTPLANNER ACCOUNT</p> 
 
          <h1> 
            Welcome, {user?.name || "Guest"} 👋 
          </h1> 
 
          <span> 
            Manage your events and bookings from one place. 
          </span> 
        </div> 
 
        <button 
          className="logout-button" 
          onClick={handleLogout} 
        > 
          Logout 
        </button> 
 
      </section> 
 
 
      {/* QUICK ACTIONS */} 
 
      <section className="dashboard-actions"> 
 
        <Link to="/events" className="dashboard-action"> 
 
          <div className="dashboard-action-icon"> 
            🎟️ 
          </div> 
 
          <div> 
            <strong>Browse Events</strong> 
            <small> 
              Discover upcoming events 
            </small> 
          </div> 
 
          <span className="action-arrow"> 
            → 
          </span> 
 
        </Link> 
 
 
        <Link to="/events" className="dashboard-action"> 
 
          <div className="dashboard-action-icon"> 
            📅 
          </div> 
 
          <div> 
            <strong>Book an Event</strong> 
            <small> 
              Reserve your next experience 
            </small> 
          </div> 
 
          <span className="action-arrow"> 
            → 
          </span> 
 
        </Link> 
 
      </section> 
 
 
      {/* BOOKINGS */} 
 
      <section className="bookings-section"> 
 
        <div className="bookings-heading"> 
 
          <div> 
            <p>YOUR ACTIVITY</p> 
            <h2>Your Bookings</h2> 
          </div> 
 
          <span> 
            {bookings.length} booking 
            {bookings.length !== 1 ? "s" : ""} 
          </span> 
 
        </div> 
 
 
        {message && ( 
          <div className="dashboard-message"> 
            {message} 
          </div> 
        )} 
 
 
        {/* EMPTY STATE */} 
 
        {bookings.length === 0 && !message && ( 
 
          <div className="empty-bookings"> 
 
            <div className="empty-icon"> 
              📅 
            </div> 
 
            <h3> 
              No bookings yet 
            </h3> 
 
            <p> 
              You haven't booked an event yet. 
              Discover an event and reserve your place. 
            </p> 
 
            <Link to="/events"> 
              Explore Events → 
            </Link> 
 
          </div> 
 
        )} 
 
 
        {/* BOOKING LIST */} 
 
        <div className="booking-list"> 
 
          {bookings.map((booking) => ( 
 
            <div 
              className="booking-card" 
              key={booking.id} 
            > 
 
              <div className="booking-icon"> 
                🎉 
              </div> 
 
 
              <div className="booking-details"> 
 
                <p> 
                  {booking.event_date} 
                </p> 
 
                <h3> 
                  {booking.title} 
                </h3> 
 
                <span> 
                  📍 {booking.location} 
                </span> 
 
                <span> 
                  🕐 {booking.event_time} 
                </span> 
 
              </div> 
 
 
              <div className="booking-right"> 
 
                <strong> 
                  ₦{Number(booking.price).toLocaleString()} 
                </strong> 
 
                <span className="booking-status"> 
                  {booking.booking_status} 
                </span> 
 
              </div> 
 
            </div> 
 
          ))} 
 
        </div> 
 
      </section> 
 
    </div> 
  ); 
} 
 
export default Dashboard; 