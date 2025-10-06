// backend/routes/userRoutes.js
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// ✅ Get profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// ✅ Update profile
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
      user.dob = req.body.dob || user.dob;
      user.profilePic = req.body.profilePic || user.profilePic;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        dob: updatedUser.dob,
        profilePic: updatedUser.profilePic,
        role: updatedUser.role,
        token: req.token,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;
