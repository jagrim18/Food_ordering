// backend/routes/authRoutes.js
const express = require("express");
const {
  registerUser,
  registerRestaurant,
  loginUser,
  promoteUser,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * Authentication Routes
 */

// 👤 User
router.post("/register", registerUser);          // User signup
router.post("/login", loginUser);                // User/Restaurant/Admin login

// 🍴 Restaurant
router.post("/restaurant/register", registerRestaurant);  // Restaurant signup

// 🛠️ Admin Only (promotion)
router.put("/promote", protect, adminOnly, promoteUser);   // Promote user role

module.exports = router;
