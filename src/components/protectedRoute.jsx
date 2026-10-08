import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;

  try {
    user = JSON.parse(userData);
  } catch (error) {
    console.error("Invalid user data");
  }

  if (adminOnly && (!user || user.is_admin !== 1)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;