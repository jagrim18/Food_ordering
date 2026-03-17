// // backend/controllers/adminController.js
// const Order = require("../models/Order");
// const Restaurant = require("../models/Restaurant");
// const User = require("../models/User");

// // Monthly Revenue model + Excel generator
// const MonthlyRevenue = require("../models/MonthlyRevenue");
// const DailyRevenue = require("../models/DailyRevenue");
// const { generateRevenueExcel, excelPath } = require("../utils/revenueExcel");

// exports.getDashboardStats = async (req, res) => {
//   try {
//     // Count total orders (all statuses)
//     const totalOrders = await Order.countDocuments();

//     // Count restaurants & users
//     const [totalRestaurants, totalUsers] = await Promise.all([
//       Restaurant.countDocuments(),
//       User.countDocuments(),
//     ]);

//     // Aggregate revenue ONLY from delivered orders (case-insensitive)
//     const deliveredAgg = await Order.aggregate([
//       {
//         $match: {
//           status: { $regex: "^delivered$", $options: "i" }, // case-insensitive delivered
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: { $ifNull: ["$totalPrice", 0] } },
//         },
//       },
//     ]);

//     const totalRevenue = deliveredAgg?.[0]?.total || 0;

//     res.json({ success: true, totalRevenue, totalOrders, totalRestaurants, totalUsers });
//   } catch (error) {
//     console.error("Admin dashboard fetch error:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Outlet performance
// exports.getOutletPerformance = async (req, res) => {
//   try {
//     const outlets = await Restaurant.find().lean();

//     // Fetch only delivered orders to compute revenue (so numbers reflect completed revenue)
//     const deliveredOrders = await Order.find({
//       status: { $regex: "^delivered$", $options: "i" },
//     }).populate("restaurant", "_id restaurantName");

//     const performance = outlets.map((outlet) => {
//       const outletOrders = deliveredOrders.filter(
//         (order) => order.restaurant?._id?.toString() === outlet._id.toString()
//       );
//       const revenue = outletOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

//       return {
//         _id: outlet._id,
//         name: outlet.restaurantName || outlet.name || "",
//         description: outlet.description || "",
//         openTime: outlet.openTime || "",
//         closeTime: outlet.closeTime || "",
//         isOpen: outlet.isOpen ?? true,
//         image: outlet.profileImage || outlet.image || outlet.profilePic || "/images/default-restaurant.png",
//         orders: outletOrders.length,
//         revenue,
//       };
//     });

//     res.json({ success: true, performance });
//   } catch (err) {
//     console.error("Error fetching outlet performance:", err);
//     res.status(500).json({ success: false, message: "Error fetching outlet data" });
//   }
// };

// // Recent orders (unchanged)
// exports.getRecentOrders = async (req, res) => {
//   try {
//     const recentOrders = await Order.find()
//       .populate("restaurant", "restaurantName")
//       .populate("user", "name email")
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json({ success: true, orders: recentOrders });
//   } catch (error) {
//     console.error("Error fetching recent orders:", error);
//     res.status(500).json({ success: false, message: "Error fetching orders" });
//   }
// };

// /* ==========================================================
//    MONTHLY REVENUE ENDPOINTS
// ========================================================== */
// exports.getMonthlyRevenue = async (req, res) => {
//   try {
//     const records = await MonthlyRevenue.find().sort({ month: 1 });
//     res.json({ success: true, months: records });
//   } catch (error) {
//     console.error("❌ Error fetching monthly revenue:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching monthly revenue",
//     });
//   }
// };

// exports.downloadRevenueExcel = async (req, res) => {
//   try {
//     // Regenerate file before sending
//     await generateRevenueExcel();

//     res.download(excelPath, "revenue.xlsx", (err) => {
//       if (err) {
//         console.error("❌ Error sending Excel:", err);
//       }
//     });
//   } catch (error) {
//     console.error("❌ Excel generation error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error generating Excel file",
//     });
//   }
// };

// /* ==========================================================
//    DAILY REVENUE (last N days)
// ========================================================== */
// exports.getDailyRevenue = async (req, res) => {
//   try {
//     const days = Number(req.query.days) || 30;

//     const start = new Date();
//     start.setHours(0, 0, 0, 0);
//     start.setDate(start.getDate() - (days - 1));

//     const startKey = start.toISOString().slice(0, 10);

//     const records = await DailyRevenue.find({
//       day: { $gte: startKey },
//     }).sort({ day: 1 });

//     const map = {};
//     records.forEach((r) => {
//       map[r.day] = {
//         totalRevenue: r.totalRevenue,
//         totalOrders: r.totalOrders,
//       };
//     });

//     const output = [];
//     for (let i = 0; i < days; i++) {
//       const d = new Date(start);
//       d.setDate(start.getDate() + i);
//       const key = d.toISOString().slice(0, 10);

//       output.push({
//         day: key,
//         totalRevenue: map[key]?.totalRevenue || 0,
//         totalOrders: map[key]?.totalOrders || 0,
//       });
//     }

//     res.json({ success: true, days: output });
//   } catch (err) {
//     console.error("❌ Error fetching daily revenue:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Error fetching daily revenue" });
//   }
// };

// backend/controllers/adminController.js
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

// Monthly Revenue model + Excel generator
const MonthlyRevenue = require("../models/MonthlyRevenue");
const DailyRevenue = require("../models/DailyRevenue");
const { generateRevenueExcel, excelPath } = require("../utils/revenueExcel");

/**
 * Helper to compute IST start/end for today and convert to UTC for Mongo queries.
 */
const computeISTTodayRange = (date = new Date()) => {
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istNow = new Date(date.getTime() + istOffsetMs);

  const istStart = new Date(istNow);
  istStart.setHours(0, 0, 0, 0);

  const istEnd = new Date(istNow);
  istEnd.setHours(23, 59, 59, 999);

  const utcStart = new Date(istStart.getTime() - istOffsetMs);
  const utcEnd = new Date(istEnd.getTime() - istOffsetMs);

  return { utcStart, utcEnd };
};

exports.getDashboardStats = async (req, res) => {
  try {
    // Count total orders (all statuses)
    const totalOrders = await Order.countDocuments();

    // Count restaurants & users
    const [totalRestaurants, totalUsers] = await Promise.all([
      Restaurant.countDocuments(),
      User.countDocuments(),
    ]);

    // Aggregate revenue ONLY from delivered orders (case-insensitive) - ALL TIME
    const deliveredAgg = await Order.aggregate([
      {
        $match: {
          status: { $regex: "^delivered$", $options: "i" }, // case-insensitive delivered
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $ifNull: ["$totalPrice", 0] } },
        },
      },
    ]);

    const totalRevenue = deliveredAgg?.[0]?.total || 0;

    // --- TODAY (IST) revenue (new) ---
    const { utcStart, utcEnd } = computeISTTodayRange();

    const todayDeliveredAgg = await Order.aggregate([
      {
        $match: {
          status: { $regex: "^delivered$", $options: "i" },
          createdAt: { $gte: utcStart, $lte: utcEnd },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $ifNull: ["$totalPrice", 0] } },
          count: { $sum: 1 }
        }
      }
    ]);

    const todayRevenue = todayDeliveredAgg?.[0]?.total || 0;
    const todayDeliveredCount = todayDeliveredAgg?.[0]?.count || 0;

    res.json({
      success: true,
      totalRevenue,
      totalOrders,
      totalRestaurants,
      totalUsers,
      todayRevenue,
      todayDeliveredCount
    });
  } catch (error) {
    console.error("Admin dashboard fetch error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Outlet performance (unchanged)
exports.getOutletPerformance = async (req, res) => {
  try {
    const outlets = await Restaurant.find().lean();

    // Fetch only delivered orders to compute revenue (so numbers reflect completed revenue)
    const deliveredOrders = await Order.find({
      status: { $regex: "^delivered$", $options: "i" },
    }).populate("restaurant", "_id restaurantName");

    const performance = outlets.map((outlet) => {
      const outletOrders = deliveredOrders.filter(
        (order) => order.restaurant?._id?.toString() === outlet._id.toString()
      );
      const revenue = outletOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

      return {
        _id: outlet._id,
        name: outlet.restaurantName || outlet.name || "",
        description: outlet.description || "",
        openTime: outlet.openTime || "",
        closeTime: outlet.closeTime || "",
        isOpen: outlet.isOpen ?? true,
        image: outlet.profileImage || outlet.image || outlet.profilePic || "/images/default-restaurant.png",
        orders: outletOrders.length,
        revenue,
      };
    });

    res.json({ success: true, performance });
  } catch (err) {
    console.error("Error fetching outlet performance:", err);
    res.status(500).json({ success: false, message: "Error fetching outlet data" });
  }
};

// Recent orders (unchanged)
exports.getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("restaurant", "restaurantName")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ success: true, orders: recentOrders });
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

/* ==========================================================
   MONTHLY REVENUE ENDPOINTS (unchanged)
========================================================== */
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const records = await MonthlyRevenue.find().sort({ month: 1 });
    res.json({ success: true, months: records });
  } catch (error) {
    console.error("❌ Error fetching monthly revenue:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching monthly revenue",
    });
  }
};

exports.downloadRevenueExcel = async (req, res) => {
  try {
    // Regenerate file before sending
    await generateRevenueExcel();

    res.download(excelPath, "revenue.xlsx", (err) => {
      if (err) {
        console.error("❌ Error sending Excel:", err);
      }
    });
  } catch (error) {
    console.error("❌ Excel generation error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating Excel file",
    });
  }
};

/* ==========================================================
   DAILY REVENUE (last N days) (unchanged)
========================================================== */
exports.getDailyRevenue = async (req, res) => {
  try {
    const days = Number(req.query.days) || 30;

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (days - 1));

    const startKey = start.toISOString().slice(0, 10);

    const records = await DailyRevenue.find({
      day: { $gte: startKey },
    }).sort({ day: 1 });

    const map = {};
    records.forEach((r) => {
      map[r.day] = {
        totalRevenue: r.totalRevenue,
        totalOrders: r.totalOrders,
      };
    });

    const output = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);

      output.push({
        day: key,
        totalRevenue: map[key]?.totalRevenue || 0,
        totalOrders: map[key]?.totalOrders || 0,
      });
    }

    res.json({ success: true, days: output });
  } catch (err) {
    console.error("❌ Error fetching daily revenue:", err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching daily revenue" });
  }
};
