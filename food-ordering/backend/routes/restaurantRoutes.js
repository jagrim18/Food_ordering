// // backend/routes/restaurantRoutes.js
// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { protect, restaurantOnly } = require("../middlewares/authMiddleware");
// const {
//   getRestaurants,
//   registerRestaurant,
//   loginRestaurant,
// } = require("../controllers/restaurantController");
// const Restaurant = require("../models/Restaurant");

// const router = express.Router();

// /* ============================================================
//    📸 Multer Setup for Gallery Image Upload
//    ============================================================ */
// const uploadDir = path.join(__dirname, "../uploads/restaurants");

// // ✅ Ensure upload folder exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log("📁 Created uploads directory:", uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) =>
//     cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`),
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/;
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (allowedTypes.test(ext)) cb(null, true);
//   else cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed!"));
// };

// const upload = multer({ storage, fileFilter });

// /* ============================================================
//    🍽️ Public Routes
//    ============================================================ */
// router.get("/", getRestaurants);
// router.post("/register", registerRestaurant);
// router.post("/login", loginRestaurant);

// /* ============================================================
//    🔒 Protected Restaurant Routes
//    ============================================================ */

// // ✅ Get Restaurant Profile
// router.get("/profile", protect, restaurantOnly, async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id).select("-password");
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
//     res.json(restaurant);
//   } catch (err) {
//     console.error("❌ Error fetching restaurant profile:", err);
//     res.status(500).json({ message: "Failed to load restaurant profile" });
//   }
// });

// // ✅ Update Restaurant Profile
// router.put("/profile", protect, restaurantOnly, async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id);
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

//     Object.assign(restaurant, req.body);
//     await restaurant.save();

//     res.json({
//       ...restaurant.toObject(),
//       token: req.token,
//     });
//   } catch (err) {
//     console.error("❌ Error updating restaurant profile:", err);
//     res.status(500).json({ message: "Error updating restaurant profile" });
//   }
// });

// /* ============================================================
//    📸 Upload Restaurant Gallery Images
//    ============================================================ */
// router.post(
//   "/upload_gallery", // ✅ changed to match frontend
//   protect,
//   restaurantOnly,
//   upload.array("images", 10),
//   async (req, res) => {
//     try {
//       const restaurant = await Restaurant.findById(req.user._id);
//       if (!restaurant)
//         return res.status(404).json({ message: "Restaurant not found" });

//       if (!req.files || req.files.length === 0)
//         return res.status(400).json({ message: "No files uploaded" });

//       const uploadedPaths = req.files.map(
//         (file) => `/uploads/restaurants/${file.filename}`
//       );

//       // ✅ Keep only latest 10
//       restaurant.galleryImages = [
//         ...(restaurant.galleryImages || []),
//         ...uploadedPaths,
//       ].slice(-10);

//       await restaurant.save();

//       res.json({
//         message: "Gallery images uploaded successfully",
//         galleryImages: restaurant.galleryImages,
//       });
//     } catch (error) {
//       console.error("❌ Error uploading gallery images:", error);
//       res.status(500).json({ message: "Failed to upload images" });
//     }
//   }
// );

// module.exports = router;





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
   📸 Multer Setup for Gallery Image Upload
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

// ✅ Update Restaurant Profile
router.put("/profile", protect, restaurantOnly, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user._id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    Object.assign(restaurant, req.body);
    await restaurant.save();

    res.json({
      ...restaurant.toObject(),
      token: req.token,
    });
  } catch (err) {
    console.error("❌ Error updating restaurant profile:", err);
    res.status(500).json({ message: "Error updating restaurant profile" });
  }
});

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

      // ✅ Create accessible URLs for frontend
      const uploadedPaths = req.files.map((file) => {
        const relativePath = path
          .join("/uploads/restaurants", path.basename(file.path))
          .replace(/\\/g, "/"); // fix Windows slashes
        return relativePath;
      });

      // ✅ Merge & keep only last 10
      restaurant.galleryImages = [
        ...(restaurant.galleryImages || []),
        ...uploadedPaths,
      ].slice(-10);

      await restaurant.save();

      console.log("✅ Uploaded gallery images:", uploadedPaths);

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
