// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // ============================
// // Generate JWT Token
// // ============================
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

// // ============================
// // @desc    Register User / Restaurant
// // @route   POST /api/users/register
// // ============================
// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please fill all fields" });
//     }

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create new user
//     const user = await User.create({ name, email, password, role });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id, user.role),
//     });
//   } catch (error) {
//     console.error("Error in registerUser:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ============================
// // @desc    Login User / Restaurant
// // @route   POST /api/users/login
// // ============================
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // ✅ Restaurant login redirection logic (handled on frontend)
//     const redirectTo =
//       user.role === "restaurant" ? "/restaurant/dashboard" : "/";

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       redirectTo,
//       token: generateToken(user._id, user.role),
//     });
//   } catch (error) {
//     console.error("Error in loginUser:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ============================
// // @desc    Get Logged In User Info
// // @route   GET /api/users/me
// // ============================
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user);
//   } catch (error) {
//     console.error("Error in getUserProfile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };





const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

// ✅ Get profile (works for user or restaurant)
exports.getUserProfile = async (req, res) => {
  try {
    // req.user is attached from authMiddleware
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// ✅ Update profile (works for user or restaurant)
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, mobile, dob, profilePic, restaurantName, address, cuisineType } = req.body;
    const { role } = req.user;

    let updatedDoc;

    if (role === "restaurant") {
      // 🟢 Update in Restaurant model if you use separate collection
      updatedDoc = await Restaurant.findById(req.user._id);
      if (!updatedDoc) return res.status(404).json({ message: "Restaurant not found" });

      updatedDoc.name = name || updatedDoc.name;
      updatedDoc.mobile = mobile || updatedDoc.mobile;
      updatedDoc.dob = dob || updatedDoc.dob;
      updatedDoc.profilePic = profilePic || updatedDoc.profilePic;
      updatedDoc.restaurantName = restaurantName || updatedDoc.restaurantName;
      updatedDoc.address = address || updatedDoc.address;
      updatedDoc.cuisineType = cuisineType || updatedDoc.cuisineType;
    } else {
      // 🟢 Regular user update
      updatedDoc = await User.findById(req.user._id);
      if (!updatedDoc) return res.status(404).json({ message: "User not found" });

      updatedDoc.name = name || updatedDoc.name;
      updatedDoc.mobile = mobile || updatedDoc.mobile;
      updatedDoc.dob = dob || updatedDoc.dob;
      updatedDoc.profilePic = profilePic || updatedDoc.profilePic;
    }

    const saved = await updatedDoc.save();

    res.json({
      _id: saved._id,
      name: saved.name,
      email: saved.email,
      mobile: saved.mobile,
      dob: saved.dob,
      profilePic: saved.profilePic,
      restaurantName: saved.restaurantName,
      address: saved.address,
      cuisineType: saved.cuisineType,
      role: saved.role,
      token: req.token, // keep the same token
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};
