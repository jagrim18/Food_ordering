import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const navigate = useNavigate();



  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/menu"); // ✅ redirect logged-in users
    }
  }, [navigate]);


  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>🍴 Welcome to Foodify</h1>
        <p>Order your favorite meals online and track them in real-time 🚀</p>
        <div className="welcome-buttons">
          <button onClick={() => navigate("/menu")}>Explore Menu</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
