const mongoose = require("mongoose");
const { connectRestaurantDB } = require("../config/db");

// ✅ Connect to restaurant DB
const restaurantDB = connectRestaurantDB();

const menuSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    ingredients: [{ type: String }],
    category: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Menu = restaurantDB.model("Menu", menuSchema, "menus");
module.exports = Menu;
