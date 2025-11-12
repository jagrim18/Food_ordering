// backend/routes/restaurantRoutes.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { protect, restaurantOnly } = require("../middlewares/authMiddleware");
const {
  getRestaurants,
  registerRestaurant,
  loginRestaurant,
} = require("../controllers/restaurantController");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

/* ============================================================
   📸 Multer Setup for Profile + Gallery Upload
   ============================================================ */
const uploadBaseDir = path.join(__dirname, "../uploads");
const restaurantUploadDir = path.join(uploadBaseDir, "restaurants");

// ✅ Ensure upload directories exist
if (!fs.existsSync(uploadBaseDir)) fs.mkdirSync(uploadBaseDir);
if (!fs.existsSync(restaurantUploadDir)) fs.mkdirSync(restaurantUploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, restaurantUploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed!"));
};

const upload = multer({ storage, fileFilter });

/* ============================================================
   🍽️ Public Routes
   ============================================================ */
router.get("/", getRestaurants);
router.post("/register", registerRestaurant);
router.post("/login", loginRestaurant);

/* ============================================================
   🔒 Protected Routes
   ============================================================ */

// ✅ Get Restaurant Profile
router.get("/profile", protect, restaurantOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user._id).select("-password");
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    console.error("❌ Error fetching restaurant profile:", err);
    res.status(500).json({ message: "Failed to load restaurant profile" });
  }
});

// ✅ Update Restaurant Profile (with optional image)
router.put(
  "/profile",
  protect,
  restaurantOnly,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.user._id);
      if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

      const updateFields = req.body;

      // ✅ If image uploaded, save relative path
      if (req.file) {
        const relativePath = path
          .join("/uploads/restaurants", path.basename(req.file.path))
          .replace(/\\/g, "/");
        updateFields.profileImage = relativePath;
      }

      Object.assign(restaurant, updateFields);
      await restaurant.save();

      res.json({
        ...restaurant.toObject(),
        token: req.token,
      });
    } catch (err) {
      console.error("❌ Error updating restaurant profile:", err);
      res.status(500).json({ message: "Error updating restaurant profile" });
    }
  }
);

/* ============================================================
   📸 Upload Restaurant Gallery Images
   ============================================================ */
router.post(
  "/upload-gallery",
  protect,
  restaurantOnly,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.user._id);
      if (!restaurant)
        return res.status(404).json({ message: "Restaurant not found" });

      if (!req.files || req.files.length === 0)
        return res.status(400).json({ message: "No files uploaded" });

      const uploadedPaths = req.files.map((file) => {
        const relativePath = path
          .join("/uploads/restaurants", path.basename(file.path))
          .replace(/\\/g, "/");
        return relativePath;
      });

      restaurant.galleryImages = [
        ...(restaurant.galleryImages || []),
        ...uploadedPaths,
      ].slice(-10);

      await restaurant.save();

      res.json({
        message: "Gallery images uploaded successfully",
        galleryImages: restaurant.galleryImages,
      });
    } catch (error) {
      console.error("❌ Error uploading gallery images:", error);
      res.status(500).json({ message: "Failed to upload images" });
    }
  }
);

module.exports = router;
