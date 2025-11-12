// // import React, { useState, useContext, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
// // import "../styles/RestaurantAuth.css";

// // function RestaurantLogin() {
// //   const { login, user } = useContext(AuthContext);
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (user?.role === "restaurant") {
// //       navigate("/restaurant/dashboard", { replace: true });
// //     }
// //   }, [user, navigate]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const restaurantData = await login(email, password, "restaurant");
// //       if (restaurantData?.role === "restaurant") {
// //         navigate("/restaurant/dashboard");
// //       } else {
// //         setError("Invalid credentials or role mismatch.");
// //       }
// //     } catch (err) {
// //       console.error("Restaurant login error:", err);
// //       setError(err.message || "Login failed. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="restaurant-auth-container">
// //       <div className="restaurant-auth-overlay"></div>
// //       <div className="restaurant-auth-card">
// //         <h1 className="restaurant-auth-title">Welcome Back 🍔</h1>
// //         <p className="restaurant-auth-subtitle">
// //           Log in to manage your restaurant and serve deliciousness!
// //         </p>

// //         {error && <p className="restaurant-auth-error">{error}</p>}

// //         <form onSubmit={handleSubmit} className="restaurant-auth-form">
// //           <input
// //             type="email"
// //             placeholder="Restaurant Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />

// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />

// //           <button type="submit" className="restaurant-auth-btn">
// //             Sign In
// //           </button>
// //         </form>

// //         <p className="restaurant-auth-footer">
// //           Don’t have an account?{" "}
// //           <span
// //             className="restaurant-auth-link"
// //             onClick={() => navigate("/restaurant/register")}
// //           >
// //             Register here
// //           </span>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default RestaurantLogin;






// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/RestaurantAuth.css";

// function RestaurantLogin() {
//   const { login, user } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // 🚫 Prevent logged-in users (especially normal users) from accessing restaurant login
//   useEffect(() => {
//     if (user) {
//       if (user.role === "restaurant") {
//         navigate("/restaurant/dashboard", { replace: true });
//       } else {
//         navigate("/", { replace: true });
//       }
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const restaurantData = await login(email, password, "restaurant");

//       if (restaurantData?.role === "restaurant") {
//         navigate("/restaurant/dashboard");
//       } else {
//         // If logged in user is not a restaurant
//         setError("Access denied. Please use the user login page.");
//       }
//     } catch (err) {
//       console.error("Restaurant login error:", err);
//       setError(err.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="restaurant-auth-container">
//       <div className="restaurant-auth-overlay"></div>
//       <div className="restaurant-auth-card">
//         <h1 className="restaurant-auth-title">Welcome Back 🍔</h1>
//         <p className="restaurant-auth-subtitle">
//           Log in to manage your restaurant and serve deliciousness!
//         </p>

//         {error && <p className="restaurant-auth-error">{error}</p>}

//         <form onSubmit={handleSubmit} className="restaurant-auth-form">
//           <input
//             type="email"
//             placeholder="Restaurant Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className="restaurant-auth-btn">
//             Sign In
//           </button>
//         </form>

//         <p className="restaurant-auth-footer">
//           Don’t have an account?{" "}
//           <span
//             className="restaurant-auth-link"
//             onClick={() => navigate("/restaurant/register")}
//           >
//             Register here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default RestaurantLogin;
