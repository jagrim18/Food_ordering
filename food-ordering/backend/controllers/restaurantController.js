// const fs = require("fs");
// const path = require("path");
// const Restaurant = require("../models/Restaurant");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");

// // token helper
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

// // ===== REGISTER (restaurant) =====
// exports.registerRestaurant = async (req, res) => {
//   try {
//     const {
//       name,
//       restaurantName,
//       email,
//       password,
//       address,
//       phone,
//       cuisine,
//       image,
//     } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Please provide name, email, and password" });
//     }

//     const existing = await Restaurant.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Restaurant already exists" });

//     const imageUrl = image || "/images/default-restaurant.png";

//     const restaurant = new Restaurant({
//       name,
//       restaurantName: restaurantName || name,
//       email,
//       password,
//       address: address || "",
//       mobile: phone || "",
//       cuisineType: cuisine || "",
//       profileImage: imageUrl,
//       image: imageUrl,
//     });

//     await restaurant.save();

//     res.status(201).json({
//       message: "Restaurant registered successfully",
//       _id: restaurant._id,
//       name: restaurant.name,
//       restaurantName: restaurant.restaurantName,
//       email: restaurant.email,
//       role: restaurant.role,
//       token: generateToken(restaurant._id),
//     });
//   } catch (err) {
//     console.error("❌ Register Error:", err);
//     res.status(500).json({ message: "Failed to register restaurant", error: err.message });
//   }
// };

// // ===== LOGIN =====
// exports.loginRestaurant = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const restaurant = await Restaurant.findOne({ email });
//     if (!restaurant) return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await restaurant.matchPassword(password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     res.json({
//       _id: restaurant._id,
//       name: restaurant.name,
//       restaurantName: restaurant.restaurantName,
//       email: restaurant.email,
//       role: restaurant.role,
//       token: generateToken(restaurant._id),
//     });
//   } catch (err) {
//     console.error("❌ Login Error:", err);
//     res.status(500).json({ message: "Failed to login", error: err.message });
//   }
// };

// // ===== ADD RESTAURANT (admin) =====
// exports.addRestaurant = async (req, res) => {
//   try {
//     const { name, restaurantName, address, phone, email, password, cuisine, image } = req.body;
//     const imageUrl = image || "/images/default-restaurant.png";

//     const restaurant = new Restaurant({
//       name: name || restaurantName || "Restaurant",
//       restaurantName: restaurantName || name || "Restaurant",
//       address,
//       mobile: phone,
//       email,
//       password,
//       cuisineType: cuisine,
//       profileImage: imageUrl,
//       image: imageUrl,
//     });

//     await restaurant.save();
//     res.status(201).json({ message: "Restaurant added successfully", restaurant });
//   } catch (error) {
//     console.error("❌ Add Restaurant Error:", error);
//     res.status(500).json({ message: "Error adding restaurant", error: error.message });
//   }
// };

// // ===== GET ALL RESTAURANTS (ONLY OPEN RESTAURANTS) =====
// // ===== GET ALL RESTAURANTS (ONLY OPEN RESTAURANTS) =====
// exports.getRestaurants = async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find({ isOpen: true })
//       .select(
//         "name restaurantName cuisineType address rating galleryImages profileImage image isOpen openTime closeTime description"
//       )
//       .sort({ createdAt: -1 });

//     res.status(200).json(restaurants);
//   } catch (error) {
//     console.error("❌ Get Restaurants Error:", error);
//     res.status(500).json({ message: "Error fetching restaurants" });
//   }
// };


// // ===== GET BY ID =====
// exports.getRestaurantById = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id).lean();
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
//     res.json(restaurant);
//   } catch (error) {
//     console.error("❌ Get Restaurant by ID Error:", error);
//     res.status(500).json({ message: "Error fetching restaurant", error: error.message });
//   }
// };

// // ===== Multer setup for uploads =====
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, "../uploads/restaurants");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}_${file.fieldname}${ext}`);
//   },
// });
// const upload = multer({ storage });

// // ===== UPLOAD GALLERY =====
// // ===== UPLOAD GALLERY =====
// exports.uploadGallery = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id);
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No images uploaded" });
//     }

//     const imagePaths = req.files.map((file) => `/uploads/restaurants/${file.filename}`);

//     restaurant.galleryImages = [
//       ...(restaurant.galleryImages || []),
//       ...imagePaths,
//     ].slice(-10); // keep max 10

//     await restaurant.save();

//     res.json({
//       message: "Gallery uploaded successfully!",
//       galleryImages: restaurant.galleryImages,
//     });
//   } catch (error) {
//     console.error("❌ Upload Gallery Error:", error);
//     res.status(500).json({ message: "Failed to upload gallery", error: error.message });
//   }
// };


// // ===== GET PROFILE =====
// exports.getRestaurantProfile = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id).select("-password");
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
//     res.json(restaurant);
//   } catch (error) {
//     console.error("❌ Get Profile Error:", error);
//     res.status(500).json({ message: "Failed to fetch profile", error: error.message });
//   }
// };

// // ===== UPDATE PROFILE =====
// exports.updateRestaurantProfile = [
//   upload.single("profileImage"),
//   async (req, res) => {
//     try {
//       const restaurant = await Restaurant.findById(req.user._id);
//       if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

//       const { name, mobile, address, cuisineType, description, restaurantName, openTime, closeTime, isOpen } = req.body;

//       if (name) restaurant.name = name;
//       if (restaurantName) restaurant.restaurantName = restaurantName;
//       if (mobile) restaurant.mobile = mobile;
//       if (address) restaurant.address = address;
//       if (cuisineType) restaurant.cuisineType = cuisineType;
//       if (description !== undefined) restaurant.description = description;
//       if (openTime) restaurant.openTime = openTime;
//       if (closeTime) restaurant.closeTime = closeTime;
//       if (isOpen !== undefined) restaurant.isOpen = isOpen;

//       if (req.file) {
//         const rel = `/uploads/restaurants/${req.file.filename}`;
//         restaurant.profileImage = rel;
//         restaurant.profilePic = rel;
//         restaurant.image = rel;
//       }

//       const updated = await restaurant.save();
//       res.json({ message: "Profile updated successfully", restaurant: updated });
//     } catch (error) {
//       console.error("❌ Update Profile Error:", error);
//       res.status(500).json({ message: "Failed to update profile", error: error.message });
//     }
//   },
// ];

// // ===== UPDATE BY ID (ADMIN) =====
// // ===== UPDATE BY ID (ADMIN) =====
// exports.updateRestaurantById = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

//     const allowed = ["restaurantName", "description", "openTime", "closeTime", "isOpen", "image", "profileImage"];
//     allowed.forEach((key) => {
//       if (req.body[key] !== undefined) restaurant[key] = req.body[key];
//     });

//     // sync all image fields
//     if (req.body.image) {
//       restaurant.image = req.body.image;
//       restaurant.profileImage = req.body.image;
//       restaurant.profilePic = req.body.image;
//     }

//     if (req.body.profileImage) {
//       restaurant.profileImage = req.body.profileImage;
//       restaurant.image = req.body.profileImage;
//       restaurant.profilePic = req.body.profileImage;
//     }

//     await restaurant.save();
//     res.json({ message: "Outlet updated successfully", restaurant });
//   } catch (err) {
//     console.error("❌ Update Outlet Error:", err);
//     res.status(500).json({ message: "Failed to update outlet", error: err.message });
//   }
// };

// // ===== DELETE GALLERY IMAGE =====
// exports.deleteGalleryImage = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id);
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

//     const imageName = req.params.imageName;
//     const matchedImage = restaurant.galleryImages.find((img) => img.includes(imageName));
//     if (!matchedImage) return res.status(404).json({ message: "Image not found in gallery" });

//     const absolutePath = path.join(__dirname, "..", matchedImage.replace(/^\//, ""));
//     if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);

//     restaurant.galleryImages = restaurant.galleryImages.filter((img) => !img.includes(imageName));
//     await restaurant.save();

//     res.status(200).json({ message: "Image deleted successfully", galleryImages: restaurant.galleryImages });
//   } catch (error) {
//     console.error("❌ Error deleting gallery image:", error);
//     res.status(500).json({ message: "Failed to delete image", error: error.message });
//   }
// };








// backend/controllers/restaurantController.js
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");
const MonthlyRevenue = require("../models/MonthlyRevenue");
const DailyRevenue = require("../models/DailyRevenue");
const { buildAndSaveRestaurantExcel } = require("../utils/restaurantExcel");
const mongoose = require("mongoose");

// token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ===== REGISTER (restaurant) =====
exports.registerRestaurant = async (req, res) => {
  try {
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

// ===== GET ALL RESTAURANTS (ONLY OPEN RESTAURANTS) =====
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isOpen: true })
      .select(
        "name restaurantName cuisineType address rating galleryImages profileImage image isOpen openTime closeTime description"
      )
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

// ===== Multer setup for uploads =====
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
exports.uploadGallery = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user._id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imagePaths = req.files.map((file) => `/uploads/restaurants/${file.filename}`);

    restaurant.galleryImages = [
      ...(restaurant.galleryImages || []),
      ...imagePaths,
    ].slice(-10); // keep max 10

    await restaurant.save();

    res.json({
      message: "Gallery uploaded successfully!",
      galleryImages: restaurant.galleryImages,
    });
  } catch (error) {
    console.error("❌ Upload Gallery Error:", error);
    res.status(500).json({ message: "Failed to upload gallery", error: error.message });
  }
};

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

// ===== UPDATE PROFILE =====
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

// ===== UPDATE BY ID (ADMIN) =====
exports.updateRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const allowed = ["restaurantName", "description", "openTime", "closeTime", "isOpen", "image", "profileImage"];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) restaurant[key] = req.body[key];
    });

    // sync all image fields
    if (req.body.image) {
      restaurant.image = req.body.image;
      restaurant.profileImage = req.body.image;
      restaurant.profilePic = req.body.image;
    }

    if (req.body.profileImage) {
      restaurant.profileImage = req.body.profileImage;
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

// ==============================
// EXPORT RESTAURANT REPORT (Excel)
// ==============================
/**
 * GET /api/restaurants/export-excel?start=YYYY-MM-DD&end=YYYY-MM-DD
 * Protected (restaurantOnly)
 *
 * Builds aggregated metrics for requested date range, saves Excel file under:
 *  /uploads/restaurant_reports/<restaurantId>/<start>_to_<end>.xlsx
 *
 * Response:
 *  { filePath: "/uploads/restaurant_reports/<id>/<file>.xlsx", url: "<full-url-if-possible>" }
 */
exports.exportRestaurantReport = async (req, res) => {
  try {
    // restaurant identity (from authMiddleware)
    const restaurantId = (req.restaurant && req.restaurant._id) || (req.user && req.user._id);
    if (!restaurantId) return res.status(400).json({ message: "Restaurant identity not found" });

    // parse dates
    const startParam = req.query.start;
    const endParam = req.query.end;
    if (!startParam || !endParam) {
      return res.status(400).json({ message: "start and end query params required (YYYY-MM-DD)" });
    }

    const startDate = new Date(startParam + "T00:00:00.000Z");
    const endDate = new Date(endParam + "T23:59:59.999Z");
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    // Ensure ObjectId
    const restObjectId = new mongoose.Types.ObjectId(String(restaurantId));

    // 1) Per-day totals (delivered & cancelled & total)
    const perDayAgg = await Order.aggregate([
      {
        $match: {
          restaurant: restObjectId,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $addFields: {
          dayStr: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        }
      },
      {
        $group: {
          _id: { day: "$dayStr", status: "$status" },
          count: { $sum: 1 },
          revenue: { $sum: { $cond: [{ $eq: ["$status", "Delivered"] }, "$totalPrice", 0] } }
        }
      },
      {
        $group: {
          _id: "$_id.day",
          // counts per status
          totals: { $push: { status: "$_id.status", count: "$count", revenue: "$revenue" } },
          totalOrders: { $sum: "$count" },
          totalRevenue: { $sum: "$revenue" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Build per day map with defaults
    const perDayMap = {};
    perDayAgg.forEach(d => {
      const totalsByStatus = {};
      (d.totals || []).forEach(t => { totalsByStatus[t.status] = { count: t.count, revenue: t.revenue }; });
      perDayMap[d._id] = {
        date: d._id,
        totalOrders: d.totalOrders || 0,
        deliveredOrders: (totalsByStatus["Delivered"]?.count) || 0,
        cancelledOrders: (totalsByStatus["Cancelled"]?.count) || 0,
        totalRevenue: d.totalRevenue || 0
      };
    });

    // 2) Most sold item per day and top3 per day
    const itemsAgg = await Order.aggregate([
      { $match: { restaurant: restObjectId, createdAt: { $gte: startDate, $lte: endDate }, status: "Delivered" } },
      { $unwind: "$items" },
      { $addFields: { dayStr: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } } },
      {
        $group: {
          _id: { day: "$dayStr", item: "$items.name" },
          qty: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
        }
      },
      { $sort: { "_id.day": 1, qty: -1 } }
    ]);

    // merge top items into perDayMap
    const topItemsOverall = {}; // name -> {qty, revenue}
    const topPerDayTemp = {}; // day -> array of {name, qty, revenue}
    itemsAgg.forEach(it => {
      const day = it._id.day;
      const name = it._id.item;
      const qty = it.qty || 0;
      const revenue = it.revenue || 0;

      // overall
      if (!topItemsOverall[name]) topItemsOverall[name] = { qty: 0, revenue: 0 };
      topItemsOverall[name].qty += qty;
      topItemsOverall[name].revenue += revenue;

      // per day
      if (!topPerDayTemp[day]) topPerDayTemp[day] = [];
      topPerDayTemp[day].push({ name, qty, revenue });
    });

    // compute per-day most sold and top3
    Object.keys(perDayMap).forEach((day) => {
      const arr = topPerDayTemp[day] || [];
      // sort desc by qty (already sorted by pipeline but safe)
      arr.sort((a,b)=> b.qty - a.qty);
      const most = arr[0] || null;
      perDayMap[day].mostSoldItem = most?.name || "";
      perDayMap[day].mostSoldQty = most?.qty || 0;
      perDayMap[day].top3 = arr.slice(0,3);
      perDayMap[day].avgOrderValue = perDayMap[day].totalOrders ? (perDayMap[day].totalRevenue / perDayMap[day].totalOrders) : 0;
    });

    // For any days with zero orders between start and end, ensure they appear
    const dateList = [];
    for (let d = new Date(startDate); d <= endDate; d.setUTCDate(d.getUTCDate() + 1)) {
      const iso = new Date(d).toISOString().slice(0,10);
      dateList.push(iso);
      if (!perDayMap[iso]) {
        perDayMap[iso] = {
          date: iso,
          totalOrders: 0,
          deliveredOrders: 0,
          cancelledOrders: 0,
          totalRevenue: 0,
          mostSoldItem: "",
          mostSoldQty: 0,
          top3: [],
          avgOrderValue: 0
        };
      }
    }

    // Build perDay array in order
    const perDay = dateList.map(dt => perDayMap[dt]);

    // 3) Top 3 items overall in range
    const topItemsArray = Object.entries(topItemsOverall).map(([name, v]) => ({ name, qty: v.qty, revenue: v.revenue }));
    topItemsArray.sort((a,b)=> b.qty - a.qty);
    const top3Overall = topItemsArray.slice(0,10);

    // 4) Payment method breakdown
    const paymentsAgg = await Order.aggregate([
      { $match: { restaurant: restObjectId, createdAt: { $gte: startDate, $lte: endDate }, status: "Delivered" } },
      {
        $group: {
          _id: "$paymentInfo.method",
          amount: { $sum: "$totalPrice" },
          count: { $sum: 1 }
        }
      }
    ]);
    const payments = {};
    paymentsAgg.forEach(p => {
      const key = p._id || "Unknown";
      payments[key] = p.amount;
    });

    // 5) Peak order hour (all orders)
    const hourAgg = await Order.aggregate([
      { $match: { restaurant: restObjectId, createdAt: { $gte: startDate, $lte: endDate } } },
      { $project: { hour: { $hour: { date: "$createdAt", timezone: "UTC" } } } },
      { $group: { _id: "$hour", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);
    const peakHourObj = hourAgg[0];
    const peakHour = peakHourObj ? `${String(peakHourObj._id).padStart(2,"0")}:00 - ${String((peakHourObj._id+1)%24).padStart(2,"0")}:00` : "N/A";

    // 6) Totals & summary
    const totalRevenue = perDay.reduce((s, d) => s + (d.totalRevenue || 0), 0);
    const totalOrders = perDay.reduce((s, d) => s + (d.totalOrders || 0), 0);
    const cancelledOrders = perDay.reduce((s, d) => s + (d.cancelledOrders || 0), 0);
    const avgOrderValue = totalOrders ? (totalRevenue / totalOrders) : 0;

    const summary = {
      totalRevenue,
      totalOrders,
      cancelledOrders,
      avgOrderValue,
    };

    // Build payload for Excel util
    const payload = {
      summary,
      perDay,
      topItems: top3Overall,
      payments,
      peakHour,
    };

    // Build & save excel
    const fileRelativePath = await buildAndSaveRestaurantExcel(String(restaurantId), startParam, endParam, payload);

    // Build full URL if possible
    const hostBase = (process.env.SERVER_BASE_URL || process.env.REACT_APP_API_URL || "");
    let fullUrl = fileRelativePath;
    if (hostBase) {
      fullUrl = hostBase.replace(/\/+$/, "") + fileRelativePath;
    }

    res.json({ message: "Report generated", filePath: fileRelativePath, url: fullUrl });
  } catch (err) {
    console.error("❌ exportRestaurantReport error:", err);
    res.status(500).json({ message: "Failed to generate report", error: err.message });
  }
};

// module.exports = {
//   registerRestaurant,
//   loginRestaurant,
//   addRestaurant,
//   getRestaurants,
//   getRestaurantById,
//   uploadGallery,
//   getRestaurantProfile,
//   updateRestaurantProfile,
//   updateRestaurantById,
//   deleteGalleryImage,
//   exportRestaurantReport: exports.exportRestaurantReport, // make sure exported
// };
module.exports = {
  registerRestaurant: exports.registerRestaurant,
  loginRestaurant: exports.loginRestaurant,
  addRestaurant: exports.addRestaurant,
  getRestaurants: exports.getRestaurants,
  getRestaurantById: exports.getRestaurantById,
  uploadGallery: exports.uploadGallery,
  getRestaurantProfile: exports.getRestaurantProfile,
  updateRestaurantProfile: exports.updateRestaurantProfile,
  updateRestaurantById: exports.updateRestaurantById,
  deleteGalleryImage: exports.deleteGalleryImage,
  exportRestaurantReport: exports.exportRestaurantReport,
};
