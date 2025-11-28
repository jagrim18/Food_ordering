// src/routes/UserRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UserRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user === undefined) return null; // prevents early crash

  if (!user || user.role !== "user") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
