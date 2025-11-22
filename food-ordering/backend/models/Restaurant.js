// backend/models/Restaurant.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/* Menu Item Subschema */
const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: "General", trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    image: { type: String, default: "/images/default-food.png" },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

/* Restaurant Schema */
const restaurantSchema = new mongoose.Schema(
  {
    // account
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: "restaurant" },

    // contact
    mobile: { type: String },
    address: { type: String },
    dob: { type: Date },

    // display
    restaurantName: { type: String },
    cuisineType: { type: String },
    rating: { type: Number, default: 0 },

    // images
    profileImage: { type: String, default: "/images/default-restaurant.png" },
    profilePic: { type: String, default: "/images/default-restaurant.png" },
    image: { type: String, default: "/images/default-restaurant.png" },
    galleryImages: { type: [String], default: [] },

    // menu
    menuItems: [menuItemSchema],

    // admin fields
    description: { type: String, default: "" },
    openTime: { type: String, default: "09:00" },
    closeTime: { type: String, default: "18:00" },
    isOpen: { type: Boolean, default: true },

    // OTP
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },

    // revenue tracking
    totalRevenue: { type: Number, default: 0 },
    monthlyRevenue: { type: Number, default: 0 },

    // IMPORTANT — Per-restaurant order numbering
    orderCounter: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* Password hashing */
restaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (/^\$2[aby]\$/.test(this.password)) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

restaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Restaurant", restaurantSchema, "restaurantnames");
