// // // const mongoose = require("mongoose");
// // // const bcrypt = require("bcryptjs");

// // // /* ============================================================
// // //    🍽️ Subschema for Embedded Menu Items
// // //    ============================================================ */
// // // const menuItemSchema = new mongoose.Schema(
// // //   {
// // //     name: { type: String, required: true, trim: true },
// // //     category: { type: String, default: "General", trim: true },
// // //     price: { type: Number, required: true, min: 0 },
// // //     description: { type: String, trim: true },
// // //     image: { type: String, default: "/images/default-food.png" },
// // //     isAvailable: { type: Boolean, default: true },
// // //   },
// // //   { timestamps: true }
// // // );

// // // /* ============================================================
// // //    🏪 Main Restaurant Schema
// // //    ============================================================ */
// // // const restaurantSchema = new mongoose.Schema(
// // //   {
// // //     // 🧠 Basic account info
// // //     name: { type: String, required: true, trim: true },
// // //     email: { type: String, unique: true, required: true, lowercase: true },
// // //     password: { type: String, required: true, minlength: 6 },
// // //     role: { type: String, default: "restaurant" },

// // //     // 📞 Contact and personal info
// // //     mobile: { type: String },
// // //     address: { type: String },
// // //     dob: { type: Date },

// // //     // 🍽️ Restaurant details
// // //     restaurantName: { type: String },
// // //     cuisineType: { type: String },
// // //     rating: { type: Number, default: 0 },

// // //     // 🖼️ Profile picture (restaurant logo or owner pic)
// // //     profileImage: { type: String, default: "/images/default-restaurant.png" },

// // //     // ⚙️ Old fields (for backward compatibility)
// // //     profilePic: { type: String, default: "/images/default-restaurant.png" },
// // //     image: { type: String, default: "/images/default-restaurant.png" },

// // //     // 🖼️ Multiple gallery images
// // //     galleryImages: { type: [String], default: [] },

// // //     // 🧾 Embedded Menu Items
// // //     menuItems: [menuItemSchema],

// // //     /* ============================================================
// // //        🧩 OTP Verification fields
// // //        ============================================================ */
// // //     otp: { type: String, default: null },
// // //     otpExpires: { type: Date, default: null },
// // //     isVerified: { type: Boolean, default: false },
// // //   },
// // //   { timestamps: true }
// // // );

// // // /* ============================================================
// // //    🔐 Password Handling
// // //    ============================================================ */
// // // restaurantSchema.pre("save", async function (next) {
// // //   if (!this.isModified("password")) return next();

// // //   // Prevent double hashing if already bcrypt hashed
// // //   if (/^\$2[aby]\$/.test(this.password)) return next();

// // //   const salt = await bcrypt.genSalt(10);
// // //   this.password = await bcrypt.hash(this.password, salt);
// // //   next();
// // // });

// // // restaurantSchema.methods.matchPassword = async function (enteredPassword) {
// // //   return await bcrypt.compare(enteredPassword, this.password);
// // // };

// // // /* ============================================================
// // //    ✅ Model Export
// // //    ============================================================ */
// // // const Restaurant = mongoose.model(
// // //   "Restaurant",
// // //   restaurantSchema,
// // //   "restaurantnames"
// // // );

// // // module.exports = Restaurant;









// // const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");

// // /* ============================================================
// //    🍽️ Subschema for Embedded Menu Items
// //    ============================================================ */
// // const menuItemSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true, trim: true },
// //     category: { type: String, default: "General", trim: true },
// //     price: { type: Number, required: true, min: 0 },
// //     description: { type: String, trim: true },
// //     image: { type: String, default: "/images/default-food.png" },
// //     isAvailable: { type: Boolean, default: true },
// //   },
// //   { timestamps: true }
// // );

// // /* ============================================================
// //    🏪 Main Restaurant Schema
// //    ============================================================ */
// // const restaurantSchema = new mongoose.Schema(
// //   {
// //     // 🧠 Account basics
// //     name: { type: String, required: true, trim: true },
// //     email: { type: String, unique: true, required: true, lowercase: true },
// //     password: { type: String, required: true, minlength: 6 },
// //     role: { type: String, default: "restaurant" },

// //     // 📞 Contact & personal info
// //     mobile: { type: String },
// //     address: { type: String },
// //     dob: { type: Date },

// //     // 🍽️ Restaurant display info
// //     restaurantName: { type: String },
// //     cuisineType: { type: String },
// //     rating: { type: Number, default: 0 },

// //     // 🖼️ Restaurant profile images
// //     profileImage: { type: String, default: "/images/default-restaurant.png" },
// //     profilePic: { type: String, default: "/images/default-restaurant.png" }, // backward compatibility
// //     image: { type: String, default: "/images/default-restaurant.png" }, // backward compatibility
// //     galleryImages: { type: [String], default: [] },

// //     // 🍽️ MENU
// //     menuItems: [menuItemSchema],

// //     /* ============================================================
// //        🆕 NEW FIELDS (required for EDIT OUTLET modal)
// //        ============================================================ */

// //     description: { type: String, default: "" }, // << added safely
// //     openTime: { type: String, default: "09:00" }, // << added safely
// //     closeTime: { type: String, default: "18:00" }, // << added safely
// //     isOpen: { type: Boolean, default: true }, // << added safely

// //     /* ============================================================
// //        🧩 OTP Verification
// //        ============================================================ */
// //     otp: { type: String, default: null },
// //     otpExpires: { type: Date, default: null },
// //     isVerified: { type: Boolean, default: false },
// //   },
// //   { timestamps: true }
// // );

// // /* ============================================================
// //    🔐 Password Handling
// //    ============================================================ */
// // restaurantSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();

// //   // Prevent double hashing
// //   if (/^\$2[aby]\$/.test(this.password)) return next();

// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // restaurantSchema.methods.matchPassword = async function (enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // /* ============================================================
// //    ✅ Model Export
// //    ============================================================ */
// // const Restaurant = mongoose.model(
// //   "Restaurant",
// //   restaurantSchema,
// //   "restaurantnames"
// // );

// // module.exports = Restaurant;





// // backend/models/Restaurant.js
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// /* Menu Item Subschema */
// const menuItemSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     category: { type: String, default: "General", trim: true },
//     price: { type: Number, required: true, min: 0 },
//     description: { type: String, trim: true },
//     image: { type: String, default: "/images/default-food.png" },
//     isAvailable: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// /* Restaurant Schema */
// const restaurantSchema = new mongoose.Schema(
//   {
//     // account
//     name: { type: String, required: true, trim: true }, // login name
//     email: { type: String, unique: true, required: true, lowercase: true },
//     password: { type: String, required: true, minlength: 6 },
//     role: { type: String, default: "restaurant" },

//     // contact
//     mobile: { type: String },
//     address: { type: String },
//     dob: { type: Date },

//     // display
//     restaurantName: { type: String }, // main outlet name (Option A)
//     cuisineType: { type: String },
//     rating: { type: Number, default: 0 },

//     // images (consistent names + fallbacks)
//     profileImage: { type: String, default: "/images/default-restaurant.png" },
//     profilePic: { type: String, default: "/images/default-restaurant.png" }, // legacy
//     image: { type: String, default: "/images/default-restaurant.png" }, // legacy
//     galleryImages: { type: [String], default: [] },

//     // menu
//     menuItems: [menuItemSchema],

//     // admin-editable fields
//     description: { type: String, default: "" },
//     openTime: { type: String, default: "09:00" },
//     closeTime: { type: String, default: "18:00" },
//     isOpen: { type: Boolean, default: true },

//     // OTP etc.
//     otp: { type: String, default: null },
//     otpExpires: { type: Date, default: null },
//     isVerified: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// /* Password hashing */
// restaurantSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   if (/^\$2[aby]\$/.test(this.password)) return next(); // already hashed
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// restaurantSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("Restaurant", restaurantSchema, "restaurantnames");


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
    name: { type: String, required: true, trim: true }, // login name
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: "restaurant" },

    // contact
    mobile: { type: String },
    address: { type: String },
    dob: { type: Date },

    // display
    restaurantName: { type: String }, // main outlet name (Option A)
    cuisineType: { type: String },
    rating: { type: Number, default: 0 },

    // images (consistent names + fallbacks)
    profileImage: { type: String, default: "/images/default-restaurant.png" },
    profilePic: { type: String, default: "/images/default-restaurant.png" }, // legacy
    image: { type: String, default: "/images/default-restaurant.png" }, // legacy
    galleryImages: { type: [String], default: [] },

    // menu
    menuItems: [menuItemSchema],

    // admin-editable fields
    description: { type: String, default: "" },
    openTime: { type: String, default: "09:00" },
    closeTime: { type: String, default: "18:00" },
    isOpen: { type: Boolean, default: true },

    // OTP etc.
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },

    // revenue tracking
    totalRevenue: { type: Number, default: 0 }, // lifetime revenue (delivered orders)
    // monthlyRevenue kept simple as last month's numeric value — MonthlyRevenue collection is primary source
    monthlyRevenue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* Password hashing */
restaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  if (/^\$2[aby]\$/.test(this.password)) return next(); // already hashed
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

restaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Restaurant", restaurantSchema, "restaurantnames");
