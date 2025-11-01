// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/RestaurantAuth.css";

// function RestaurantRegister() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/api/restaurants/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Restaurant registered successfully ✅");
//         navigate("/restaurant/login");
//       } else {
//         setError(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Error registering restaurant:", err);
//       setError("Server error. Please try again.");
//     }
//   };

//   return (
//     <div className="restaurant-auth-container">
//       <div className="restaurant-auth-overlay"></div>
//       <div className="restaurant-auth-card">
//         <h1 className="restaurant-auth-title">Join Foodify 🍽️</h1>
//         <p className="restaurant-auth-subtitle">
//           Register your restaurant and start serving online
//         </p>

//         {error && <p className="restaurant-auth-error">{error}</p>}

//         <form onSubmit={handleSubmit} className="restaurant-auth-form">
//           <input
//             type="text"
//             placeholder="Restaurant Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <input
//             type="email"
//             placeholder="Restaurant Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Create Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className="restaurant-auth-btn">
//             Register
//           </button>
//         </form>

//         <p className="restaurant-auth-footer">
//           Already have an account?{" "}
//           <Link to="/restaurant/login" className="restaurant-auth-link">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default RestaurantRegister;











import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/RestaurantAuth.css";

function RestaurantRegister() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🚫 Prevent logged-in users (especially normal users) from accessing restaurant register page
  useEffect(() => {
    if (user) {
      if (user.role === "restaurant") {
        navigate("/restaurant/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/restaurants/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Restaurant registered successfully ✅");
        navigate("/restaurant/login");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error registering restaurant:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="restaurant-auth-container">
      <div className="restaurant-auth-overlay"></div>
      <div className="restaurant-auth-card">
        <h1 className="restaurant-auth-title">Join Foodify 🍽️</h1>
        <p className="restaurant-auth-subtitle">
          Register your restaurant and start serving online
        </p>

        {error && <p className="restaurant-auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="restaurant-auth-form">
          <input
            type="text"
            placeholder="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Restaurant Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="restaurant-auth-btn">
            Register
          </button>
        </form>

        <p className="restaurant-auth-footer">
          Already have an account?{" "}
          <Link to="/restaurant/login" className="restaurant-auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RestaurantRegister;
