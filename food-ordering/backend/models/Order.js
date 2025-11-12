const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    // 🧾 Each item in the order
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
        restaurantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Restaurant",
        },
      },
    ],

    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
    },

    rating: { type: Number, min: 1, max: 5, default: null },
    review: { type: String, default: "" },

    // 🆕 Sequential order number (daily reset)
    orderNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
