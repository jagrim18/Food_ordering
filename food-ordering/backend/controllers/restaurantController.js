// // backend/controllers/restaurantController.js
// const Restaurant = require("../models/Restaurant");
// const jwt = require("jsonwebtoken");

// // ✅ Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

// // ===============================
// // @desc    Register a new restaurant
// // @route   POST /api/restaurants/register
// // @access  Public
// // ===============================
// exports.registerRestaurant = async (req, res) => {
//   try {
//     const { name, email, password, address, phone, cuisine, image } = req.body;
//     const imageUrl = image || "/images/default-restaurant.png";

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please provide name, email and password" });
//     }

//     // Check if email already exists
//     const restaurantExists = await Restaurant.findOne({ email });
//     if (restaurantExists) {
//       return res.status(400).json({ message: "Restaurant already exists" });
//     }

//     // Create restaurant
//     const restaurant = await Restaurant.create({
//       name,
//       email,
//       password,
//       address,
//       phone,
//       cuisine,
//       image,
//     });

//     res.status(201).json({
//       _id: restaurant._id,
//       name: restaurant.name,
//       email: restaurant.email,
//       token: generateToken(restaurant._id),
//     });
//   } catch (err) {
//     console.error("Register Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // ===============================
// // @desc    Login restaurant
// // @route   POST /api/restaurants/login
// // @access  Public
// // ===============================
// exports.loginRestaurant = async (req, res) => {
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
//     console.error("Login Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // ===============================
// // @desc    Add restaurant (admin/manual)
// // @route   POST /api/restaurants
// // @access  Private (Admin)
// // ===============================
// exports.addRestaurant = async (req, res) => {
//   try {
//     const { name, address, phone, email, password, cuisine, image } = req.body;

//     const restaurant = new Restaurant({
//       name,
//       address,
//       phone,
//       email,
//       password,
//       cuisine,
//       image: imageUrl,
//     });

//     await restaurant.save();
//     res.status(201).json({ message: "Restaurant added successfully", restaurant });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding restaurant", error: error.message });
//   }
// };

// // ===============================
// // @desc    Fetch all restaurants
// // @route   GET /api/restaurants
// // @access  Public
// // ===============================
// exports.getRestaurants = async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find().sort({ createdAt: -1 });
//     res.json(restaurants);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching restaurants", error: error.message });
//   }
// };







const Restaurant = require("../models/Restaurant");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// ✅ Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ===============================
// @desc    Register a new restaurant
// @route   POST /api/restaurants/register
// @access  Public
// ===============================
exports.registerRestaurant = async (req, res) => {
  try {
    const { name, email, password, address, phone, cuisine, image } = req.body;
    const imageUrl = image || "/images/default-restaurant.png";

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email and password" });
    }

    const restaurantExists = await Restaurant.findOne({ email });
    if (restaurantExists) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    const restaurant = await Restaurant.create({
      name,
      email,
      password,
      address,
      phone,
      cuisine,
      image: imageUrl,
    });

    res.status(201).json({
      _id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      token: generateToken(restaurant._id),
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// @desc    Login restaurant
// @route   POST /api/restaurants/login
// @access  Public
// ===============================
exports.loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;

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
    console.error("Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ===============================
// @desc    Add restaurant (admin/manual)
// @route   POST /api/restaurants
// @access  Private (Admin)
// ===============================
exports.addRestaurant = async (req, res) => {
  try {
    const { name, address, phone, email, password, cuisine, image } = req.body;
    const imageUrl = image || "/images/default-restaurant.png";

    const restaurant = new Restaurant({
      name,
      address,
      phone,
      email,
      password,
      cuisine,
      image: imageUrl,
    });

    await restaurant.save();
    res
      .status(201)
      .json({ message: "Restaurant added successfully", restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding restaurant", error: error.message });
  }
};

// ===============================
// @desc    Fetch all restaurants
// @route   GET /api/restaurants
// @access  Public
// ===============================
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching restaurants", error: error.message });
  }
};

// ===============================
// @desc    Get restaurant by ID (for dashboard/gallery)
// @route   GET /api/restaurants/:id
// @access  Public
// ===============================
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching restaurant", error: error.message });
  }
};

// ===============================
// 📸 MULTER SETUP for Gallery Uploads
// ===============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/restaurants"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `gallery_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// ===============================
// @desc    Upload gallery images
// @route   POST /api/restaurants/upload-gallery
// @access  Private (Restaurant)
// ===============================
exports.uploadGallery = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.user._id);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      const imagePaths = req.files.map(
        (file) => `/uploads/restaurants/${file.filename}`
      );

      // Merge old + new (limit 10)
      const updatedGallery = [
        ...restaurant.galleryImages,
        ...imagePaths,
      ].slice(-10);

      restaurant.galleryImages = updatedGallery;
      await restaurant.save();

      res.json({
        message: "Gallery uploaded successfully!",
        galleryImages: restaurant.galleryImages,
      });
    } catch (error) {
      console.error("Upload Gallery Error:", error);
      res
        .status(500)
        .json({ message: "Failed to upload gallery", error: error.message });
    }
  },
];
