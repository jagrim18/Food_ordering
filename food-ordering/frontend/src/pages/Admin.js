// src/pages/Admin.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Here you can manage orders, menu items, and users.</p>

      <div className="admin-sections">
        {/* Orders Section */}
        <div className="admin-card">
          <h2>📦 Orders</h2>
          <p>View and update customer orders.</p>
          <button onClick={() => navigate("/admin/orders")}>
            Manage Orders
          </button>
        </div>

        {/* Menu Items Section */}
        <div className="admin-card">
          <h2>🍴 Menu Items</h2>
          <p>Add, edit, or delete food items.</p>
          <button onClick={() => navigate("/admin/menu")}>
            Manage Menu
          </button>
        </div>

        {/* Users Section */}
        <div className="admin-card">
          <h2>👤 Users</h2>
          <p>Manage registered users and admins.</p>
          <button onClick={() => navigate("/admin/users")}>
            Manage Users
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
