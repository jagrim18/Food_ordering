// // // // const User = require("../models/User");
// // // // const jwt = require("jsonwebtoken");
// // // // const bcrypt = require("bcryptjs");

// // // // // ============================
// // // // // Generate JWT Token
// // // // // ============================
// // // // const generateToken = (id, role) => {
// // // //   return jwt.sign({ id, role }, process.env.JWT_SECRET, {
// // // //     expiresIn: "30d",
// // // //   });
// // // // };

// // // // // ============================
// // // // // @desc    Register User / Restaurant
// // // // // @route   POST /api/users/register
// // // // // ============================
// // // // exports.registerUser = async (req, res) => {
// // // //   try {
// // // //     const { name, email, password, role } = req.body;

// // // //     if (!name || !email || !password) {
// // // //       return res.status(400).json({ message: "Please fill all fields" });
// // // //     }

// // // //     // Check if user exists
// // // //     const existingUser = await User.findOne({ email });
// // // //     if (existingUser) {
// // // //       return res.status(400).json({ message: "User already exists" });
// // // //     }

// // // //     // Create new user
// // // //     const user = await User.create({ name, email, password, role });

// // // //     res.status(201).json({
// // // //       _id: user._id,
// // // //       name: user.name,
// // // //       email: user.email,
// // // //       role: user.role,
// // // //       token: generateToken(user._id, user.role),
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error in registerUser:", error);
// // // //     res.status(500).json({ message: "Server error" });
// // // //   }
// // // // };

// // // // // ============================
// // // // // @desc    Login User / Restaurant
// // // // // @route   POST /api/users/login
// // // // // ============================
// // // // exports.loginUser = async (req, res) => {
// // // //   try {
// // // //     const { email, password } = req.body;

// // // //     const user = await User.findOne({ email });
// // // //     if (!user) return res.status(400).json({ message: "Invalid credentials" });

// // // //     const isMatch = await user.matchPassword(password);
// // // //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

// // // //     // ✅ Restaurant login redirection logic (handled on frontend)
// // // //     const redirectTo =
// // // //       user.role === "restaurant" ? "/restaurant/dashboard" : "/";

// // // //     res.json({
// // // //       _id: user._id,
// // // //       name: user.name,
// // // //       email: user.email,
// // // //       role: user.role,
// // // //       redirectTo,
// // // //       token: generateToken(user._id, user.role),
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error in loginUser:", error);
// // // //     res.status(500).json({ message: "Server error" });
// // // //   }
// // // // };

// // // // // ============================
// // // // // @desc    Get Logged In User Info
// // // // // @route   GET /api/users/me
// // // // // ============================
// // // // exports.getUserProfile = async (req, res) => {
// // // //   try {
// // // //     const user = await User.findById(req.user.id).select("-password");
// // // //     if (!user) return res.status(404).json({ message: "User not found" });

// // // //     res.json(user);
// // // //   } catch (error) {
// // // //     console.error("Error in getUserProfile:", error);
// // // //     res.status(500).json({ message: "Server error" });
// // // //   }
// // // // };





// // // const User = require("../models/User");
// // // const Restaurant = require("../models/Restaurant");

// // // // ✅ Get profile (works for user or restaurant)
// // // exports.getUserProfile = async (req, res) => {
// // //   try {
// // //     // req.user is attached from authMiddleware
// // //     const user = req.user;

// // //     if (!user) {
// // //       return res.status(404).json({ message: "User not found" });
// // //     }

// // //     res.json(user);
// // //   } catch (error) {
// // //     console.error("Error fetching profile:", error);
// // //     res.status(500).json({ message: "Error fetching profile" });
// // //   }
// // // };

// // // // ✅ Update profile (works for user or restaurant)
// // // exports.updateUserProfile = async (req, res) => {
// // //   try {
// // //     const { name, mobile, dob, profilePic, restaurantName, address, cuisineType } = req.body;
// // //     const { role } = req.user;

// // //     let updatedDoc;

// // //     if (role === "restaurant") {
// // //       // 🟢 Update in Restaurant model if you use separate collection
// // //       updatedDoc = await Restaurant.findById(req.user._id);
// // //       if (!updatedDoc) return res.status(404).json({ message: "Restaurant not found" });

// // //       updatedDoc.name = name || updatedDoc.name;
// // //       updatedDoc.mobile = mobile || updatedDoc.mobile;
// // //       updatedDoc.dob = dob || updatedDoc.dob;
// // //       updatedDoc.profilePic = profilePic || updatedDoc.profilePic;
// // //       updatedDoc.restaurantName = restaurantName || updatedDoc.restaurantName;
// // //       updatedDoc.address = address || updatedDoc.address;
// // //       updatedDoc.cuisineType = cuisineType || updatedDoc.cuisineType;
// // //     } else {
// // //       // 🟢 Regular user update
// // //       updatedDoc = await User.findById(req.user._id);
// // //       if (!updatedDoc) return res.status(404).json({ message: "User not found" });

// // //       updatedDoc.name = name || updatedDoc.name;
// // //       updatedDoc.mobile = mobile || updatedDoc.mobile;
// // //       updatedDoc.dob = dob || updatedDoc.dob;
// // //       updatedDoc.profilePic = profilePic || updatedDoc.profilePic;
// // //     }

// // //     const saved = await updatedDoc.save();

// // //     res.json({
// // //       _id: saved._id,
// // //       name: saved.name,
// // //       email: saved.email,
// // //       mobile: saved.mobile,
// // //       dob: saved.dob,
// // //       profilePic: saved.profilePic,
// // //       restaurantName: saved.restaurantName,
// // //       address: saved.address,
// // //       cuisineType: saved.cuisineType,
// // //       role: saved.role,
// // //       token: req.token, // keep the same token
// // //     });
// // //   } catch (error) {
// // //     console.error("Error updating profile:", error);
// // //     res.status(500).json({ message: "Error updating profile" });
// // //   }
// // // };









// // // backend/controllers/userController.js
// // const User = require("../models/User");
// // const Restaurant = require("../models/Restaurant");
// // const asyncHandler = require("express-async-handler");
// // const path = require("path");
// // const fs = require("fs");
// // const multer = require("multer");

// // // ============================================================
// // // 📸 Multer setup for profile image uploads
// // // ============================================================
// // const uploadDir = path.join(__dirname, "../uploads");
// // if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // const storage = multer.diskStorage({
// //   destination(req, file, cb) {
// //     cb(null, uploadDir);
// //   },
// //   filename(req, file, cb) {
// //     cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
// //   },
// // });

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
// //   fileFilter(req, file, cb) {
// //     const filetypes = /jpeg|jpg|png/;
// //     const extname = filetypes.test(
// //       path.extname(file.originalname).toLowerCase()
// //     );
// //     const mimetype = filetypes.test(file.mimetype);

// //     if (extname && mimetype) return cb(null, true);
// //     cb("Images only (jpeg, jpg, png)!");
// //   },
// // }).single("profileImage");

// // // ============================================================
// // // 👤 Get Profile (for User or Restaurant)
// // // ============================================================
// // const getUserProfile = asyncHandler(async (req, res) => {
// //   const { role, _id } = req.user;

// //   let profile;
// //   if (role === "restaurant") {
// //     profile = await Restaurant.findById(_id).select("-password");
// //   } else {
// //     profile = await User.findById(_id).select("-password");
// //   }

// //   if (!profile) {
// //     res.status(404);
// //     throw new Error("Profile not found");
// //   }

// //   res.json(profile);
// // });

// // // ============================================================
// // // ✏️ Update Profile (User or Restaurant)
// // // ============================================================
// // const updateUserProfile = asyncHandler(async (req, res) => {
// //   upload(req, res, async (err) => {
// //     if (err) {
// //       return res.status(400).json({ message: err.message || err });
// //     }

// //     const { role, _id } = req.user;

// //     let userDoc;
// //     if (role === "restaurant") {
// //       userDoc = await Restaurant.findById(_id);
// //     } else {
// //       userDoc = await User.findById(_id);
// //     }

// //     if (!userDoc) {
// //       res.status(404);
// //       throw new Error("User/Restaurant not found");
// //     }

// //     // 📝 Update common fields
// //     userDoc.name = req.body.name || userDoc.name;
// //     userDoc.mobile = req.body.mobile || userDoc.mobile;
// //     userDoc.dateOfBirth = req.body.dateOfBirth || userDoc.dateOfBirth;

// //     // 🏪 Restaurant-specific fields
// //     if (role === "restaurant") {
// //       userDoc.restaurantName =
// //         req.body.restaurantName || userDoc.restaurantName;
// //       userDoc.address = req.body.address || userDoc.address;
// //       userDoc.cuisineType = req.body.cuisineType || userDoc.cuisineType;
// //     }

// //     // 📸 Profile image update
// //     if (req.file) {
// //       userDoc.profileImage = `/uploads/${req.file.filename}`;
// //     }

// //     const updated = await userDoc.save();

// //     res.json({
// //       _id: updated._id,
// //       name: updated.name,
// //       email: updated.email,
// //       mobile: updated.mobile,
// //       dateOfBirth: updated.dateOfBirth,
// //       profileImage: updated.profileImage,
// //       role: updated.role,
// //       restaurantName: updated.restaurantName,
// //       address: updated.address,
// //       cuisineType: updated.cuisineType,
// //     });
// //   });
// // });

// // module.exports = { getUserProfile, updateUserProfile };


// const bcrypt = require("bcryptjs");

// // ============================================================
// // 🔐 Change Password
// // ============================================================
// const changePassword = asyncHandler(async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const user = await User.findById(req.user._id);

//   if (!user) {
//     res.status(404);
//     throw new Error("User not found");
//   }

//   const isMatch = await bcrypt.compare(currentPassword, user.password);
//   if (!isMatch) {
//     res.status(400);
//     throw new Error("Incorrect current password");
//   }

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(newPassword, salt);
//   await user.save();

//   res.json({ message: "Password updated successfully" });
// });

// // ============================================================
// // 🗑️ Delete Account
// // ============================================================
// const deleteAccount = asyncHandler(async (req, res) => {
//   await User.findByIdAndDelete(req.user._id);
//   res.json({ message: "Account deleted successfully" });
// });

// module.exports = {
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
//   deleteAccount,
// };



const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const bcrypt = require("bcryptjs");

// ============================================================
// 📸 Multer setup for profile image uploads
// ============================================================
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb("Images only (jpeg, jpg, png)!");
  },
}).single("profileImage");

// ============================================================
// 👤 Get Profile (User or Restaurant)
// ============================================================
const getUserProfile = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;
  let profile =
    role === "restaurant"
      ? await Restaurant.findById(_id).select("-password")
      : await User.findById(_id).select("-password");

  if (!profile) {
    res.status(404);
    throw new Error("Profile not found");
  }

  res.json(profile);
});

// ============================================================
// ✏️ Update Profile (User or Restaurant)
// ============================================================
const updateUserProfile = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message || err });

    const { role, _id } = req.user;
    let userDoc =
      role === "restaurant"
        ? await Restaurant.findById(_id)
        : await User.findById(_id);

    if (!userDoc) {
      res.status(404);
      throw new Error("User/Restaurant not found");
    }

    userDoc.name = req.body.name || userDoc.name;
    userDoc.mobile = req.body.mobile || userDoc.mobile;
    userDoc.dateOfBirth = req.body.dateOfBirth || userDoc.dateOfBirth;

    if (role === "restaurant") {
      userDoc.restaurantName = req.body.restaurantName || userDoc.restaurantName;
      userDoc.address = req.body.address || userDoc.address;
      userDoc.cuisineType = req.body.cuisineType || userDoc.cuisineType;
    }

    if (req.file) userDoc.profileImage = `/uploads/${req.file.filename}`;

    const updated = await userDoc.save();

    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      mobile: updated.mobile,
      dateOfBirth: updated.dateOfBirth,
      profileImage: updated.profileImage,
      role: updated.role,
      restaurantName: updated.restaurantName,
      address: updated.address,
      cuisineType: updated.cuisineType,
    });
  });
});

// ============================================================
// 🔐 Change Password (User or Restaurant)
// ============================================================
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { role, _id } = req.user;

  let userDoc =
    role === "restaurant"
      ? await Restaurant.findById(_id)
      : await User.findById(_id);

  if (!userDoc) {
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, userDoc.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Incorrect current password");
  }

  const salt = await bcrypt.genSalt(10);
  userDoc.password = await bcrypt.hash(newPassword, salt);
  await userDoc.save();

  res.json({ message: "Password updated successfully" });
});

// ============================================================
// 🗑️ Delete Account (User or Restaurant)
// ============================================================
const deleteAccount = asyncHandler(async (req, res) => {
  const { role, _id } = req.user;

  if (role === "restaurant") {
    await Restaurant.findByIdAndDelete(_id);
  } else {
    await User.findByIdAndDelete(_id);
  }

  res.json({ message: "Account deleted successfully" });
});

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteAccount,
};
