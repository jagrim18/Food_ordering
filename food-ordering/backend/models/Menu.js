// // // const mongoose = require("mongoose");
// // // const { connectRestaurantDB } = require("../config/db");

// // // // ✅ Connect to restaurant DB
// // // const restaurantDB = connectRestaurantDB();

// // // const menuSchema = new mongoose.Schema(
// // //   {
// // //     restaurant: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Restaurant",
// // //       required: true,
// // //     },
// // //     name: { type: String, required: true },
// // //     description: String,
// // //     price: { type: Number, required: true },
// // //     image: String,
// // //     ingredients: [{ type: String }],
// // //     category: { type: String, required: true },
// // //     available: { type: Boolean, default: true },
// // //   },
// // //   { timestamps: true }
// // // );

// // // const Menu = restaurantDB.model("Menu", menuSchema, "menus");
// // // module.exports = Menu;























// // // const mongoose = require("mongoose");

// // // const menuSchema = new mongoose.Schema(
// // //   {
// // //     restaurant: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Restaurant",
// // //       required: true,
// // //     },
// // //     name: { type: String, required: true },
// // //     description: String,
// // //     price: { type: Number, required: true },
// // //     image: String,
// // //     ingredients: [{ type: String }],
// // //     category: { type: String, required: true },
// // //     available: { type: Boolean, default: true },
// // //   },
// // //   { timestamps: true }
// // // );

// // // // ✅ Use main DB connection (no separate DB)
// // // const Menu = mongoose.model("Menu", menuSchema, "restaurantitems");

// // // module.exports = Menu;
















// // const mongoose = require("mongoose");

// // const menuSchema = new mongoose.Schema(
// //   {
// //     restaurant: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Restaurant",
// //       required: true,
// //     },
// //     name: { type: String, required: true },
// //     description: String,
// //     price: { type: Number, required: true },
// //     image: String,
// //     ingredients: [{ type: String }],
// //     category: { type: String, required: true },
// //     available: { type: Boolean, default: true },
// //   },
// //   { timestamps: true }
// // );

// // // ✅ Single database, custom collection name
// // const Menu = mongoose.model("Menu", menuSchema, "restaurantitems");

// // module.exports = Menu;
















// const mongoose = require("mongoose");

// const menuSchema = new mongoose.Schema(
//   {
//     restaurant: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Restaurant",
//       required: true,
//     },
//     name: { type: String, required: true },
//     description: String,
//     price: { type: Number, required: true },
//     image: String,
//     ingredients: [{ type: String }],
//     category: { type: String, required: true },
//     available: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// // ✅ Single database, custom collection name
// const Menu = mongoose.model("Menu", menuSchema, "restaurantitems");

// module.exports = Menu;






// backend/models/Menu.js
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant", // ✅ this must match your Restaurant model name
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    ingredients: [{ type: String }],
    category: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ Explicitly store it in restaurantitems collection
const Menu = mongoose.model("Menu", menuSchema, "restaurantitems");
module.exports = Menu;
