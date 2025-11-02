// // const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");

// // const restaurantSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true, trim: true },
// //     email: {
// //       type: String,
// //       unique: true,
// //       required: true,
// //       lowercase: true,
// //     },
// //     password: {
// //       type: String,
// //       required: true,
// //       minlength: 6,
// //     },
// //     mobile: { type: String },
// //     address: { type: String },
// //     dob: { type: Date },
// //     restaurantName: { type: String },
// //     cuisineType: { type: String },
// //     profilePic: { type: String },
// //     rating: { type: Number, default: 0 },
// //     role: { type: String, default: "restaurant" },
// //     image: {
// //       type: String,
// //       default: "/images/default-restaurant.png", // or any image in /public/images/
// //     },
// //   },
// //   { timestamps: true }
// // );

// // // ✅ Hash password before saving
// // restaurantSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // ✅ Compare entered password with hashed password
// // restaurantSchema.methods.matchPassword = async function (enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // // ✅ Register model — using same main DB connection but unique collection
// // const Restaurant = mongoose.model("Restaurant", restaurantSchema, "restaurantnames");

// // module.exports = Restaurant;









// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const restaurantSchema = new mongoose.Schema(
//   {
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
//     mobile: { type: String },
//     address: { type: String },
//     dob: { type: Date },
//     restaurantName: { type: String },
//     cuisineType: { type: String },
//     profilePic: { type: String },
//     rating: { type: Number, default: 0 },
//     role: { type: String, default: "restaurant" },

//     // ✅ Keep old single image for compatibility
//     image: {
//       type: String,
//       default: "/images/default-restaurant.png",
//     },

//     // ✅ New field: Array of food/gallery images
//     galleryImages: {
//       type: [String], // array of image URLs
//       default: [], // empty by default
//     },
//   },
//   { timestamps: true }
// );

// // ✅ Hash password before saving
// restaurantSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // ✅ Compare entered password with hashed password
// restaurantSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // ✅ Register model — same collection: restaurantnames
// const Restaurant = mongoose.model(
//   "Restaurant",
//   restaurantSchema,
//   "restaurantnames"
// );

// module.exports = Restaurant;








const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const restaurantSchema = new mongoose.Schema(
  {
    // 🧠 Basic account info
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
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
    profileImage: {
      type: String,
      default: "/images/default-restaurant.png",
    },

    // ⚙️ Old fields for backward compatibility (safe to keep)
    profilePic: {
      type: String,
      default: "/images/default-restaurant.png",
    },
    image: {
      type: String,
      default: "/images/default-restaurant.png",
    },

    // 🖼️ Multiple gallery images
    galleryImages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// ✅ Encrypt password before saving
restaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare entered password with stored hash
restaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Register model (explicit collection name for your existing DB)
const Restaurant = mongoose.model("Restaurant", restaurantSchema, "restaurantnames");

module.exports = Restaurant;
