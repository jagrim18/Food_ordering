// backend/controllers/authController.js
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const normalizedEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: "user",
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc    Register a new restaurant
// @route   POST /api/auth/restaurant/register
// @access  Public
const registerRestaurant = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please provide all fields" });

    const normalizedEmail = email.toLowerCase();
    const restaurantExists = await Restaurant.findOne({ email: normalizedEmail });
    if (restaurantExists)
      return res.status(400).json({ message: "Restaurant already exists" });

    const restaurant = await Restaurant.create({
      name,
      email: normalizedEmail,
      password,
      role: "restaurant",
    });

    return res.status(201).json({
      _id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      role: restaurant.role,
      token: generateToken(restaurant._id, restaurant.role),
    });
  } catch (err) {
    console.error("Restaurant Register error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user OR restaurant
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please provide email and password" });

    const normalizedEmail = email.toLowerCase();

    // 🔍 Try finding in both collections
    let account = await User.findOne({ email: normalizedEmail });
    let modelType = "user";

    if (!account) {
      account = await Restaurant.findOne({ email: normalizedEmail });
      modelType = "restaurant";
    }

    if (!account) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await account.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      _id: account._id,
      name: account.name,
      email: account.email,
      role: account.role || modelType,
      token: generateToken(account._id, account.role || modelType),
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc    Promote user to another role
// @route   PUT /api/auth/promote
// @access  Admin
const promoteUser = async (req, res) => {
  const { email, role } = req.body;

  try {
    if (!email || !role)
      return res.status(400).json({ message: "Email and role are required" });

    if (!["admin", "user", "restaurant"].includes(role))
      return res.status(400).json({ message: "Invalid role" });

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOneAndUpdate(
      { email: normalizedEmail },
      { role },
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    return res.json({
      message: `${user.email} is now a ${role} ✅`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Promote error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  registerRestaurant,
  loginUser,
  promoteUser,
};
