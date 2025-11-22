// // backend/routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middlewares/authMiddleware");

// // Import controllers
// const {
//   getUserProfile,
//   updateUserProfile,
//   deleteAccount,
// } = require("../controllers/userController");

// // ✅ Safely import changePassword (with fallback validation)
// let { changePassword } = require("../controllers/authController");

// // If for some reason it's undefined, log a clear warning instead of crashing
// if (typeof changePassword !== "function") {
//   console.warn(
//     "[userRoutes] ⚠️ 'changePassword' is not a function in authController. Please verify its export."
//   );
//   changePassword = (req, res) => {
//     return res
//       .status(500)
//       .json({ message: "Change password temporarily unavailable." });
//   };
// }

// // ============================ ROUTES ============================

// // 👤 Get logged-in user profile
// router.get("/profile", protect, getUserProfile);

// // ✏️ Update user profile
// router.put("/profile", protect, updateUserProfile);

// // 🔑 Change password (works for all roles)
// router.put("/change-password", protect, changePassword);

// // ❌ Delete account
// router.delete("/delete-account", protect, deleteAccount);

// // =================================================================

// module.exports = router;
 




// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const {
  getUserProfile,
  updateUserProfile,
  deleteAccount,
} = require("../controllers/userController");

const { changePassword } = require("../controllers/authController");

// ============================ ROUTES ============================

// 👤 Get logged-in user profile
router.get("/profile", protect, getUserProfile);

// ✏️ Update user profile
router.put("/profile", protect, updateUserProfile);

// 🔐 Change password
router.put("/change-password", protect, changePassword);

// ❌ Delete account
router.delete("/delete-account", protect, deleteAccount);

// =================================================================

module.exports = router;
