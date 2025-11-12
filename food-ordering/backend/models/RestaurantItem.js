// // const mongoose = require("mongoose");

// // // ✅ Define schema for each restaurant menu item
// // const restaurantItemSchema = new mongoose.Schema(
// //   {
// //     restaurantId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Restaurant", // Reference to the restaurant
// //       required: true,
// //     },
// //     name: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //     description: {
// //       type: String,
// //       default: "",
// //     },
// //     price: {
// //       type: Number,
// //       required: true,
// //     },
// //     image: {
// //       type: String,
// //       default: "https://via.placeholder.com/200", // default placeholder
// //     },
// //     available: {
// //       type: Boolean,
// //       default: true,
// //     },
// //   },
// //   {
// //     timestamps: true, // Automatically add createdAt & updatedAt
// //   }
// // );

// // // ✅ Create model
// // const RestaurantItem = mongoose.model("RestaurantItem", restaurantItemSchema);

// // module.exports = RestaurantItem;








// const mongoose = require("mongoose");

// // ✅ Define schema for restaurant menu items
// const restaurantItemSchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Restaurant", // reference to the restaurant
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
//       default: "https://via.placeholder.com/200",
//     },
//     available: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// const RestaurantItem = mongoose.model("RestaurantItem", restaurantItemSchema);
// module.exports = RestaurantItem;



// const mongoose = require("mongoose");

// // ✅ Define schema for restaurant menu items
// const restaurantItemSchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Restaurant", // Reference to Restaurant
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
//     category: {
//       type: String,
//       enum: ["Starters", "Main Course", "Beverages", "Desserts"],
//       default: "Starters",
//     },
//     image: {
//       type: String,
//       default: "https://via.placeholder.com/200",
//     },
//     available: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// const RestaurantItem = mongoose.model("RestaurantItem", restaurantItemSchema);
// module.exports = RestaurantItem;








// const mongoose = require("mongoose");

// // ✅ Schema for restaurant menu items
// const restaurantItemSchema = new mongoose.Schema(
//   {
//     restaurantId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "restaurantnames", // ✅ Match your collection name in MongoDB
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
//     category: {
//       type: String,
//       enum: ["Starters", "Main Course", "Beverages", "Desserts"],
//       default: "Starters",
//     },
//     image: {
//       type: String,
//       default: "https://via.placeholder.com/200",
//     },
//     available: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// // ✅ Explicitly define collection name to ensure it's stored in `restaurantitems`
// const RestaurantItem = mongoose.model("RestaurantItem", restaurantItemSchema, "restaurantitems");

// module.exports = RestaurantItem;






const mongoose = require("mongoose");

// ✅ Schema for restaurant menu items
const restaurantItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant", // ✅ match your actual model name (not collection)
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
    category: {
      type: String,
      enum: ["Starters", "Main Course", "Beverages", "Desserts", "Snacks", "Specials"],
      default: "Starters",
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

// ✅ Explicit collection name `restaurantitems`
module.exports = mongoose.model("RestaurantItem", restaurantItemSchema, "restaurantitems");
