// // // const express = require("express");
// // // const { getUserProfile, updateUserProfile } = require("../controllers/userController");
// // // const { protect } = require("../middlewares/authMiddleware");

// // // const router = express.Router();

// // // // ✅ Get logged-in user/restaurant profile
// // // router.get("/profile", protect, getUserProfile);

// // // // ✅ Update profile (name, mobile, dob, pic, etc.)
// // // router.put("/profile", protect, updateUserProfile);

// // // module.exports = router;






// // // backend/routes/userRoutes.js
// // const express = require("express");
// // const router = express.Router();
// // const { protect } = require("../middlewares/authMiddleware");
// // const {
// //   getUserProfile,
// //   updateUserProfile,
// // } = require("../controllers/userController");

// // // ============================================================
// // // 👤 Get logged-in user/restaurant profile
// // // ============================================================
// // router.get("/profile", protect, getUserProfile);

// // // ============================================================
// // // ✏️ Update logged-in user/restaurant profile
// // // ============================================================
// // router.put("/profile", protect, updateUserProfile);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middlewares/authMiddleware");
// const {
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
//   deleteAccount,
// } = require("../controllers/userController");

// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);
// router.put("/change-password", protect, changePassword);
// router.delete("/delete-account", protect, deleteAccount);

// module.exports = router;



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

// // Import changePassword from authController (where it is implemented)
// const { changePassword } = require("../controllers/authController");

// router.get("/profile", protect, getUserProfile);
// router.put("/profile", protect, updateUserProfile);

// // role-aware change password (users & restaurants & admins)
// router.put("/change-password", protect, changePassword);

// router.delete("/delete-account", protect, deleteAccount);

// module.exports = router;

// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

// Import controllers
const {
  getUserProfile,
  updateUserProfile,
  deleteAccount,
} = require("../controllers/userController");

// ✅ Safely import changePassword (with fallback validation)
let { changePassword } = require("../controllers/authController");

// If for some reason it's undefined, log a clear warning instead of crashing
if (typeof changePassword !== "function") {
  console.warn(
    "[userRoutes] ⚠️ 'changePassword' is not a function in authController. Please verify its export."
  );
  changePassword = (req, res) => {
    return res
      .status(500)
      .json({ message: "Change password temporarily unavailable." });
  };
}

// ============================ ROUTES ============================

// 👤 Get logged-in user profile
router.get("/profile", protect, getUserProfile);

// ✏️ Update user profile
router.put("/profile", protect, updateUserProfile);

// 🔑 Change password (works for all roles)
router.put("/change-password", protect, changePassword);

// ❌ Delete account
router.delete("/delete-account", protect, deleteAccount);

// =================================================================

module.exports = router;
