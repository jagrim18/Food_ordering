// backend/models/RestaurantItem.js
const mongoose = require("mongoose");

// ✅ Schema for restaurant menu items
const restaurantItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant", // ✅ match your actual model name (not collection)
      required: true,
      index: true,
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
      trim: true,
      default: "General",
      index: true,
    },

    image: {
      type: String,
      default: "https://via.placeholder.com/200",
    },
    available: {
      type: Boolean,
      default: true,
      index: true,
    },
    // NEW: veg / non-veg flag
    isVeg: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// ✅ Explicit collection name `restaurantitems`
module.exports = mongoose.model("RestaurantItem", restaurantItemSchema, "restaurantitems");
