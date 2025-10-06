// src/pages/RestaurantLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/RestaurantAuth.css"; // <- import the CSS

function RestaurantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/restaurants/login", { email, password });

      if (res.data) {
        // Save restaurant data to localStorage (keep entire object)
        localStorage.setItem("restaurant", JSON.stringify(res.data));

        // Redirect to dashboard
        navigate("/restaurant/dashboard");
      }
    } catch (err) {
      console.error("Restaurant login error:", err);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="restaurant-auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Restaurant Login</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Email
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </label>

          <label className="auth-label">
            Password
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </label>

          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/restaurant/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default RestaurantLogin;
