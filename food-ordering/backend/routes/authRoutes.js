// // backend/routes/authRoutes.js
// const express = require("express");
// const {
//   registerUser,
//   registerRestaurant,
//   loginUser,
//   promoteUser,
// } = require("../controllers/authController");
// const { protect, adminOnly } = require("../middlewares/authMiddleware");

// const router = express.Router();

// /**
//  * Authentication Routes
//  */

// // 👤 User
// router.post("/register", registerUser);          // User signup
// router.post("/login", loginUser);                // User/Restaurant/Admin login

// // 🍴 Restaurant
// router.post("/restaurant/register", registerRestaurant);  // Restaurant signup

// // 🛠️ Admin Only (promotion)
// router.put("/promote", protect, adminOnly, promoteUser);   // Promote user role

// module.exports = router;






















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

/* ============================================================
   👤 USER AUTH ROUTES
   ============================================================ */

// ✅ Register new user
router.post("/register", registerUser);

// ✅ Login (works for user, restaurant, admin)
router.post("/login", loginUser);


/* ============================================================
   🍴 RESTAURANT AUTH ROUTES
   ============================================================ */

// ✅ Register new restaurant
router.post("/restaurant/register", registerRestaurant);


/* ============================================================
   🛠️ ADMIN PRIVILEGES
   ============================================================ */

// ✅ Promote a user (Admin only)
router.put("/promote", protect, adminOnly, promoteUser);


/* ============================================================
   🚀 EXPORT ROUTER
   ============================================================ */
module.exports = router;
