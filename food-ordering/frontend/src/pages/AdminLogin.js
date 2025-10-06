// src/pages/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ Save admin user to localStorage
      if (res.data.user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(res.data));
        navigate("/admin");
      } else {
        setError("Not authorized as Admin");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>🔑 admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
