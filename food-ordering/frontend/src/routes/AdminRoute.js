// src/routes/AdminRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  // ✅ Check role from AuthContext OR fallback to localStorage
  const isAdmin =
    user?.role === "admin" || localStorage.getItem("isAdmin") === "true";

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

export default AdminRoute;
