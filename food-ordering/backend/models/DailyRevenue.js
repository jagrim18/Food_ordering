// backend/models/DailyRevenue.js
const mongoose = require("mongoose");

const DailyRevenueSchema = new mongoose.Schema(
  {
    // Example: "2025-02-24"
    day: {
      type: String,
      required: true,
      unique: true,
    },

    totalRevenue: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyRevenue", DailyRevenueSchema);
