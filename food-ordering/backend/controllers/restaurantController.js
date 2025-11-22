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
