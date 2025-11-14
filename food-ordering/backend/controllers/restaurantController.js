// // // const Restaurant = require("../models/Restaurant");
// // // const jwt = require("jsonwebtoken");
// // // const multer = require("multer");
// // // const path = require("path");

// // // // ✅ Generate JWT
// // // const generateToken = (id) => {
// // //   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// // // };

// // // // ============================================================
// // // // 🍽️ REGISTER RESTAURANT
// // // // ============================================================
// // // exports.registerRestaurant = async (req, res) => {
// // //   try {
// // //     const { name, email, password, address, phone, cuisine, image } = req.body;

// // //     if (!name || !email || !password) {
// // //       return res
// // //         .status(400)
// // //         .json({ message: "Please provide name, email, and password" });
// // //     }

// // //     const existing = await Restaurant.findOne({ email });
// // //     if (existing) {
// // //       return res.status(400).json({ message: "Restaurant already exists" });
// // //     }

// // //     const imageUrl = image || "/images/default-restaurant.png";

// // //     const restaurant = new Restaurant({
// // //       name,
// // //       email,
// // //       password,
// // //       address: address || "",
// // //       mobile: phone || "",
// // //       cuisineType: cuisine || "",
// // //       image: imageUrl,
// // //     });

// // //     await restaurant.save();

// // //     res.status(201).json({
// // //       message: "Restaurant registered successfully",
// // //       _id: restaurant._id,
// // //       name: restaurant.name,
// // //       email: restaurant.email,
// // //       role: restaurant.role,
// // //       token: generateToken(restaurant._id),
// // //     });
// // //   } catch (err) {
// // //     console.error("❌ Register Error:", err);
// // //     res.status(500).json({
// // //       message: "Failed to register restaurant",
// // //       error: err.message,
// // //     });
// // //   }
// // // };

// // // // ============================================================
// // // // 🍽️ LOGIN RESTAURANT
// // // // ============================================================
// // // exports.loginRestaurant = async (req, res) => {
// // //   try {
// // //     const { email, password } = req.body;
// // //     const restaurant = await Restaurant.findOne({ email });

// // //     if (!restaurant) {
// // //       return res.status(400).json({ message: "Invalid email or password" });
// // //     }

// // //     const isMatch = await restaurant.matchPassword(password);
// // //     if (!isMatch) {
// // //       return res.status(400).json({ message: "Invalid email or password" });
// // //     }

// // //     res.json({
// // //       _id: restaurant._id,
// // //       name: restaurant.name,
// // //       email: restaurant.email,
// // //       role: restaurant.role,
// // //       token: generateToken(restaurant._id),
// // //     });
// // //   } catch (err) {
// // //     console.error("❌ Login Error:", err);
// // //     res.status(500).json({ message: "Failed to login", error: err.message });
// // //   }
// // // };

// // // // ============================================================
// // // // 👑 ADD RESTAURANT (Admin)
// // // // ============================================================
// // // exports.addRestaurant = async (req, res) => {
// // //   try {
// // //     const { name, address, phone, email, password, cuisine, image } = req.body;
// // //     const imageUrl = image || "/images/default-restaurant.png";

// // //     const restaurant = new Restaurant({
// // //       name,
// // //       address,
// // //       mobile: phone,
// // //       email,
// // //       password,
// // //       cuisineType: cuisine,
// // //       image: imageUrl,
// // //     });

// // //     await restaurant.save();
// // //     res
// // //       .status(201)
// // //       .json({ message: "Restaurant added successfully", restaurant });
// // //   } catch (error) {
// // //     console.error("❌ Add Restaurant Error:", error);
// // //     res
// // //       .status(500)
// // //       .json({ message: "Error adding restaurant", error: error.message });
// // //   }
// // // };

// // // // ============================================================
// // // // 📋 GET ALL RESTAURANTS
// // // // ============================================================
// // // exports.getRestaurants = async (req, res) => {
// // //   try {
// // //     const restaurants = await Restaurant.find().sort({ createdAt: -1 });
// // //     res.json(restaurants);
// // //   } catch (error) {
// // //     console.error("❌ Get Restaurants Error:", error);
// // //     res.status(500).json({ message: "Error fetching restaurants" });
// // //   }
// // // };

// // // // ============================================================
// // // // 🔍 GET RESTAURANT BY ID
// // // // ============================================================
// // // exports.getRestaurantById = async (req, res) => {
// // //   try {
// // //     const restaurant = await Restaurant.findById(req.params.id);
// // //     if (!restaurant)
// // //       return res.status(404).json({ message: "Restaurant not found" });

// // //     res.json(restaurant);
// // //   } catch (error) {
// // //     console.error("❌ Get Restaurant by ID Error:", error);
// // //     res
// // //       .status(500)
// // //       .json({ message: "Error fetching restaurant", error: error.message });
// // //   }
// // // };

// // // // ============================================================
// // // // 📸 MULTER SETUP
// // // // ============================================================
// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, path.join(__dirname, "../uploads/restaurants"));
// // //   },
// // //   filename: function (req, file, cb) {
// // //     const ext = path.extname(file.originalname);
// // //     cb(null, `${Date.now()}_${file.fieldname}${ext}`);
// // //   },
// // // });

// // // const upload = multer({ storage });

// // // // ============================================================
// // // // 🖼️ UPLOAD GALLERY IMAGES
// // // // ============================================================
// // // exports.uploadGallery = [
// // //   upload.array("images", 10),
// // //   async (req, res) => {
// // //     try {
// // //       const restaurant = await Restaurant.findById(req.user._id);
// // //       if (!restaurant)
// // //         return res.status(404).json({ message: "Restaurant not found" });

// // //       const imagePaths = req.files.map(
// // //         (file) => `/uploads/restaurants/${file.filename}`
// // //       );

// // //       restaurant.galleryImages = [
// // //         ...restaurant.galleryImages,
// // //         ...imagePaths,
// // //       ].slice(-10);

// // //       await restaurant.save();

// // //       res.json({
// // //         message: "Gallery uploaded successfully!",
// // //         galleryImages: restaurant.galleryImages,
// // //       });
// // //     } catch (error) {
// // //       console.error("❌ Upload Gallery Error:", error);
// // //       res
// // //         .status(500)
// // //         .json({ message: "Failed to upload gallery", error: error.message });
// // //     }
// // //   },
// // // ];

// // // // ============================================================
// // // // 👤 GET RESTAURANT PROFILE
// // // // ============================================================
// // // exports.getRestaurantProfile = async (req, res) => {
// // //   try {
// // //     const restaurant = await Restaurant.findById(req.user._id).select(
// // //       "-password"
// // //     );
// // //     if (!restaurant)
// // //       return res.status(404).json({ message: "Restaurant not found" });

// // //     res.json(restaurant);
// // //   } catch (error) {
// // //     console.error("❌ Get Profile Error:", error);
// // //     res
// // //       .status(500)
// // //       .json({ message: "Failed to fetch profile", error: error.message });
// // //   }
// // // };

// // // // ============================================================
// // // // ✏️ UPDATE RESTAURANT PROFILE
// // // // ============================================================
// // // exports.updateRestaurantProfile = [
// // //   upload.single("profileImage"),
// // //   async (req, res) => {
// // //     try {
// // //       const restaurant = await Restaurant.findById(req.user._id);
// // //       if (!restaurant)
// // //         return res.status(404).json({ message: "Restaurant not found" });

// // //       const { name, mobile, address, cuisineType } = req.body;

// // //       if (name) restaurant.name = name;
// // //       if (mobile) restaurant.mobile = mobile;
// // //       if (address) restaurant.address = address;
// // //       if (cuisineType) restaurant.cuisineType = cuisineType;

// // //       if (req.file) {
// // //         restaurant.profilePic = `/uploads/restaurants/${req.file.filename}`;
// // //       }

// // //       const updated = await restaurant.save();
// // //       res.json({
// // //         message: "Profile updated successfully",
// // //         restaurant: updated,
// // //       });
// // //     } catch (error) {
// // //       console.error("❌ Update Profile Error:", error);
// // //       res
// // //         .status(500)
// // //         .json({ message: "Failed to update profile", error: error.message });
// // //     }
// // //   },
// // // ];




// // const Restaurant = require("../models/Restaurant");
// // const jwt = require("jsonwebtoken");
// // const multer = require("multer");
// // const path = require("path");

// // // ✅ Generate JWT
// // const generateToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// // };

// // // ============================================================
// // // 🍽️ REGISTER RESTAURANT
// // // ============================================================
// // exports.registerRestaurant = async (req, res) => {
// //   try {
// //     const { name, email, password, address, phone, cuisine, image } = req.body;

// //     if (!name || !email || !password) {
// //       return res
// //         .status(400)
// //         .json({ message: "Please provide name, email, and password" });
// //     }

// //     const existing = await Restaurant.findOne({ email });
// //     if (existing) {
// //       return res.status(400).json({ message: "Restaurant already exists" });
// //     }

// //     const imageUrl = image || "/images/default-restaurant.png";

// //     const restaurant = new Restaurant({
// //       name,
// //       email,
// //       password,
// //       address: address || "",
// //       mobile: phone || "",
// //       cuisineType: cuisine || "",
// //       image: imageUrl,
// //     });

// //     await restaurant.save();

// //     res.status(201).json({
// //       message: "Restaurant registered successfully",
// //       _id: restaurant._id,
// //       name: restaurant.name,
// //       email: restaurant.email,
// //       role: restaurant.role,
// //       token: generateToken(restaurant._id),
// //     });
// //   } catch (err) {
// //     console.error("❌ Register Error:", err);
// //     res.status(500).json({
// //       message: "Failed to register restaurant",
// //       error: err.message,
// //     });
// //   }
// // };

// // // ============================================================
// // // 🍽️ LOGIN RESTAURANT
// // // ============================================================
// // exports.loginRestaurant = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     const restaurant = await Restaurant.findOne({ email });

// //     if (!restaurant) {
// //       return res.status(400).json({ message: "Invalid email or password" });
// //     }

// //     const isMatch = await restaurant.matchPassword(password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid email or password" });
// //     }

// //     res.json({
// //       _id: restaurant._id,
// //       name: restaurant.name,
// //       email: restaurant.email,
// //       role: restaurant.role,
// //       token: generateToken(restaurant._id),
// //     });
// //   } catch (err) {
// //     console.error("❌ Login Error:", err);
// //     res.status(500).json({ message: "Failed to login", error: err.message });
// //   }
// // };

// // // ============================================================
// // // 👑 ADD RESTAURANT (Admin)
// // // ============================================================
// // exports.addRestaurant = async (req, res) => {
// //   try {
// //     const { name, address, phone, email, password, cuisine, image } = req.body;
// //     const imageUrl = image || "/images/default-restaurant.png";

// //     const restaurant = new Restaurant({
// //       name,
// //       address,
// //       mobile: phone,
// //       email,
// //       password,
// //       cuisineType: cuisine,
// //       image: imageUrl,
// //     });

// //     await restaurant.save();
// //     res
// //       .status(201)
// //       .json({ message: "Restaurant added successfully", restaurant });
// //   } catch (error) {
// //     console.error("❌ Add Restaurant Error:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Error adding restaurant", error: error.message });
// //   }
// // };

// // // ============================================================
// // // 📋 GET ALL RESTAURANTS (with gallery images)
// // // ============================================================
// // exports.getRestaurants = async (req, res) => {
// //   try {
// //     const restaurants = await Restaurant.find()
// //       .select("name cuisineType address rating galleryImages image")
// //       .sort({ createdAt: -1 });

// //     res.status(200).json(restaurants);
// //   } catch (error) {
// //     console.error("❌ Get Restaurants Error:", error);
// //     res.status(500).json({ message: "Error fetching restaurants" });
// //   }
// // };

// // // ============================================================
// // // 🔍 GET RESTAURANT BY ID
// // // ============================================================
// // exports.getRestaurantById = async (req, res) => {
// //   try {
// //     const restaurant = await Restaurant.findById(req.params.id);
// //     if (!restaurant)
// //       return res.status(404).json({ message: "Restaurant not found" });

// //     res.json(restaurant);
// //   } catch (error) {
// //     console.error("❌ Get Restaurant by ID Error:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Error fetching restaurant", error: error.message });
// //   }
// // };

// // // ============================================================
// // // 📸 MULTER SETUP
// // // ============================================================
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, "../uploads/restaurants"));
// //   },
// //   filename: function (req, file, cb) {
// //     const ext = path.extname(file.originalname);
// //     cb(null, `${Date.now()}_${file.fieldname}${ext}`);
// //   },
// // });

// // const upload = multer({ storage });

// // // ============================================================
// // // 🖼️ UPLOAD GALLERY IMAGES
// // // ============================================================
// // exports.uploadGallery = [
// //   upload.array("images", 10),
// //   async (req, res) => {
// //     try {
// //       const restaurant = await Restaurant.findById(req.user._id);
// //       if (!restaurant)
// //         return res.status(404).json({ message: "Restaurant not found" });

// //       const imagePaths = req.files.map(
// //         (file) => `/uploads/restaurants/${file.filename}`
// //       );

// //       restaurant.galleryImages = [
// //         ...restaurant.galleryImages,
// //         ...imagePaths,
// //       ].slice(-10);

// //       await restaurant.save();

// //       res.json({
// //         message: "Gallery uploaded successfully!",
// //         galleryImages: restaurant.galleryImages,
// //       });
// //     } catch (error) {
// //       console.error("❌ Upload Gallery Error:", error);
// //       res
// //         .status(500)
// //         .json({ message: "Failed to upload gallery", error: error.message });
// //     }
// //   },
// // ];

// // // ============================================================
// // // 👤 GET RESTAURANT PROFILE
// // // ============================================================
// // exports.getRestaurantProfile = async (req, res) => {
// //   try {
// //     const restaurant = await Restaurant.findById(req.user._id).select(
// //       "-password"
// //     );
// //     if (!restaurant)
// //       return res.status(404).json({ message: "Restaurant not found" });

// //     res.json(restaurant);
// //   } catch (error) {
// //     console.error("❌ Get Profile Error:", error);
// //     res
// //       .status(500)
// //       .json({ message: "Failed to fetch profile", error: error.message });
// //   }
// // };

// // // ============================================================
// // // ✏️ UPDATE RESTAURANT PROFILE
// // // ============================================================
// // exports.updateRestaurantProfile = [
// //   upload.single("profileImage"),
// //   async (req, res) => {
// //     try {
// //       const restaurant = await Restaurant.findById(req.user._id);
// //       if (!restaurant)
// //         return res.status(404).json({ message: "Restaurant not found" });

// //       const { name, mobile, address, cuisineType } = req.body;

// //       if (name) restaurant.name = name;
// //       if (mobile) restaurant.mobile = mobile;
// //       if (address) restaurant.address = address;
// //       if (cuisineType) restaurant.cuisineType = cuisineType;

// //       if (req.file) {
// //         restaurant.profilePic = `/uploads/restaurants/${req.file.filename}`;
// //       }

// //       const updated = await restaurant.save();
// //       res.json({
// //         message: "Profile updated successfully",
// //         restaurant: updated,
// //       });
// //     } catch (error) {
// //       console.error("❌ Update Profile Error:", error);
// //       res
// //         .status(500)
// //         .json({ message: "Failed to update profile", error: error.message });
// //     }
// //   },
// // ];
// // // ============================================================
// // // 🗑️ DELETE SPECIFIC GALLERY IMAGE
// // // ============================================================
// // exports.deleteGalleryImage = async (req, res) => {
// //   try {
// //     const restaurant = await Restaurant.findById(req.user._id);
// //     if (!restaurant)
// //       return res.status(404).json({ message: "Restaurant not found" });

// //     const imageName = req.params.imageName;
// //     const fullImagePath = path.join(__dirname, "../uploads/restaurants", imageName);

// //     // Remove from DB
// //     restaurant.galleryImages = restaurant.galleryImages.filter(
// //       (img) => !img.includes(imageName)
// //     );
// //     await restaurant.save();

// //     // Remove file from storage
// //     if (fs.existsSync(fullImagePath)) fs.unlinkSync(fullImagePath);

// //     res.status(200).json({
// //       message: "Image deleted successfully",
// //       galleryImages: restaurant.galleryImages,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error deleting gallery image:", error);
// //     res.status(500).json({ message: "Failed to delete image" });
// //   }
// // };


// const fs = require("fs");
// const path = require("path");
// const Restaurant = require("../models/Restaurant");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");

// // ✅ Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

// // ============================================================
// // 🍽️ REGISTER RESTAURANT
// // ============================================================
// exports.registerRestaurant = async (req, res) => {
//   try {
//     const { name, email, password, address, phone, cuisine, image } = req.body;

//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide name, email, and password" });
//     }

//     const existing = await Restaurant.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Restaurant already exists" });
//     }

//     const imageUrl = image || "/images/default-restaurant.png";

//     const restaurant = new Restaurant({
//       name,
//       email,
//       password,
//       address: address || "",
//       mobile: phone || "",
//       cuisineType: cuisine || "",
//       image: imageUrl,
//     });

//     await restaurant.save();

//     res.status(201).json({
//       message: "Restaurant registered successfully",
//       _id: restaurant._id,
//       name: restaurant.name,
//       email: restaurant.email,
//       role: restaurant.role,
//       token: generateToken(restaurant._id),
//     });
//   } catch (err) {
//     console.error("❌ Register Error:", err);
//     res.status(500).json({
//       message: "Failed to register restaurant",
//       error: err.message,
//     });
//   }
// };

// // ============================================================
// // 🍽️ LOGIN RESTAURANT
// // ============================================================
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
//       role: restaurant.role,
//       token: generateToken(restaurant._id),
//     });
//   } catch (err) {
//     console.error("❌ Login Error:", err);
//     res.status(500).json({ message: "Failed to login", error: err.message });
//   }
// };

// // ============================================================
// // 👑 ADD RESTAURANT (Admin)
// // ============================================================
// exports.addRestaurant = async (req, res) => {
//   try {
//     const { name, address, phone, email, password, cuisine, image } = req.body;
//     const imageUrl = image || "/images/default-restaurant.png";

//     const restaurant = new Restaurant({
//       name,
//       address,
//       mobile: phone,
//       email,
//       password,
//       cuisineType: cuisine,
//       image: imageUrl,
//     });

//     await restaurant.save();
//     res
//       .status(201)
//       .json({ message: "Restaurant added successfully", restaurant });
//   } catch (error) {
//     console.error("❌ Add Restaurant Error:", error);
//     res
//       .status(500)
//       .json({ message: "Error adding restaurant", error: error.message });
//   }
// };

// // ============================================================
// // 📋 GET ALL RESTAURANTS (with gallery images)
// // ============================================================
// exports.getRestaurants = async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find()
//       .select("name cuisineType address rating galleryImages image")
//       .sort({ createdAt: -1 });

//     res.status(200).json(restaurants);
//   } catch (error) {
//     console.error("❌ Get Restaurants Error:", error);
//     res.status(500).json({ message: "Error fetching restaurants" });
//   }
// };

// // ============================================================
// // 🔍 GET RESTAURANT BY ID
// // ============================================================
// exports.getRestaurantById = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     res.json(restaurant);
//   } catch (error) {
//     console.error("❌ Get Restaurant by ID Error:", error);
//     res
//       .status(500)
//       .json({ message: "Error fetching restaurant", error: error.message });
//   }
// };

// // ============================================================
// // 📸 MULTER SETUP
// // ============================================================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../uploads/restaurants"));
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}_${file.fieldname}${ext}`);
//   },
// });
// const upload = multer({ storage });

// // ============================================================
// // 🖼️ UPLOAD GALLERY IMAGES
// // ============================================================
// exports.uploadGallery = [
//   upload.array("images", 10),
//   async (req, res) => {
//     try {
//       const restaurant = await Restaurant.findById(req.user._id);
//       if (!restaurant)
//         return res.status(404).json({ message: "Restaurant not found" });

//       const imagePaths = req.files.map(
//         (file) => `/uploads/restaurants/${file.filename}`
//       );

//       restaurant.galleryImages = [
//         ...restaurant.galleryImages,
//         ...imagePaths,
//       ].slice(-10);

//       await restaurant.save();

//       res.json({
//         message: "Gallery uploaded successfully!",
//         galleryImages: restaurant.galleryImages,
//       });
//     } catch (error) {
//       console.error("❌ Upload Gallery Error:", error);
//       res
//         .status(500)
//         .json({ message: "Failed to upload gallery", error: error.message });
//     }
//   },
// ];

// // ============================================================
// // 👤 GET RESTAURANT PROFILE
// // ============================================================
// exports.getRestaurantProfile = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id).select(
//       "-password"
//     );
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     res.json(restaurant);
//   } catch (error) {
//     console.error("❌ Get Profile Error:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch profile", error: error.message });
//   }
// };

// // ============================================================
// // ✏️ UPDATE RESTAURANT PROFILE
// // ============================================================
// exports.updateRestaurantProfile = [
//   upload.single("profileImage"),
//   async (req, res) => {
//     try {
//       const restaurant = await Restaurant.findById(req.user._id);
//       if (!restaurant)
//         return res.status(404).json({ message: "Restaurant not found" });

//       const { name, mobile, address, cuisineType } = req.body;

//       if (name) restaurant.name = name;
//       if (mobile) restaurant.mobile = mobile;
//       if (address) restaurant.address = address;
//       if (cuisineType) restaurant.cuisineType = cuisineType;

//       if (req.file) {
//         restaurant.profilePic = `/uploads/restaurants/${req.file.filename}`;
//       }

//       const updated = await restaurant.save();
//       res.json({
//         message: "Profile updated successfully",
//         restaurant: updated,
//       });
//     } catch (error) {
//       console.error("❌ Update Profile Error:", error);
//       res
//         .status(500)
//         .json({ message: "Failed to update profile", error: error.message });
//     }
//   },
// ];

// // ============================================================
// // 🗑️ DELETE SPECIFIC GALLERY IMAGE (FIXED VERSION)
// // ============================================================
// exports.deleteGalleryImage = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id);
//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     const imageName = req.params.imageName;
//     console.log("🧩 Image to delete:", imageName);

//     // Find matching image path in DB
//     const matchedImage = restaurant.galleryImages.find((img) =>
//       img.includes(imageName)
//     );
//     if (!matchedImage) {
//       return res.status(404).json({ message: "Image not found in gallery" });
//     }

//     // Convert DB path to absolute path safely
//     const absolutePath = path.join(__dirname, "..", matchedImage.replace(/^\//, ""));
//     console.log("📂 Resolved path:", absolutePath);

//     // Delete file if exists
//     if (fs.existsSync(absolutePath)) {
//       fs.unlinkSync(absolutePath);
//       console.log("✅ File deleted from disk");
//     } else {
//       console.warn("⚠️ File not found on disk, skipping unlink");
//     }

//     // Remove from DB
//     restaurant.galleryImages = restaurant.galleryImages.filter(
//       (img) => !img.includes(imageName)
//     );
//     await restaurant.save();

//     res.status(200).json({
//       message: "Image deleted successfully",
//       galleryImages: restaurant.galleryImages,
//     });
//   } catch (error) {
//     console.error("❌ Error deleting gallery image:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to delete image", error: error.message });
//   }
// };


// backend/controllers/restaurantController.js
const fs = require("fs");
const path = require("path");
const Restaurant = require("../models/Restaurant");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ===== REGISTER (restaurant) =====
exports.registerRestaurant = async (req, res) => {
  try {
    // we accept restaurantName optionally; if not provided, use 'name'
    const {
      name,
      restaurantName,
      email,
      password,
      address,
      phone,
      cuisine,
      image,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    const existing = await Restaurant.findOne({ email });
    if (existing) return res.status(400).json({ message: "Restaurant already exists" });

    const imageUrl = image || "/images/default-restaurant.png";

    const restaurant = new Restaurant({
      name,
      restaurantName: restaurantName || name,
      email,
      password,
      address: address || "",
      mobile: phone || "",
      cuisineType: cuisine || "",
      profileImage: imageUrl,
      image: imageUrl,
    });

    await restaurant.save();

    res.status(201).json({
      message: "Restaurant registered successfully",
      _id: restaurant._id,
      name: restaurant.name,
      restaurantName: restaurant.restaurantName,
      email: restaurant.email,
      role: restaurant.role,
      token: generateToken(restaurant._id),
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Failed to register restaurant", error: err.message });
  }
};

// ===== LOGIN =====
exports.loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;
    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await restaurant.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({
      _id: restaurant._id,
      name: restaurant.name,
      restaurantName: restaurant.restaurantName,
      email: restaurant.email,
      role: restaurant.role,
      token: generateToken(restaurant._id),
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Failed to login", error: err.message });
  }
};

// ===== ADD RESTAURANT (admin) =====
exports.addRestaurant = async (req, res) => {
  try {
    const { name, restaurantName, address, phone, email, password, cuisine, image } = req.body;
    const imageUrl = image || "/images/default-restaurant.png";

    const restaurant = new Restaurant({
      name: name || restaurantName || "Restaurant",
      restaurantName: restaurantName || name || "Restaurant",
      address,
      mobile: phone,
      email,
      password,
      cuisineType: cuisine,
      profileImage: imageUrl,
      image: imageUrl,
    });

    await restaurant.save();
    res.status(201).json({ message: "Restaurant added successfully", restaurant });
  } catch (error) {
    console.error("❌ Add Restaurant Error:", error);
    res.status(500).json({ message: "Error adding restaurant", error: error.message });
  }
};

// ===== GET ALL RESTAURANTS =====
exports.getRestaurants = async (req, res) => {
  try {
    // include restaurantName and profileImage for UI
    const restaurants = await Restaurant.find()
      .select("restaurantName cuisineType address rating galleryImages profileImage image")
      .sort({ createdAt: -1 });

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("❌ Get Restaurants Error:", error);
    res.status(500).json({ message: "Error fetching restaurants" });
  }
};

// ===== GET BY ID =====
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).lean();
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    console.error("❌ Get Restaurant by ID Error:", error);
    res.status(500).json({ message: "Error fetching restaurant", error: error.message });
  }
};

// ===== Multer setup for profile/gallery uploads (used by profile endpoints) =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/restaurants");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${file.fieldname}${ext}`);
  },
});
const upload = multer({ storage });

// ===== UPLOAD GALLERY =====
exports.uploadGallery = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.user._id);
      if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

      const imagePaths = req.files.map((file) => `/uploads/restaurants/${file.filename}`);
      restaurant.galleryImages = [...(restaurant.galleryImages || []), ...imagePaths].slice(-10);
      await restaurant.save();

      res.json({ message: "Gallery uploaded successfully!", galleryImages: restaurant.galleryImages });
    } catch (error) {
      console.error("❌ Upload Gallery Error:", error);
      res.status(500).json({ message: "Failed to upload gallery", error: error.message });
    }
  },
];

// ===== GET PROFILE =====
exports.getRestaurantProfile = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user._id).select("-password");
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    console.error("❌ Get Profile Error:", error);
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};

// ===== UPDATE PROFILE (for logged-in restaurant) =====
exports.updateRestaurantProfile = [
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.user._id);
      if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

      const { name, mobile, address, cuisineType, description, restaurantName, openTime, closeTime, isOpen } = req.body;

      if (name) restaurant.name = name;
      if (restaurantName) restaurant.restaurantName = restaurantName;
      if (mobile) restaurant.mobile = mobile;
      if (address) restaurant.address = address;
      if (cuisineType) restaurant.cuisineType = cuisineType;
      if (description !== undefined) restaurant.description = description;
      if (openTime) restaurant.openTime = openTime;
      if (closeTime) restaurant.closeTime = closeTime;
      if (isOpen !== undefined) restaurant.isOpen = isOpen;

      if (req.file) {
        const rel = `/uploads/restaurants/${req.file.filename}`;
        restaurant.profileImage = rel;
        restaurant.profilePic = rel;
        restaurant.image = rel;
      }

      const updated = await restaurant.save();
      res.json({ message: "Profile updated successfully", restaurant: updated });
    } catch (error) {
      console.error("❌ Update Profile Error:", error);
      res.status(500).json({ message: "Failed to update profile", error: error.message });
    }
  },
];

// ===== UPDATE BY ID (ADMIN / EDIT OUTLET) =====
exports.updateRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const allowed = ["restaurantName", "description", "openTime", "closeTime", "isOpen", "profileImage", "image"];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) restaurant[key] = req.body[key];
    });

    // if profileImage sent as a plain string path, also sync image/profilePic
    if (req.body.profileImage) {
      restaurant.image = req.body.profileImage;
      restaurant.profilePic = req.body.profileImage;
    }

    await restaurant.save();
    res.json({ message: "Outlet updated successfully", restaurant });
  } catch (err) {
    console.error("❌ Update Outlet Error:", err);
    res.status(500).json({ message: "Failed to update outlet", error: err.message });
  }
};

// ===== DELETE GALLERY IMAGE =====
exports.deleteGalleryImage = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user._id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const imageName = req.params.imageName;
    const matchedImage = restaurant.galleryImages.find((img) => img.includes(imageName));
    if (!matchedImage) return res.status(404).json({ message: "Image not found in gallery" });

    const absolutePath = path.join(__dirname, "..", matchedImage.replace(/^\//, ""));
    if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);

    restaurant.galleryImages = restaurant.galleryImages.filter((img) => !img.includes(imageName));
    await restaurant.save();

    res.status(200).json({ message: "Image deleted successfully", galleryImages: restaurant.galleryImages });
  } catch (error) {
    console.error("❌ Error deleting gallery image:", error);
    res.status(500).json({ message: "Failed to delete image", error: error.message });
  }
};
