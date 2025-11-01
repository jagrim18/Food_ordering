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
//     image: {
//       type: String,
//       default: "/images/default-restaurant.png", // or any image in /public/images/
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

// // ✅ Register model — using same main DB connection but unique collection
// const Restaurant = mongoose.model("Restaurant", restaurantSchema, "restaurantnames");

// module.exports = Restaurant;









const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const restaurantSchema = new mongoose.Schema(
  {
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
    mobile: { type: String },
    address: { type: String },
    dob: { type: Date },
    restaurantName: { type: String },
    cuisineType: { type: String },
    profilePic: { type: String },
    rating: { type: Number, default: 0 },
    role: { type: String, default: "restaurant" },

    // ✅ Keep old single image for compatibility
    image: {
      type: String,
      default: "/images/default-restaurant.png",
    },

    // ✅ New field: Array of food/gallery images
    galleryImages: {
      type: [String], // array of image URLs
      default: [], // empty by default
    },
  },
  { timestamps: true }
);

// ✅ Hash password before saving
restaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare entered password with hashed password
restaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Register model — same collection: restaurantnames
const Restaurant = mongoose.model(
  "Restaurant",
  restaurantSchema,
  "restaurantnames"
);

module.exports = Restaurant;
