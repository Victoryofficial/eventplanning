import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save login information
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Tell the app that login status changed
        window.dispatchEvent(new Event("authChange"));

        // Check if the logged-in user is an admin
        if (data.user.is_admin === 1) {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-heading">
          <p>WELCOME BACK</p>

          <h1>Login to your account</h1>

          <span>
            Manage your bookings and discover amazing events.
          </span>
        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        <div className="auth-footer">
          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;