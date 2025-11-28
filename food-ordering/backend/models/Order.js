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
      enum: ["Pending", "Accepted", "Preparing", "Delivered", "Cancelled", "Paid"],
      default: "Pending",
    },

    orderNumber: { type: Number, required: true },

    preparingAt: { type: Date, default: null },
    deliveredAt: { type: Date, default: null },
    prepTime: { type: Number, default: null },

    // ⭐ NEW — required for Razorpay
    paymentInfo: {
      orderId: { type: String },
      paymentId: { type: String },
      method: { type: String },
      status: { type: String },
    },

    pickupTime: { type: String, default: "15 minutes" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
