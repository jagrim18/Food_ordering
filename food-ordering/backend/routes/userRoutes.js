// const express = require("express");
// const {
//   registerUser,
//   loginUser,
//   getUserProfile,
// } = require("../controllers/userController");
// const { protect } = require("../middlewares/authMiddleware");
// const User = require("../models/User");

// const router = express.Router();

// // ============================
// // AUTH ROUTES
// // ============================

// // ✅ Register new user
// router.post("/register", registerUser);

// // ✅ Login user
// router.post("/login", loginUser);

// // ============================
// // PROFILE ROUTES
// // ============================

// // ✅ Get logged-in user profile
// router.get("/profile", protect, getUserProfile);

// // ✅ Update user profile
// router.put("/profile", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Update fields if provided
//     user.name = req.body.name || user.name;
//     user.mobile = req.body.mobile || user.mobile;
//     user.dob = req.body.dob || user.dob;
//     user.profilePic = req.body.profilePic || user.profilePic;

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       mobile: updatedUser.mobile,
//       dob: updatedUser.dob,
//       profilePic: updatedUser.profilePic,
//       role: updatedUser.role,
//       token: req.token, // keep your frontend auth consistent
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Error updating profile" });
//   }
// });

// module.exports = router;



























const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Get logged-in user/restaurant profile
router.get("/profile", protect, getUserProfile);

// ✅ Update profile (name, mobile, dob, pic, etc.)
router.put("/profile", protect, updateUserProfile);

module.exports = router;
