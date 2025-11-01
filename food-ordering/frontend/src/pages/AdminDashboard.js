// src/pages/AdminDashboard.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Redirect if not logged in as admin
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-header">
        <h1>👨‍💼 Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>52</p>
        </div>
        <div className="stat-card">
          <h3>Total Restaurants</h3>
          <p>10</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>243</p>
        </div>
      </div>

      <div className="admin-content">
        <h2>Manage System</h2>
        <p>
          This area will allow the admin to manage users, restaurants, and orders.
          You can later add CRUD features here easily.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
