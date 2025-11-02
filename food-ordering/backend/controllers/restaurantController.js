// // // backend/controllers/restaurantController.js
// // const Restaurant = require("../models/Restaurant");
// // const jwt = require("jsonwebtoken");

// // // ✅ Generate JWT
// // const generateToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// // };

// // // ===============================
// // // @desc    Register a new restaurant
// // // @route   POST /api/restaurants/register
// // // @access  Public
// // // ===============================
// // exports.registerRestaurant = async (req, res) => {
// //   try {
// //     const { name, email, password, address, phone, cuisine, image } = req.body;
// //     const imageUrl = image || "/images/default-restaurant.png";

// //     if (!name || !email || !password) {
// //       return res.status(400).json({ message: "Please provide name, email and password" });
// //     }

// //     // Check if email already exists
// //     const restaurantExists = await Restaurant.findOne({ email });
// //     if (restaurantExists) {
// //       return res.status(400).json({ message: "Restaurant already exists" });
// //     }

// //     // Create restaurant
// //     const restaurant = await Restaurant.create({
// //       name,
// //       email,
// //       password,
// //       address,
// //       phone,
// //       cuisine,
// //       image,
// //     });

// //     res.status(201).json({
// //       _id: restaurant._id,
// //       name: restaurant.name,
// //       email: restaurant.email,
// //       token: generateToken(restaurant._id),
// //     });
// //   } catch (err) {
// //     console.error("Register Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // ===============================
// // // @desc    Login restaurant
// // // @route   POST /api/restaurants/login
// // // @access  Public
// // // ===============================
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
// //       token: generateToken(restaurant._id),
// //     });
// //   } catch (err) {
// //     console.error("Login Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // ===============================
// // // @desc    Add restaurant (admin/manual)
// // // @route   POST /api/restaurants
// // // @access  Private (Admin)
// // // ===============================
// // exports.addRestaurant = async (req, res) => {
// //   try {
// //     const { name, address, phone, email, password, cuisine, image } = req.body;

// //     const restaurant = new Restaurant({
// //       name,
// //       address,
// //       phone,
// //       email,
// //       password,
// //       cuisine,
// //       image: imageUrl,
// //     });

// //     await restaurant.save();
// //     res.status(201).json({ message: "Restaurant added successfully", restaurant });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error adding restaurant", error: error.message });
// //   }
// // };

// // // ===============================
// // // @desc    Fetch all restaurants
// // // @route   GET /api/restaurants
// // // @access  Public
// // // ===============================
// // exports.getRestaurants = async (req, res) => {
// //   try {
// //     const restaurants = await Restaurant.find().sort({ createdAt: -1 });
// //     res.json(restaurants);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching restaurants", error: error.message });
// //   }
// // };







// // const Restaurant = require("../models/Restaurant");
// // const jwt = require("jsonwebtoken");
// // const multer = require("multer");
// // const path = require("path");

// // // ✅ Generate JWT
// // const generateToken = (id) => {
// //   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
// // };

// // // ===============================
// // // @desc    Register a new restaurant
// // // @route   POST /api/restaurants/register
// // // @access  Public
// // // ===============================
// // exports.registerRestaurant = async (req, res) => {
// //   try {
// //     const { name, email, password, address, phone, cuisine, image } = req.body;
// //     const imageUrl = image || "/images/default-restaurant.png";

// //     if (!name || !email || !password) {
// //       return res
// //         .status(400)
// //         .json({ message: "Please provide name, email and password" });
// //     }

// //     const restaurantExists = await Restaurant.findOne({ email });
// //     if (restaurantExists) {
// //       return res.status(400).json({ message: "Restaurant already exists" });
// //     }

// //     const restaurant = await Restaurant.create({
// //       name,
// //       email,
// //       password,
// //       address,
// //       phone,
// //       cuisine,
// //       image: imageUrl,
// //     });

// //     res.status(201).json({
// //       _id: restaurant._id,
// //       name: restaurant.name,
// //       email: restaurant.email,
// //       token: generateToken(restaurant._id),
// //     });
// //   } catch (err) {
// //     console.error("Register Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // ===============================
// // // @desc    Login restaurant
// // // @route   POST /api/restaurants/login
// // // @access  Public
// // // ===============================
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
// //       token: generateToken(restaurant._id),
// //     });
// //   } catch (err) {
// //     console.error("Login Error:", err);
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// // // ===============================
// // // @desc    Add restaurant (admin/manual)
// // // @route   POST /api/restaurants
// // // @access  Private (Admin)
// // // ===============================
// // exports.addRestaurant = async (req, res) => {
// //   try {
// //     const { name, address, phone, email, password, cuisine, image } = req.body;
// //     const imageUrl = image || "/images/default-restaurant.png";

// //     const restaurant = new Restaurant({
// //       name,
// //       address,
// //       phone,
// //       email,
// //       password,
// //       cuisine,
// //       image: imageUrl,
// //     });

// //     await restaurant.save();
// //     res
// //       .status(201)
// //       .json({ message: "Restaurant added successfully", restaurant });
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ message: "Error adding restaurant", error: error.message });
// //   }
// // };

// // // ===============================
// // // @desc    Fetch all restaurants
// // // @route   GET /api/restaurants
// // // @access  Public
// // // ===============================
// // exports.getRestaurants = async (req, res) => {
// //   try {
// //     const restaurants = await Restaurant.find().sort({ createdAt: -1 });
// //     res.json(restaurants);
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ message: "Error fetching restaurants", error: error.message });
// //   }
// // };

// // // ===============================
// // // @desc    Get restaurant by ID (for dashboard/gallery)
// // // @route   GET /api/restaurants/:id
// // // @access  Public
// // // ===============================
// // exports.getRestaurantById = async (req, res) => {
// //   try {
// //     const restaurant = await Restaurant.findById(req.params.id);
// //     if (!restaurant) {
// //       return res.status(404).json({ message: "Restaurant not found" });
// //     }
// //     res.json(restaurant);
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ message: "Error fetching restaurant", error: error.message });
// //   }
// // };

// // // ===============================
// // // 📸 MULTER SETUP for Gallery Uploads
// // // ===============================
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, "../uploads/restaurants"));
// //   },
// //   filename: function (req, file, cb) {
// //     const ext = path.extname(file.originalname);
// //     cb(null, `gallery_${Date.now()}${ext}`);
// //   },
// // });

// // const upload = multer({ storage });

// // // ===============================
// // // @desc    Upload gallery images
// // // @route   POST /api/restaurants/upload-gallery
// // // @access  Private (Restaurant)
// // // ===============================
// // exports.uploadGallery = [
// //   upload.array("images", 10),
// //   async (req, res) => {
// //     try {
// //       const restaurant = await Restaurant.findById(req.user._id);
// //       if (!restaurant) {
// //         return res.status(404).json({ message: "Restaurant not found" });
// //       }

// //       const imagePaths = req.files.map(
// //         (file) => `/uploads/restaurants/${file.filename}`
// //       );

// //       // Merge old + new (limit 10)
// //       const updatedGallery = [
// //         ...restaurant.galleryImages,
// //         ...imagePaths,
// //       ].slice(-10);

// //       restaurant.galleryImages = updatedGallery;
// //       await restaurant.save();

// //       res.json({
// //         message: "Gallery uploaded successfully!",
// //         galleryImages: restaurant.galleryImages,
// //       });
// //     } catch (error) {
// //       console.error("Upload Gallery Error:", error);
// //       res
// //         .status(500)
// //         .json({ message: "Failed to upload gallery", error: error.message });
// //     }
// //   },
// // ];






// const Restaurant = require("../models/Restaurant");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");

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
//       return res
//         .status(400)
//         .json({ message: "Please provide name, email and password" });
//     }

//     const restaurantExists = await Restaurant.findOne({ email });
//     if (restaurantExists) {
//       return res.status(400).json({ message: "Restaurant already exists" });
//     }

//     const restaurant = await Restaurant.create({
//       name,
//       email,
//       password,
//       address,
//       mobile: phone,
//       cuisineType: cuisine,
//       image: imageUrl,
//     });

//     res.status(201).json({
//       _id: restaurant._id,
//       name: restaurant.name,
//       email: restaurant.email,
//       role: restaurant.role,
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
//       role: restaurant.role,
//       token: generateToken(restaurant._id),
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // ===============================
// // @desc    Add restaurant (Admin/manual)
// // @route   POST /api/restaurants
// // @access  Private (Admin)
// // ===============================
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
//     res
//       .status(500)
//       .json({ message: "Error adding restaurant", error: error.message });
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
//     res
//       .status(500)
//       .json({ message: "Error fetching restaurants", error: error.message });
//   }
// };

// // ===============================
// // @desc    Get restaurant by ID
// // @route   GET /api/restaurants/:id
// // @access  Public
// // ===============================
// exports.getRestaurantById = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }
//     res.json(restaurant);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching restaurant", error: error.message });
//   }
// };

// // ===============================
// // 📸 MULTER SETUP for Profile + Gallery Uploads
// // ===============================
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

// // ===============================
// // @desc    Upload gallery images
// // @route   POST /api/restaurants/upload-gallery
// // @access  Private (Restaurant)
// // ===============================
// exports.uploadGallery = [
//   upload.array("images", 10),
//   async (req, res) => {
//     try {
//       const restaurant = await Restaurant.findById(req.user._id);
//       if (!restaurant) {
//         return res.status(404).json({ message: "Restaurant not found" });
//       }

//       const imagePaths = req.files.map(
//         (file) => `/uploads/restaurants/${file.filename}`
//       );

//       // Merge old + new (limit 10)
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
//       console.error("Upload Gallery Error:", error);
//       res
//         .status(500)
//         .json({ message: "Failed to upload gallery", error: error.message });
//     }
//   },
// ];

// // ===============================
// // @desc    Get restaurant profile
// // @route   GET /api/restaurants/profile
// // @access  Private (Restaurant)
// // ===============================
// exports.getRestaurantProfile = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.user._id).select("-password");
//     if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
//     res.json(restaurant);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch profile", error: error.message });
//   }
// };

// // ===============================
// // @desc    Update restaurant profile
// // @route   PUT /api/restaurants/profile
// // @access  Private (Restaurant)
// // ===============================
// exports.updateRestaurantProfile = [
//   upload.single("profileImage"),
//   async (req, res) => {
//     try {
//       const restaurant = await Restaurant.findById(req.user._id);
//       if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

//       const { name, mobile, address, cuisineType, restaurantName, dateOfBirth } = req.body;

//       if (name) restaurant.name = name;
//       if (mobile) restaurant.mobile = mobile;
//       if (address) restaurant.address = address;
//       if (cuisineType) restaurant.cuisineType = cuisineType;
//       if (restaurantName) restaurant.restaurantName = restaurantName;
//       if (dateOfBirth) restaurant.dob = dateOfBirth;

//       if (req.file) {
//         restaurant.profilePic = `/uploads/restaurants/${req.file.filename}`;
//       }

//       const updated = await restaurant.save();
//       res.json({
//         message: "Profile updated successfully",
//         restaurant: updated,
//       });
//     } catch (error) {
//       console.error("Update Profile Error:", error);
//       res
//         .status(500)
//         .json({ message: "Failed to update profile", error: error.message });
//     }
//   },
// ];









const Restaurant = require("../models/Restaurant");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// ✅ Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ============================================================
// 🍽️ REGISTER RESTAURANT
// ============================================================
exports.registerRestaurant = async (req, res) => {
  try {
    const { name, email, password, address, phone, cuisine, image } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password" });
    }

    const existing = await Restaurant.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    const imageUrl = image || "/images/default-restaurant.png";

    const restaurant = new Restaurant({
      name,
      email,
      password,
      address: address || "",
      mobile: phone || "",
      cuisineType: cuisine || "",
      image: imageUrl,
    });

    await restaurant.save();

    res.status(201).json({
      message: "Restaurant registered successfully",
      _id: restaurant._id,
      name: restaurant.name,
      email: restaurant.email,
      role: restaurant.role,
      token: generateToken(restaurant._id),
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({
      message: "Failed to register restaurant",
      error: err.message,
    });
  }
};

// ============================================================
// 🍽️ LOGIN RESTAURANT
// ============================================================
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
      role: restaurant.role,
      token: generateToken(restaurant._id),
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Failed to login", error: err.message });
  }
};

// ============================================================
// 👑 ADD RESTAURANT (Admin)
// ============================================================
exports.addRestaurant = async (req, res) => {
  try {
    const { name, address, phone, email, password, cuisine, image } = req.body;
    const imageUrl = image || "/images/default-restaurant.png";

    const restaurant = new Restaurant({
      name,
      address,
      mobile: phone,
      email,
      password,
      cuisineType: cuisine,
      image: imageUrl,
    });

    await restaurant.save();
    res
      .status(201)
      .json({ message: "Restaurant added successfully", restaurant });
  } catch (error) {
    console.error("❌ Add Restaurant Error:", error);
    res
      .status(500)
      .json({ message: "Error adding restaurant", error: error.message });
  }
};

// ============================================================
// 📋 GET ALL RESTAURANTS
// ============================================================
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.json(restaurants);
  } catch (error) {
    console.error("❌ Get Restaurants Error:", error);
    res.status(500).json({ message: "Error fetching restaurants" });
  }
};

// ============================================================
// 🔍 GET RESTAURANT BY ID
// ============================================================
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant);
  } catch (error) {
    console.error("❌ Get Restaurant by ID Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching restaurant", error: error.message });
  }
};

// ============================================================
// 📸 MULTER SETUP
// ============================================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/restaurants"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

// ============================================================
// 🖼️ UPLOAD GALLERY IMAGES
// ============================================================
exports.uploadGallery = [
  upload.array("images", 10),
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.user._id);
      if (!restaurant)
        return res.status(404).json({ message: "Restaurant not found" });

      const imagePaths = req.files.map(
        (file) => `/uploads/restaurants/${file.filename}`
      );

      restaurant.galleryImages = [
        ...restaurant.galleryImages,
        ...imagePaths,
      ].slice(-10);

      await restaurant.save();

      res.json({
        message: "Gallery uploaded successfully!",
        galleryImages: restaurant.galleryImages,
      });
    } catch (error) {
      console.error("❌ Upload Gallery Error:", error);
      res
        .status(500)
        .json({ message: "Failed to upload gallery", error: error.message });
    }
  },
];

// ============================================================
// 👤 GET RESTAURANT PROFILE
// ============================================================
exports.getRestaurantProfile = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user._id).select(
      "-password"
    );
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    res.json(restaurant);
  } catch (error) {
    console.error("❌ Get Profile Error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: error.message });
  }
};

// ============================================================
// ✏️ UPDATE RESTAURANT PROFILE
// ============================================================
exports.updateRestaurantProfile = [
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.user._id);
      if (!restaurant)
        return res.status(404).json({ message: "Restaurant not found" });

      const { name, mobile, address, cuisineType } = req.body;

      if (name) restaurant.name = name;
      if (mobile) restaurant.mobile = mobile;
      if (address) restaurant.address = address;
      if (cuisineType) restaurant.cuisineType = cuisineType;

      if (req.file) {
        restaurant.profilePic = `/uploads/restaurants/${req.file.filename}`;
      }

      const updated = await restaurant.save();
      res.json({
        message: "Profile updated successfully",
        restaurant: updated,
      });
    } catch (error) {
      console.error("❌ Update Profile Error:", error);
      res
        .status(500)
        .json({ message: "Failed to update profile", error: error.message });
    }
  },
];
