import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/events";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  // CHECK LOGIN STATUS
  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", updateAuth);

    return () => {
      window.removeEventListener("authChange", updateAuth);
    };
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">
          Event<span>Planner</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>

           {isLoggedIn && (
           <>
            <Link to="/dashboard">Dashboard</Link>

             {JSON.parse(localStorage.getItem("user"))?.is_admin === 1 && (
             <Link to="/admin">Admin</Link>
           )}
           </>
         )}
        </div>

        <div className="nav-buttons">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="logout-nav-button"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/events" element={<Events />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
        
          path="/admin"
          element={
          <ProtectedRoute adminOnly={true}>
          <AdminDashboard />
          </ProtectedRoute>
         }
        />
      </Routes>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Event<span>Planner</span>
            </Link>

            <p>
              Creating unforgettable experiences,
              one event at a time.
            </p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>

            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className="footer-column">
            <h3>Account</h3>

            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>

                <Link to="/register">
                  Create Account
                </Link>
              </>
            ) : (
              <button
                className="footer-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>

          <div className="footer-column">
            <h3>Contact</h3>

            <span>Lagos, Nigeria</span>
            <span>hello@eventplanner.com</span>
            <span>+234 800 000 0000</span>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © 2026 EventPlanner. All rights reserved.
          </p>

          <p>
            Plan. Celebrate. Remember.
          </p>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;