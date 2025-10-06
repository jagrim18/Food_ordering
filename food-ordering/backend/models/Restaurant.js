// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const { connectRestaurantDB } = require("../config/db"); // ✅ import restaurant DB connection

// // ✅ Connect to restaurant DB
// const restaurantDB = connectRestaurantDB();

// const restaurantSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     address: { type: String },
//     phone: { type: String },
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
//     cuisine: { type: String },
//     rating: { type: Number, default: 0 },
//     image: { type: String },
//     role: { type: String, default: "restaurant" },
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

// // ✅ Explicitly use "restaurantnames" collection
// const Restaurant = restaurantDB.model(
//   "Restaurant",
//   restaurantSchema,
//   "restaurantnames"
// );

// module.exports = Restaurant;







// backend/models/Restaurant.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String },
    phone: { type: String },
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
    cuisine: { type: String },
    rating: { type: Number, default: 0 },
    image: { type: String },
    role: { type: String, default: "restaurant" },
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

// ✅ Register model on default mongoose connection
const Restaurant = mongoose.model("Restaurant", restaurantSchema, "restaurantnames");

module.exports = Restaurant;
