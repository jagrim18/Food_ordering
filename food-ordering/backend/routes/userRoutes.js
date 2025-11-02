// const express = require("express");
// const { getUserProfile, updateUserProfile } = require("../controllers/userController");
// const { protect } = require("../middlewares/authMiddleware");

// const router = express.Router();

// // ✅ Get logged-in user/restaurant profile
// router.get("/profile", protect, getUserProfile);

// // ✅ Update profile (name, mobile, dob, pic, etc.)
// router.put("/profile", protect, updateUserProfile);

// module.exports = router;






// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

// ============================================================
// 👤 Get logged-in user/restaurant profile
// ============================================================
router.get("/profile", protect, getUserProfile);

// ============================================================
// ✏️ Update logged-in user/restaurant profile
// ============================================================
router.put("/profile", protect, updateUserProfile);

module.exports = router;
