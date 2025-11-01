// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Welcome.css";

// function Welcome() {
//   const navigate = useNavigate();



//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       navigate("/menu"); // ✅ redirect logged-in users
//     }
//   }, [navigate]);


//   return (
//     <div className="welcome-container">
//       <div className="welcome-content">
//         <h1>🍴 Welcome to Foodify</h1>
//         <p>Order your favorite meals online and track them in real-time 🚀</p>
//         <div className="welcome-buttons">
//           <button onClick={() => navigate("/restaurants")}>Explore restaurant</button>
//           <button onClick={() => navigate("/register")}>Register</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Welcome;







import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/menu");
    }
  }, [navigate]);

  return (
    <div className="welcome-page">
      <div className="overlay"></div>
      <div className="welcome-content">
        <h1 className="welcome-title">
          <span className="highlight">🍴 Foodify</span>
        </h1>
        <p className="welcome-tagline">
          Order your favorite meals online and track them in real-time 🚀
        </p>
        <div className="button-group">
          <button className="btn primary" onClick={() => navigate("/restaurants")}>
            Explore Restaurants
          </button>
          <button className="btn secondary" onClick={() => navigate("/register")}>
            Register Now
          </button>
        </div>
      </div>
      <footer className="welcome-footer">
        <p>© {new Date().getFullYear()} Foodify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Welcome;
