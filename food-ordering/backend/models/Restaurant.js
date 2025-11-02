// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const restaurantSchema = new mongoose.Schema(
//   {
//     // 🧠 Basic account info
//     name: { type: String, required: true, trim: true },
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     role: { type: String, default: "restaurant" },

//     // 📞 Contact and personal info
//     mobile: { type: String },
//     address: { type: String },
//     dob: { type: Date },

//     // 🍽️ Restaurant details
//     restaurantName: { type: String },
//     cuisineType: { type: String },
//     rating: { type: Number, default: 0 },

//     // 🖼️ Profile picture (restaurant logo or owner pic)
//     profileImage: {
//       type: String,
//       default: "/images/default-restaurant.png",
//     },

//     // ⚙️ Old fields for backward compatibility (safe to keep)
//     profilePic: {
//       type: String,
//       default: "/images/default-restaurant.png",
//     },
//     image: {
//       type: String,
//       default: "/images/default-restaurant.png",
//     },

//     // 🖼️ Multiple gallery images
//     galleryImages: {
//       type: [String],
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// // ✅ Encrypt password before saving
// restaurantSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // ✅ Compare entered password with stored hash
// restaurantSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // ✅ Register model (explicit collection name for your existing DB)
// const Restaurant = mongoose.model("Restaurant", restaurantSchema, "restaurantnames");

// module.exports = Restaurant;







// backend/models/Restaurant.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/* ============================================================
   🍽️ Subschema for Embedded Menu Items
   ============================================================ */
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

/* ============================================================
   🏪 Main Restaurant Schema
   ============================================================ */
const restaurantSchema = new mongoose.Schema(
  {
    // 🧠 Basic account info
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: "restaurant" },

    // 📞 Contact and personal info
    mobile: { type: String },
    address: { type: String },
    dob: { type: Date },

    // 🍽️ Restaurant details
    restaurantName: { type: String },
    cuisineType: { type: String },
    rating: { type: Number, default: 0 },

    // 🖼️ Profile picture (restaurant logo or owner pic)
    profileImage: { type: String, default: "/images/default-restaurant.png" },

    // ⚙️ Old fields (for backward compatibility)
    profilePic: { type: String, default: "/images/default-restaurant.png" },
    image: { type: String, default: "/images/default-restaurant.png" },

    // 🖼️ Multiple gallery images
    galleryImages: { type: [String], default: [] },

    // 🧾 Embedded Menu Items
    menuItems: [menuItemSchema],
  },
  { timestamps: true }
);

/* ============================================================
   🔐 Password Handling
   ============================================================ */
restaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

restaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/* ============================================================
   ✅ Model Export
   ============================================================ */
const Restaurant = mongoose.model(
  "Restaurant",
  restaurantSchema,
  "restaurantnames"
);

module.exports = Restaurant;
