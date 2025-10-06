// src/pages/RestaurantRegister.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RestaurantAuth.css";

function RestaurantRegister() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/restaurants/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("Restaurant Registered Response:", data);

      if (res.ok) {
        alert("Restaurant registered successfully ✅");
        navigate("/restaurant/login"); // ✅ redirect to login page
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error registering restaurant:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Restaurant Registration</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/restaurant/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RestaurantRegister;
