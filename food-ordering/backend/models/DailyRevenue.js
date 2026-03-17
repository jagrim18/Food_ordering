// // backend/models/DailyRevenue.js
// const mongoose = require("mongoose");

// const DailyRevenueSchema = new mongoose.Schema(
//   {
//     // Example: "2025-02-24"
//     day: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     totalRevenue: {
//       type: Number,
//       default: 0,
//     },

//     totalOrders: {
//       type: Number,
//       default: 0,
//     },

//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("DailyRevenue", DailyRevenueSchema);








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

// ensure index for day uniqueness (already implied by unique: true)
DailyRevenueSchema.index({ day: 1 }, { unique: true });

module.exports = mongoose.model("DailyRevenue", DailyRevenueSchema);
