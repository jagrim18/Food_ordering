// // // // backend/routes/restaurantRoutes.js
// // // const express = require("express");
// // // const multer = require("multer");
// // // const fs = require("fs");
// // // const path = require("path");
// // // const { protect, restaurantOnly } = require("../middlewares/authMiddleware");
// // // const {
// // //   getRestaurants,
// // //   registerRestaurant,
// // //   loginRestaurant,
// // // } = require("../controllers/restaurantController");
// // // const Restaurant = require("../models/Restaurant");

// // // const router = express.Router();

// // // /* ============================================================
// // //    📸 Multer Setup for Profile + Gallery Upload
// // //    ============================================================ */
// // // const uploadBaseDir = path.join(__dirname, "../uploads");
// // // const restaurantUploadDir = path.join(uploadBaseDir, "restaurants");

// // // // ✅ Ensure upload directories exist
// // // if (!fs.existsSync(uploadBaseDir)) fs.mkdirSync(uploadBaseDir);
// // // if (!fs.existsSync(restaurantUploadDir)) fs.mkdirSync(restaurantUploadDir);

// // // const storage = multer.diskStorage({
// // //   destination: (req, file, cb) => cb(null, restaurantUploadDir),
// // //   filename: (req, file, cb) => {
// // //     const safeName = file.originalname.replace(/\s+/g, "_");
// // //     cb(null, `${Date.now()}-${safeName}`);
// // //   },
// // // });

// // // const fileFilter = (req, file, cb) => {
// // //   const allowed = /jpeg|jpg|png|webp/;
// // //   const ext = path.extname(file.originalname).toLowerCase();
// // //   if (allowed.test(ext)) cb(null, true);
// // //   else cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed!"));
// // // };

// // // const upload = multer({ storage, fileFilter });

// // // /* ============================================================
// // //    🍽️ Public Routes
// // //    ============================================================ */
// // // router.get("/", getRestaurants);
// // // router.post("/register", registerRestaurant);
// // // router.post("/login", loginRestaurant);

// // // /* ============================================================
// // //    🔒 Protected Routes
// // //    ============================================================ */

// // // // ✅ Get Restaurant Profile
// // // router.get("/profile", protect, restaurantOnly, async (req, res) => {
// // //   try {
// // //     const restaurant = await Restaurant.findById(req.user._id).select("-password");
// // //     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
// // //     res.json(restaurant);
// // //   } catch (err) {
// // //     console.error("❌ Error fetching restaurant profile:", err);
// // //     res.status(500).json({ message: "Failed to load restaurant profile" });
// // //   }
// // // });

// // // // ✅ Update Restaurant Profile (with optional image)
// // // router.put(
// // //   "/profile",
// // //   protect,
// // //   restaurantOnly,
// // //   upload.single("profileImage"),
// // //   async (req, res) => {
// // //     try {
// // //       const restaurant = await Restaurant.findById(req.user._id);
// // //       if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

// // //       const updateFields = req.body;

// // //       // ✅ If image uploaded, save relative path
// // //       if (req.file) {
// // //         const relativePath = path
// // //           .join("/uploads/restaurants", path.basename(req.file.path))
// // //           .replace(/\\/g, "/");
// // //         updateFields.profileImage = relativePath;
// // //       }

// // //       Object.assign(restaurant, updateFields);
// // //       await restaurant.save();

// // //       res.json({
// // //         ...restaurant.toObject(),
// // //         token: req.token,
// // //       });
// // //     } catch (err) {
// // //       console.error("❌ Error updating restaurant profile:", err);
// // //       res.status(500).json({ message: "Error updating restaurant profile" });
// // //     }
// // //   }
// // // );

// // // /* ============================================================
// // //    📸 Upload Restaurant Gallery Images
// // //    ============================================================ */
// // // router.post(
// // //   "/upload-gallery",
// // //   protect,
// // //   restaurantOnly,
// // //   upload.array("images", 10),
// // //   async (req, res) => {
// // //     try {
// // //       const restaurant = await Restaurant.findById(req.user._id);
// // //       if (!restaurant)
// // //         return res.status(404).json({ message: "Restaurant not found" });

// // //       if (!req.files || req.files.length === 0)
// // //         return res.status(400).json({ message: "No files uploaded" });

// // //       const uploadedPaths = req.files.map((file) => {
// // //         const relativePath = path
// // //           .join("/uploads/restaurants", path.basename(file.path))
// // //           .replace(/\\/g, "/");
// // //         return relativePath;
// // //       });

// // //       restaurant.galleryImages = [
// // //         ...(restaurant.galleryImages || []),
// // //         ...uploadedPaths,
// // //       ].slice(-10);

// // //       await restaurant.save();

// // //       res.json({
// // //         message: "Gallery images uploaded successfully",
// // //         galleryImages: restaurant.galleryImages,
// // //       });
// // //     } catch (error) {
// // //       console.error("❌ Error uploading gallery images:", error);
// // //       res.status(500).json({ message: "Failed to upload images" });
// // //     }
// // //   }
// // // );

// // // module.exports = router;






// // // backend/routes/restaurantRoutes.js
// // const express = require("express");
// // const multer = require("multer");
// // const fs = require("fs");
// // const path = require("path");
// // const { protect, restaurantOnly } = require("../middlewares/authMiddleware");
// // const {
// //   getRestaurants,
// //   registerRestaurant,
// //   loginRestaurant,
// // } = require("../controllers/restaurantController");
// // const Restaurant = require("../models/Restaurant");

// // const router = express.Router();

// // /* ============================================================
// //    📸 Multer Setup for Profile + Gallery Upload
// //    ============================================================ */
// // const uploadBaseDir = path.join(__dirname, "../uploads");
// // const restaurantUploadDir = path.join(uploadBaseDir, "restaurants");

// // // ✅ Ensure upload directories exist safely
// // [uploadBaseDir, restaurantUploadDir].forEach((dir) => {
// //   if (!fs.existsSync(dir)) {
// //     fs.mkdirSync(dir, { recursive: true });
// //   }
// // });

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => cb(null, restaurantUploadDir),
// //   filename: (req, file, cb) => {
// //     const safeName = file.originalname.replace(/\s+/g, "_");
// //     cb(null, `${Date.now()}-${safeName}`);
// //   },
// // });

// // const fileFilter = (req, file, cb) => {
// //   const allowed = /\.(jpeg|jpg|png|webp)$/i;
// //   if (allowed.test(file.originalname)) cb(null, true);
// //   else cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed!"));
// // };

// // const upload = multer({ storage, fileFilter });

// // /* ============================================================
// //    🍽️ Public Routes
// //    ============================================================ */
// // router.get("/", getRestaurants);
// // router.post("/register", registerRestaurant);
// // router.post("/login", loginRestaurant);

// // /* ============================================================
// //    🔒 Protected Restaurant Routes
// //    ============================================================ */

// // // ✅ Get Restaurant Profile
// // router.get("/profile", protect, restaurantOnly, async (req, res) => {
// //   try {
// //     const restaurant = await Restaurant.findById(req.user._id).select("-password");
// //     if (!restaurant)
// //       return res.status(404).json({ message: "Restaurant not found" });

// //     res.status(200).json(restaurant);
// //   } catch (err) {
// //     console.error("❌ Error fetching restaurant profile:", err);
// //     res.status(500).json({ message: "Failed to load restaurant profile" });
// //   }
// // });

// // // ✅ Update Restaurant Profile (with optional image)
// // router.put(
// //   "/profile",
// //   protect,
// //   restaurantOnly,
// //   upload.single("profileImage"),
// //   async (req, res) => {
// //     try {
// //       const restaurant = await Restaurant.findById(req.user._id);
// //       if (!restaurant)
// //         return res.status(404).json({ message: "Restaurant not found" });

// //       const updateFields = {};
// //       const allowedFields = ["name", "address", "mobile", "cuisineType", "description"];

// //       allowedFields.forEach((key) => {
// //         if (req.body[key]) updateFields[key] = req.body[key];
// //       });

// //       // ✅ Handle uploaded profile image
// //       if (req.file) {
// //         const relativePath = path
// //           .join("/uploads/restaurants", path.basename(req.file.path))
// //           .replace(/\\/g, "/");
// //         updateFields.profileImage = relativePath;
// //       }

// //       Object.assign(restaurant, updateFields);
// //       await restaurant.save();

// //       res.status(200).json({
// //         message: "Profile updated successfully",
// //         restaurant: {
// //           ...restaurant.toObject(),
// //           token: req.token,
// //         },
// //       });
// //     } catch (err) {
// //       console.error("❌ Error updating restaurant profile:", err);
// //       res.status(500).json({ message: "Error updating restaurant profile" });
// //     }
// //   }
// // );

// // /* ============================================================
// //    📸 Upload Restaurant Gallery Images
// //    ============================================================ */
// // router.post(
// //   "/upload-gallery",
// //   protect,
// //   restaurantOnly,
// //   upload.array("images", 10),
// //   async (req, res) => {
// //     try {
// //       const restaurant = await Restaurant.findById(req.user._id);
// //       if (!restaurant)
// //         return res.status(404).json({ message: "Restaurant not found" });

// //       if (!req.files || req.files.length === 0)
// //         return res.status(400).json({ message: "No files uploaded" });

// //       const uploadedPaths = req.files.map((file) =>
// //         path
// //           .join("/uploads/restaurants", path.basename(file.path))
// //           .replace(/\\/g, "/")
// //       );

// //       // ✅ Keep max 10 recent images
// //       restaurant.galleryImages = [
// //         ...(restaurant.galleryImages || []),
// //         ...uploadedPaths,
// //       ].slice(-10);

// //       await restaurant.save();

// //       res.status(200).json({
// //         message: "Gallery images uploaded successfully",
// //         galleryImages: restaurant.galleryImages,
// //       });
// //     } catch (error) {
// //       console.error("❌ Error uploading gallery images:", error);
// //       res.status(500).json({ message: "Failed to upload images" });
// //     }
// //   }
// // );

// // /* ============================================================
// //    🗑️ (Optional) Delete Specific Gallery Image
// //    ============================================================ */
// // // You can uncomment this in future if you want delete functionality

// // router.delete(
// //   "/gallery/:imageName",
// //   protect,
// //   restaurantOnly,
// //   async (req, res) => {
// //     try {
// //       const restaurant = await Restaurant.findById(req.user._id);
// //       if (!restaurant)
// //         return res.status(404).json({ message: "Restaurant not found" });

// //       const imageName = req.params.imageName;
// //       restaurant.galleryImages = restaurant.galleryImages.filter(
// //         (img) => !img.includes(imageName)
// //       );

// //       await restaurant.save();

// //       const imagePath = path.join(restaurantUploadDir, imageName);
// //       if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

// //       res.json({
// //         message: "Image deleted successfully",
// //         galleryImages: restaurant.galleryImages,
// //       });
// //     } catch (error) {
// //       console.error("❌ Error deleting gallery image:", error);
// //       res.status(500).json({ message: "Failed to delete image" });
// //     }
// //   }
// // );


// // module.exports = router;







// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const { protect, restaurantOnly } = require("../middlewares/authMiddleware");
// const {
//   getRestaurants,
//   registerRestaurant,
//   loginRestaurant,
//   deleteGalleryImage,
// } = require("../controllers/restaurantController");
// const Restaurant = require("../models/Restaurant");

// const router = express.Router();

// /* ============================================================
//    📸 Multer Setup
//    ============================================================ */
// const uploadBaseDir = path.join(__dirname, "../uploads");
// const restaurantUploadDir = path.join(uploadBaseDir, "restaurants");

// [uploadBaseDir, restaurantUploadDir].forEach((dir) => {
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, restaurantUploadDir),
//   filename: (req, file, cb) => {
//     const safeName = file.originalname.replace(/\s+/g, "_");
//     cb(null, `${Date.now()}-${safeName}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = /\.(jpeg|jpg|png|webp)$/i;
//   if (allowed.test(file.originalname)) cb(null, true);
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
//    🔒 Protected Routes
//    ============================================================ */

// // ✅ Get Profile
// router.get("/profile", protect, restaurantOnly, async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id).select("-password");
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });
//     res.json(restaurant);
//   } catch (err) {
//     console.error("❌ Error fetching profile:", err);
//     res.status(500).json({ message: "Failed to load restaurant profile" });
//   }
// });

// // ✅ Update Profile
// router.put(
//   "/profile",
//   protect,
//   restaurantOnly,
//   upload.single("profileImage"),
//   async (req, res) => {
//     try {
//       const restaurant = await Restaurant.findById(req.user._id);
//       if (!restaurant)
//         return res.status(404).json({ message: "Restaurant not found" });

//       const allowedFields = ["name", "address", "mobile", "cuisineType", "description"];
//       allowedFields.forEach((key) => {
//         if (req.body[key]) restaurant[key] = req.body[key];
//       });

//       if (req.file) {
//         const relativePath = path
//           .join("/uploads/restaurants", path.basename(req.file.path))
//           .replace(/\\/g, "/");
//         restaurant.profileImage = relativePath;
//       }

//       await restaurant.save();
//       res.json({ message: "Profile updated successfully", restaurant });
//     } catch (err) {
//       console.error("❌ Update Profile Error:", err);
//       res.status(500).json({ message: "Error updating restaurant profile" });
//     }
//   }
// );

// // ✅ Upload Gallery
// router.post(
//   "/upload-gallery",
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

//       const uploadedPaths = req.files.map((file) =>
//         path.join("/uploads/restaurants", path.basename(file.path)).replace(/\\/g, "/")
//       );

//       restaurant.galleryImages = [...(restaurant.galleryImages || []), ...uploadedPaths].slice(-10);
//       await restaurant.save();

//       res.json({
//         message: "Gallery images uploaded successfully",
//         galleryImages: restaurant.galleryImages,
//       });
//     } catch (error) {
//       console.error("❌ Error uploading gallery:", error);
//       res.status(500).json({ message: "Failed to upload images" });
//     }
//   }
// );

// // ✅ Delete Gallery Image
// router.delete(
//   "/gallery/:imageName",
//   protect,
//   restaurantOnly,
//   deleteGalleryImage
// );

// module.exports = router;
// // ============================================================
// // 🛠️ UPDATE OUTLET (Used by Admin Edit Modal)
// // ============================================================
// router.put("/:id", async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     const allowedFields = [
//       "restaurantName",
//       "description",
//       "openTime",
//       "closeTime",
//       "isOpen",
//       "profileImage"
//     ];

//     allowedFields.forEach((key) => {
//       if (req.body[key] !== undefined) {
//         restaurant[key] = req.body[key];
//       }
//     });

//     await restaurant.save();

//     res.json({ message: "Outlet updated successfully", restaurant });
//   } catch (err) {
//     console.error("❌ Update Outlet Error:", err);
//     res.status(500).json({ message: "Failed to update outlet" });
//   }
// });








// backend/routes/restaurantRoutes.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { protect, restaurantOnly } = require("../middlewares/authMiddleware");
const restaurantController = require("../controllers/restaurantController");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

/* Multer for profile/gallery (same as controller uses) */
const uploadBaseDir = path.join(__dirname, "../uploads");
const restaurantUploadDir = path.join(uploadBaseDir, "restaurants");
[uploadBaseDir, restaurantUploadDir].forEach((d) => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, restaurantUploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});
const fileFilter = (req, file, cb) => {
  const allowed = /\.(jpeg|jpg|png|webp)$/i;
  if (allowed.test(file.originalname)) cb(null, true);
  else cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed!"));
};
const upload = multer({ storage, fileFilter });

/* Public */
router.get("/", restaurantController.getRestaurants);
router.post("/register", restaurantController.registerRestaurant);
router.post("/login", restaurantController.loginRestaurant);

/* Protected profile endpoints */
router.get("/profile", protect, restaurantOnly, restaurantController.getRestaurantProfile);
router.put("/profile", protect, restaurantOnly, upload.single("profileImage"), restaurantController.updateRestaurantProfile);
router.post("/upload-gallery", protect, restaurantOnly, upload.array("images", 10), restaurantController.uploadGallery);
router.delete("/gallery/:imageName", protect, restaurantOnly, restaurantController.deleteGalleryImage);

/* Admin/Edit outlet route (update by id) */
router.put("/:id", restaurantController.updateRestaurantById);

/* Get by id */
router.get("/:id", restaurantController.getRestaurantById);

module.exports = router;
