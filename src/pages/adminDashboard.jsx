import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
  });

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  // EVENT FORM
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    event_time: "",
    price: "",
  });

  // ID OF EVENT CURRENTLY BEING EDITED
  const [editingEventId, setEditingEventId] = useState(null);

  // ==============================
  // LOAD ADMIN DATA
  // ==============================

  const loadAdminData = async () => {
    try {
      // STATISTICS
      const statsResponse = await fetch(
        "http://localhost:5000/api/admin/stats"
      );

      const statsData = await statsResponse.json();

      if (statsResponse.ok) {
        setStats(statsData);
      }

      // USERS
      const usersResponse = await fetch(
        "http://localhost:5000/api/admin/users"
      );

      const usersData = await usersResponse.json();

      if (usersResponse.ok) {
        setUsers(usersData);
      }

      // BOOKINGS
      const bookingsResponse = await fetch(
        "http://localhost:5000/api/admin/bookings"
      );

      const bookingsData = await bookingsResponse.json();

      if (bookingsResponse.ok) {
        setBookings(bookingsData);
      }

      // EVENTS
      const eventsResponse = await fetch(
        "http://localhost:5000/api/admin/events"
      );

      const eventsData = await eventsResponse.json();

      if (eventsResponse.ok) {
        setEvents(eventsData);
      }
    } catch (error) {
      console.error("Failed to load admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // ==============================
  // HANDLE EVENT FORM
  // ==============================

  const handleEventChange = (e) => {
    setEventForm({
      ...eventForm,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // RESET EVENT FORM
  // ==============================

  const resetEventForm = () => {
    setEventForm({
      title: "",
      description: "",
      location: "",
      event_date: "",
      event_time: "",
      price: "",
    });

    setEditingEventId(null);
  };

  // ==============================
  // CREATE EVENT
  // ==============================

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventForm),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event created successfully!");

        resetEventForm();

        loadAdminData();
      } else {
        alert(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  // ==============================
  // START EDITING EVENT
  // ==============================

  const startEditEvent = (event) => {
    setEditingEventId(event.id);

    setEventForm({
      title: event.title || "",
      description: event.description || "",
      location: event.location || "",
      event_date: event.event_date
        ? String(event.event_date).substring(0, 10)
        : "",
      event_time: event.event_time
        ? String(event.event_time).substring(0, 5)
        : "",
      price: event.price || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==============================
  // UPDATE EVENT
  // ==============================

  const updateEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/events/${editingEventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventForm),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event updated successfully!");

        resetEventForm();

        loadAdminData();
      } else {
        alert(data.message || "Failed to update event");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  // ==============================
  // DELETE EVENT
  // ==============================

  const deleteEvent = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event deleted successfully!");

        loadAdminData();
      } else {
        alert(data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  // ==============================
  // UPDATE BOOKING STATUS
  // ==============================

  const updateBookingStatus = async (
    bookingId,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Booking status updated successfully!");

        loadAdminData();
      } else {
        alert(
          data.message ||
            "Failed to update booking status"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  // ==============================
  // PAGE
  // ==============================

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <p>Welcome, Admin 👋</p>

      {loading ? (
        <p>Loading admin data...</p>
      ) : (
        <>
          {/* ============================== */}
          {/* STATISTICS */}
          {/* ============================== */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            {/* USERS */}

            <div
              style={{
                padding: "25px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                minWidth: "200px",
              }}
            >
              <h2>Total Users</h2>

              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {stats.totalUsers}
              </p>
            </div>

            {/* BOOKINGS */}

            <div
              style={{
                padding: "25px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                minWidth: "200px",
              }}
            >
              <h2>Total Bookings</h2>

              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {stats.totalBookings}
              </p>
            </div>

            {/* EVENTS */}

            <div
              style={{
                padding: "25px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                minWidth: "200px",
              }}
            >
              <h2>Total Events</h2>

              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {events.length}
              </p>
            </div>
          </div>

          {/* ============================== */}
          {/* CREATE / EDIT EVENT */}
          {/* ============================== */}

          <div style={{ marginTop: "50px" }}>
            <h2>
              {editingEventId
                ? "Edit Event"
                : "Create New Event"}
            </h2>

            <form
              onSubmit={
                editingEventId
                  ? updateEvent
                  : handleCreateEvent
              }
              style={{
                maxWidth: "600px",
                marginTop: "20px",
              }}
            >
              {/* TITLE */}

              <input
                type="text"
                name="title"
                placeholder="Event title"
                value={eventForm.title}
                onChange={handleEventChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />

              {/* DESCRIPTION */}

              <textarea
                name="description"
                placeholder="Event description"
                value={eventForm.description}
                onChange={handleEventChange}
                rows="4"
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />

              {/* LOCATION */}

              <input
                type="text"
                name="location"
                placeholder="Event location"
                value={eventForm.location}
                onChange={handleEventChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />

              {/* DATE */}

              <label>Event Date</label>

              <input
                type="date"
                name="event_date"
                value={eventForm.event_date}
                onChange={handleEventChange}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />

              {/* TIME */}

              <label>Event Time</label>

              <input
                type="time"
                name="event_time"
                value={eventForm.event_time}
                onChange={handleEventChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />

              {/* PRICE */}

              <input
                type="number"
                name="price"
                placeholder="Event price"
                value={eventForm.price}
                onChange={handleEventChange}
                min="0"
                step="0.01"
                style={{
                  width: "100%",
                  padding: "12px",
                  marginBottom: "15px",
                  boxSizing: "border-box",
                }}
              />

              {/* SUBMIT */}

              <button
                type="submit"
                style={{
                  padding: "12px 25px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                {editingEventId
                  ? "Update Event"
                  : "Create Event"}
              </button>

              {/* CANCEL EDIT */}

              {editingEventId && (
                <button
                  type="button"
                  onClick={resetEventForm}
                  style={{
                    padding: "12px 25px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* ============================== */}
          {/* MANAGE USERS */}
          {/* ============================== */}

          <div style={{ marginTop: "50px" }}>
            <h2>Manage Users</h2>

            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>

                        <td>{user.name}</td>

                        <td>{user.email}</td>

                        <td>
                          {user.is_admin === 1
                            ? "Admin"
                            : "User"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ============================== */}
          {/* MANAGE BOOKINGS */}
          {/* ============================== */}

          <div style={{ marginTop: "50px" }}>
            <h2>Manage Bookings</h2>

            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Event ID</th>
                      <th>Booking Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>

                        <td>
                          {booking.user_name ||
                            "Unknown User"}
                        </td>

                        <td>
                          {booking.user_email ||
                            "No email"}
                        </td>

                        <td>{booking.event_id}</td>

                        <td>
                          {new Date(
                            booking.booking_date
                          ).toLocaleString()}
                        </td>

                        <td>
                          {booking.booking_status}
                        </td>

                        <td>
                          <select
                            value={
                              booking.booking_status
                            }
                            onChange={(e) =>
                              updateBookingStatus(
                                booking.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="pending">
                              Pending
                            </option>

                            <option value="confirmed">
                              Confirmed
                            </option>

                            <option value="cancelled">
                              Cancelled
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* ============================== */}
          {/* MANAGE EVENTS */}
          {/* ============================== */}

          <div style={{ marginTop: "50px" }}>
            <h2>Manage Events</h2>

            {events.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td>{event.id}</td>

                        <td>{event.title}</td>

                        <td>{event.location}</td>

                        <td>{event.event_date}</td>

                        <td>{event.event_time}</td>

                        <td>{event.price}</td>

                        <td>
                          <button
                            onClick={() =>
                              startEditEvent(event)
                            }
                            style={{
                              padding: "8px 12px",
                              marginRight: "8px",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteEvent(event.id)
                            }
                            style={{
                              padding: "8px 12px",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;