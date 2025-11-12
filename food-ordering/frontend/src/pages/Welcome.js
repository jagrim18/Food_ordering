// // // import React, { useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import "../styles/Welcome.css";

// // // function Welcome() {
// // //   const navigate = useNavigate();



// // //   useEffect(() => {
// // //     const user = localStorage.getItem("user");
// // //     if (user) {
// // //       navigate("/menu"); // ✅ redirect logged-in users
// // //     }
// // //   }, [navigate]);


// // //   return (
// // //     <div className="welcome-container">
// // //       <div className="welcome-content">
// // //         <h1>🍴 Welcome to Foodify</h1>
// // //         <p>Order your favorite meals online and track them in real-time 🚀</p>
// // //         <div className="welcome-buttons">
// // //           <button onClick={() => navigate("/restaurants")}>Explore restaurant</button>
// // //           <button onClick={() => navigate("/register")}>Register</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Welcome;







// // import React, { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/Welcome.css";

// // function Welcome() {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const user = localStorage.getItem("user");
// //     if (user) {
// //       navigate("/menu");
// //     }
// //   }, [navigate]);

// //   return (
// //     <div className="welcome-page">
// //       <div className="overlay"></div>
// //       <div className="welcome-content">
// //         <h1 className="welcome-title">
// //           <span className="highlight">🍴 Foodify</span>
// //         </h1>
// //         <p className="welcome-tagline">
// //           Order your favorite meals online and track them in real-time 🚀
// //         </p>
// //         <div className="button-group">
// //           <button className="btn primary" onClick={() => navigate("/restaurants")}>
// //             Explore Restaurants
// //           </button>
// //           <button className="btn secondary" onClick={() => navigate("/register")}>
// //             Register Now
// //           </button>
// //         </div>
// //       </div>
// //       <footer className="welcome-footer">
// //         <p>© {new Date().getFullYear()} Foodify. All rights reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default Welcome;









// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Welcome.css";

// function Welcome() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       navigate("/menu");
//     }
//   }, [navigate]);

//   return (
//     <div className="welcome-container">
//       {/* HERO SECTION */}
//       <section className="hero-section">
//         <div className="hero-left">
//           <span className="badge">Campus Food Ordering</span>
//           <h1>
//             Skip the Line, <br /> Savor Your Time
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
//         <div className="hero-right">
//           <div className="user-count">
//             <p>Active Users</p>
//             <h2>5,000+</h2>
//           </div>
//         </div>
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
//           Join thousands of students and faculty who are already enjoying hassle-free food ordering
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
    if (user) navigate("/menu");
  }, [navigate]);

  return (
    <div className="welcome-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <span className="badge">Campus Food Ordering</span>
          <h1>
            Skip the Line, <br /> Save Your Time
          </h1>
          <p>
            Order food from your favorite campus outlets and pick it up when it’s ready.
            No more waiting in long queues!
          </p>
          <div className="button-group">
            <button className="btn primary" onClick={() => navigate("/register")}>
              Get Started
            </button>
            <button className="btn secondary" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div className="hero-right"></div>
      </section>

      {/* FEATURES SECTION */}
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

      {/* CTA SECTION */}
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
