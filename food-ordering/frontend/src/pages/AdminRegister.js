import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function AdminRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // ✅ Call backend /auth/admin/register API
    // If success:
    navigate("/admin/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Admin Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
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
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/admin/login")} className="auth-link">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;
