import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("Loading events...");

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/events"
        );

        const data = await response.json();

        if (response.ok) {
          setEvents(data);
          setMessage("");
        } else {
          setMessage("Failed to load events");
        }
      } catch (error) {
        console.error(error);
        setMessage("Cannot connect to server");
      }
    };

    getEvents();
  }, []);

  const handleBooking = async (eventId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setMessage("Please login before booking an event.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            event_id: eventId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Event booked successfully! 🎉");
      } else {
        setMessage(data.message || "Booking failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  };

  return (
    <div className="events-page">

      {/* HEADER */}

      <section className="events-header">

        <p>DISCOVER YOUR NEXT EXPERIENCE</p>

        <h1>Upcoming Events</h1>

        <span>
          Find an event you love and reserve your place today.
        </span>

      </section>


      {/* MESSAGE */}

      {message && (
        <div className="event-message">
          {message}
        </div>
      )}


      {/* EVENTS */}

      <section className="events-grid">

        {events.map((event, index) => (

          <div className="event-card" key={event.id}>

            {/* IMAGE */}

            <div className="event-image">

              <img
                src={
                  [
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80"
                  ][index % 4]
                }
                alt={event.title}
              />

              <span className="event-category">
                EVENT
              </span>

            </div>


            {/* CONTENT */}

            <div className="event-content">

              <p className="event-date">
                {event.event_date}
              </p>

              <h2>
                {event.title}
              </h2>

              <p className="event-description">
                {event.description}
              </p>


              {/* EVENT INFO */}

              <div className="event-info">

                <span>
                  📍 {event.location}
                </span>

                <span>
                  🕐 {event.event_time}
                </span>

              </div>


              {/* BOTTOM */}

              <div className="event-bottom">

                <strong>
                  ₦{Number(event.price).toLocaleString()}
                </strong>

                <button
                  onClick={() => handleBooking(event.id)}
                >
                  Book Event →
                </button>

              </div>

            </div>

          </div>

        ))}

      </section>

    </div>
  );
}

export default Events;