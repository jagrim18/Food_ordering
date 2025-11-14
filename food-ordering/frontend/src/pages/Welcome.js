// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Welcome.css";

// function Welcome() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) navigate("/menu");
//   }, [navigate]);

//   return (
//     <div className="welcome-container">
//       {/* HERO SECTION */}
//       <section className="hero-section">
//         <div className="hero-left">
//           {/* === Logo and Text Separated === */}
//           <div className="hero-top">
//             <img
//               src="https://image2url.com/images/1762957718911-cb36f4d6-f6f0-4544-9f69-44c686d3ad14.png"
//               alt="Foodify Logo"
//               className="hero-logo"
//             />
//             <p className="hero-subtitle">Campus Food Ordering</p>
//           </div>

//           <h1>
//             Skip the Line, <br />
//             <span className="highlight">Save Your Time</span>
//           </h1>

//           <p>
//             Order food from your favorite campus outlets and pick it up when it’s ready.
//             No more waiting in long queues!
//           </p>

//           <div className="button-group">
//             <button className="btn primary" onClick={() => navigate("/register")}>
//               Get Started
//             </button>
//             <button className="btn secondary" onClick={() => navigate("/login")}>
//               Sign In
//             </button>
//           </div>
//         </div>

//         {/* RIGHT HERO IMAGE */}
//         <div className="hero-right"></div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="features-section">
//         <h2>Why Choose Campus Food?</h2>
//         <p className="features-subtext">
//           We make ordering food on campus easier, faster, and more convenient.
//         </p>
//         <div className="features-grid">
//           <div className="feature-card">
//             <i className="icon">🍽️</i>
//             <h3>Multiple Outlets</h3>
//             <p>Order from various food outlets across campus</p>
//           </div>
//           <div className="feature-card">
//             <i className="icon">⏰</i>
//             <h3>Quick Pickup</h3>
//             <p>Choose your pickup time and skip the queue</p>
//           </div>
//           <div className="feature-card">
//             <i className="icon">💳</i>
//             <h3>Easy Payment</h3>
//             <p>Pay online or at pickup – your choice</p>
//           </div>
//           <div className="feature-card">
//             <i className="icon">📱</i>
//             <h3>Mobile Friendly</h3>
//             <p>Order from anywhere on campus</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="cta-section">
//         <h2>Ready to Order?</h2>
//         <p>
//           Join thousands of students and faculty already enjoying hassle-free food ordering.
//         </p>
//         <button className="btn light" onClick={() => navigate("/restaurants")}>
//           Start Ordering Now
//         </button>
//       </section>

//       <footer className="welcome-footer">
//         <p>© {new Date().getFullYear()} Foodify. All rights reserved.</p>
//       </footer>
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
    if (user) navigate("/");
  }, [navigate]);

  return (
    <div className="welcome-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="hero-top">
            <img
              src="https://image2url.com/images/1762957718911-cb36f4d6-f6f0-4544-9f69-44c686d3ad14.png"
              alt="Foodify Logo"
              className="hero-logo"
            />
            <p className="hero-subtitle">Campus Food Ordering</p>
          </div>

          <h1>
            Skip the Line, <br />
            <span className="highlight">Save Your Time</span>
          </h1>

          <p>
            Order food from your favorite campus outlets and pick it up when it’s ready.
            No more waiting in long queues!
          </p>

          <div className="button-group">
            <button className="btn primary" onClick={() => navigate("/register")}>
              Get Started
            </button>
          </div>
        </div>

        <div className="hero-right"></div>
      </section>

      <section className="features-section">
        <h2>Why Choose Campus Food?</h2>
        <p className="features-subtext">
          We make ordering food on campus easier, faster, and more convenient.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <i className="icon">🍽️</i>
            <h3>Multiple Outlets</h3>
            <p>Order from various food outlets across campus</p>
          </div>
          <div className="feature-card">
            <i className="icon">⏰</i>
            <h3>Quick Pickup</h3>
            <p>Choose your pickup time and skip the queue</p>
          </div>
          <div className="feature-card">
            <i className="icon">💳</i>
            <h3>Easy Payment</h3>
            <p>Pay online or at pickup – your choice</p>
          </div>
          <div className="feature-card">
            <i className="icon">📱</i>
            <h3>Mobile Friendly</h3>
            <p>Order from anywhere on campus</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Order?</h2>
        <p>
          Join thousands of students and faculty already enjoying hassle-free food ordering.
        </p>
        <button className="btn light" onClick={() => navigate("/restaurants")}>
          Start Ordering Now
        </button>
      </section>

      <footer className="welcome-footer">
        <p>© {new Date().getFullYear()} Foodify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Welcome;
