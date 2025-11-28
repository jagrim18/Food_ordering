// // // src/routes/RestaurantRoute.jsx
// // import React from "react";
// // import { Navigate } from "react-router-dom";

// // const RestaurantRoute = ({ children }) => {
// //   let restaurant = null;

// //   try {
// //     const stored = localStorage.getItem("restaurant");
// //     if (stored && stored !== "undefined") {
// //       restaurant = JSON.parse(stored);
// //     }
// //   } catch (error) {
// //     console.error("Invalid restaurant JSON in localStorage:", error);
// //     restaurant = null;
// //   }

// //   // ✅ Redirect to login if no valid restaurant is found
// //   return restaurant ? children : <Navigate to="/restaurant/login" replace />;
// // };

// // export default RestaurantRoute;







// // src/routes/RestaurantRoute.jsx
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function RestaurantRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   // Not logged in
//   if (!user) return <Navigate to="/login" replace />;

//   // Logged in but not restaurant
//   if (user.role !== "restaurant") return <Navigate to="/" replace />;

//   return children;
// }




import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RestaurantRoute({ children }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Wait for AuthContext to hydrate
  useEffect(() => {
    const stored = localStorage.getItem("authUser");

    if (stored === "undefined" || !stored) {
      setLoading(false);
      return;
    }

    // If stored user exists but context hasn't loaded yet — wait.
    if (!user) {
      setTimeout(() => setLoading(false), 150);
    } else {
      setLoading(false);
    }
  }, [user]);

  // Show nothing while loading — prevents wrong redirect
  if (loading) return null;

  // Not logged in
  if (!user) return <Navigate to="/restaurant/login" replace />;

  // Wrong role
  if (user.role !== "restaurant") {
    if (user.role === "admin")
      return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  // Correct role — allow access
  return children;
}
