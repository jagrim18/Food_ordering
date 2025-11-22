// // src/routes/RestaurantRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";

// const RestaurantRoute = ({ children }) => {
//   let restaurant = null;

//   try {
//     const stored = localStorage.getItem("restaurant");
//     if (stored && stored !== "undefined") {
//       restaurant = JSON.parse(stored);
//     }
//   } catch (error) {
//     console.error("Invalid restaurant JSON in localStorage:", error);
//     restaurant = null;
//   }

//   // ✅ Redirect to login if no valid restaurant is found
//   return restaurant ? children : <Navigate to="/restaurant/login" replace />;
// };

// export default RestaurantRoute;







// src/routes/RestaurantRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RestaurantRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but not restaurant
  if (user.role !== "restaurant") return <Navigate to="/" replace />;

  return children;
}
