// const mongoose = require("mongoose");

// // ✅ Define schema for each restaurant menu item
// const restaurantItemSchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Restaurant", // Reference to the restaurant
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String,
//       default: "https://via.placeholder.com/200", // default placeholder
//     },
//     available: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true, // Automatically add createdAt & updatedAt
//   }
// );

// // ✅ Create model
// const RestaurantItem = mongoose.model("RestaurantItem", restaurantItemSchema);

// module.exports = RestaurantItem;








const mongoose = require("mongoose");

// ✅ Define schema for restaurant menu items
const restaurantItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant", // reference to the restaurant
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/200",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const RestaurantItem = mongoose.model("RestaurantItem", restaurantItemSchema);
module.exports = RestaurantItem;
