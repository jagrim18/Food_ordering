// const express = require("express");
// const jwt = require("jsonwebtoken");
// const Restaurant = require("../models/Restaurant");
// const { addRestaurant, getRestaurants } = require("../controllers/restaurantController");

// const router = express.Router();

// // ===============================
// // JWT generator
// // ===============================
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

// // ===============================
// // @route   POST /api/restaurants/register
// // @desc    Register a new restaurant
// // ===============================
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please provide all fields" });
//     }

//     const exists = await Restaurant.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "Restaurant already exists" });
//     }

//     const restaurant = await Restaurant.create({ name, email, password });

//     res.status(201).json({
//       _id: restaurant._id,
//       name: restaurant.name,
//       email: restaurant.email,
//       token: generateToken(restaurant._id),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ===============================
// // @route   POST /api/restaurants/login
// // @desc    Login restaurant
// // ===============================
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const restaurant = await Restaurant.findOne({ email });
//     if (!restaurant) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await restaurant.matchPassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     res.json({
//       _id: restaurant._id,
//       name: restaurant.name,
//       email: restaurant.email,
//       token: generateToken(restaurant._id),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ===============================
// // @route   POST /api/restaurants
// // @desc    Add new restaurant (Admin/API)
// // ===============================
// router.post("/", addRestaurant);

// // ===============================
// // @route   GET /api/restaurants
// // @desc    Get all restaurants
// // ===============================
// router.get("/", getRestaurants);

// module.exports = router;













// backend/routes/restaurantRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");
const { addRestaurant, getRestaurants } = require("../controllers/restaurantController");

const router = express.Router();

// ===============================
// JWT generator
// ===============================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ===============================
// @route   POST /api/restaurants/register
// @desc    Register a new restaurant
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const exists = await Restaurant.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    const restaurant = await Restaurant.create({ name, email, password });

    res.status(201).json({
      _id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      token: generateToken(restaurant._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// @route   POST /api/restaurants/login
// @desc    Login restaurant
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await restaurant.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      token: generateToken(restaurant._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// @route   POST /api/restaurants
// @desc    Add new restaurant (Admin/API)
// ===============================
router.post("/", addRestaurant);

// ===============================
// @route   GET /api/restaurants
// @desc    Get all restaurants
// ===============================
router.get("/", getRestaurants);

module.exports = router;
