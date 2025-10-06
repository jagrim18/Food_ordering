// src/routes/RestaurantRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const RestaurantRoute = ({ children }) => {
  let restaurant = null;

  try {
    const stored = localStorage.getItem("restaurant");
    if (stored && stored !== "undefined") {
      restaurant = JSON.parse(stored);
    }
  } catch (error) {
    console.error("Invalid restaurant JSON in localStorage:", error);
    restaurant = null;
  }

  // ✅ Redirect to login if no valid restaurant is found
  return restaurant ? children : <Navigate to="/restaurant/login" replace />;
};

export default RestaurantRoute;
