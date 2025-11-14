const mongoose = require("mongoose");

const MonthlyRevenueSchema = new mongoose.Schema(
  {
    // Example: "2025-02"
    month: {
      type: String,
      required: true,
      unique: true,
    },

    // Total revenue for that month
    totalRevenue: {
      type: Number,
      default: 0,
    },

    // Total delivered orders counted for that month
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

module.exports = mongoose.model("MonthlyRevenue", MonthlyRevenueSchema);
