import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);

      // ✅ Redirect user based on role
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (storedUser?.role === "restaurant") {
        navigate("/restaurant/dashboard");
      } else {
        navigate("/restaurants");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">
            SIGN IN
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <Link to="/register" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
