// // // // // // // backend/controllers/adminController.js
// // // // // // const Order = require("../models/Order");
// // // // // // const Restaurant = require("../models/Restaurant");
// // // // // // const User = require("../models/User"); // Assuming you already have User model

// // // // // // // ===============================
// // // // // // // 📊 Admin Dashboard Summary
// // // // // // // ===============================
// // // // // // exports.getDashboardStats = async (req, res) => {
// // // // // //   try {
// // // // // //     const [totalOrders, totalRevenueAgg, totalRestaurants, totalUsers] =
// // // // // //       await Promise.all([
// // // // // //         Order.countDocuments(),
// // // // // //         Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
// // // // // //         Restaurant.countDocuments(),
// // // // // //         User.countDocuments(),
// // // // // //       ]);

// // // // // //     const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       totalRevenue,
// // // // // //       totalOrders,
// // // // // //       totalRestaurants,
// // // // // //       totalUsers,
// // // // // //     });
// // // // // //   } catch (error) {
// // // // // //     console.error("Admin dashboard fetch error:", error);
// // // // // //     res.status(500).json({ success: false, message: "Server Error" });
// // // // // //   }
// // // // // // };

// // // // // // // ===============================
// // // // // // // 🏪 Get Outlet Performance
// // // // // // // ===============================
// // // // // // exports.getOutletPerformance = async (req, res) => {
// // // // // //   try {
// // // // // //     const outlets = await Restaurant.find()
// // // // // //       .select("restaurantName profileImage createdAt")
// // // // // //       .lean();

// // // // // //     const orders = await Order.find().populate("restaurant", "restaurantName");

// // // // // //     const performance = outlets.map((outlet) => {
// // // // // //       const outletOrders = orders.filter(
// // // // // //         (order) => order.restaurant?.restaurantName === outlet.restaurantName
// // // // // //       );
// // // // // //       const revenue = outletOrders.reduce((sum, o) => sum + o.totalPrice, 0);
// // // // // //       return {
// // // // // //         name: outlet.restaurantName,
// // // // // //         image: outlet.profileImage || "/images/default-restaurant.png",
// // // // // //         orders: outletOrders.length,
// // // // // //         revenue,
// // // // // //       };
// // // // // //     });

// // // // // //     res.json({ success: true, performance });
// // // // // //   } catch (err) {
// // // // // //     console.error(err);
// // // // // //     res.status(500).json({ success: false, message: "Error fetching outlet data" });
// // // // // //   }
// // // // // // };

// // // // // // // ===============================
// // // // // // // 🕒 Get Recent Orders
// // // // // // // ===============================
// // // // // // exports.getRecentOrders = async (req, res) => {
// // // // // //   try {
// // // // // //     const recentOrders = await Order.find()
// // // // // //       .populate("restaurant", "restaurantName")
// // // // // //       .populate("user", "name email")
// // // // // //       .sort({ createdAt: -1 })
// // // // // //       .limit(5);

// // // // // //     res.json({ success: true, orders: recentOrders });
// // // // // //   } catch (error) {
// // // // // //     console.error(error);
// // // // // //     res.status(500).json({ success: false, message: "Error fetching orders" });
// // // // // //   }
// // // // // // };








// // // // // // backend/controllers/adminController.js

// // // // // const Order = require("../models/Order");
// // // // // const Restaurant = require("../models/Restaurant");
// // // // // const User = require("../models/User");

// // // // // // ===============================
// // // // // // 📊 Admin Dashboard Summary
// // // // // // ===============================
// // // // // exports.getDashboardStats = async (req, res) => {
// // // // //   try {
// // // // //     const [totalOrders, totalRevenueAgg, totalRestaurants, totalUsers] =
// // // // //       await Promise.all([
// // // // //         Order.countDocuments(),
// // // // //         Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
// // // // //         Restaurant.countDocuments(),
// // // // //         User.countDocuments(),
// // // // //       ]);

// // // // //     const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

// // // // //     res.json({
// // // // //       success: true,
// // // // //       totalRevenue,
// // // // //       totalOrders,
// // // // //       totalRestaurants,
// // // // //       totalUsers,
// // // // //     });
// // // // //   } catch (error) {
// // // // //     console.error("Admin dashboard fetch error:", error);
// // // // //     res.status(500).json({ success: false, message: "Server Error" });
// // // // //   }
// // // // // };

// // // // // // ===============================
// // // // // // 🏪 Get Outlet Performance (FIXED)
// // // // // // ===============================
// // // // // exports.getOutletPerformance = async (req, res) => {
// // // // //   try {
// // // // //     // fetch full restaurant model (not limited fields)
// // // // //     const outlets = await Restaurant.find().lean();

// // // // //     const orders = await Order.find().populate("restaurant", "restaurantName");

// // // // //     const performance = outlets.map((outlet) => {
// // // // //       const outletOrders = orders.filter(
// // // // //         (order) => order.restaurant?._id?.toString() === outlet._id.toString()
// // // // //       );

// // // // //       const revenue = outletOrders.reduce((sum, o) => sum + o.totalPrice, 0);

// // // // //       return {
// // // // //         _id: outlet._id, // ★ important
// // // // //         name: outlet.restaurantName,
// // // // //         description: outlet.description || "",
// // // // //         openTime: outlet.openTime || "",
// // // // //         closeTime: outlet.closeTime || "",
// // // // //         isOpen: outlet.isOpen ?? true,
// // // // //         image: outlet.profileImage || "/images/default-restaurant.png",
// // // // //         orders: outletOrders.length,
// // // // //         revenue,
// // // // //       };
// // // // //     });

// // // // //     res.json({ success: true, performance });
// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     res.status(500).json({ success: false, message: "Error fetching outlet data" });
// // // // //   }
// // // // // };

// // // // // // ===============================
// // // // // // 🕒 Get Recent Orders
// // // // // // ===============================
// // // // // exports.getRecentOrders = async (req, res) => {
// // // // //   try {
// // // // //     const recentOrders = await Order.find()
// // // // //       .populate("restaurant", "restaurantName")
// // // // //       .populate("user", "name email")
// // // // //       .sort({ createdAt: -1 })
// // // // //       .limit(5);

// // // // //     res.json({ success: true, orders: recentOrders });
// // // // //   } catch (error) {
// // // // //     console.error(error);
// // // // //     res.status(500).json({ success: false, message: "Error fetching orders" });
// // // // //   }
// // // // // };


// // // // // backend/controllers/adminController.js

// // // // const Order = require("../models/Order");
// // // // const Restaurant = require("../models/Restaurant");
// // // // const User = require("../models/User");

// // // // // ===============================
// // // // // 📊 Admin Dashboard Summary
// // // // // ===============================
// // // // exports.getDashboardStats = async (req, res) => {
// // // //   try {
// // // //     const [totalOrders, totalRevenueAgg, totalRestaurants, totalUsers] =
// // // //       await Promise.all([
// // // //         Order.countDocuments(),
// // // //         Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
// // // //         Restaurant.countDocuments(),
// // // //         User.countDocuments(),
// // // //       ]);

// // // //     const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

// // // //     res.json({
// // // //       success: true,
// // // //       totalRevenue,
// // // //       totalOrders,
// // // //       totalRestaurants,
// // // //       totalUsers,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Admin dashboard fetch error:", error);
// // // //     res.status(500).json({ success: false, message: "Server Error" });
// // // //   }
// // // // };

// // // // // ===============================
// // // // // 🏪 Get Outlet Performance (FULL + EDIT OUTLET SAFE)
// // // // // ===============================
// // // // exports.getOutletPerformance = async (req, res) => {
// // // //   try {
// // // //     // Fetch full restaurant model (needed for Edit Outlet)
// // // //     const outlets = await Restaurant.find().lean();

// // // //     // Fetch all orders with restaurant populated
// // // //     const orders = await Order.find().populate("restaurant", "_id restaurantName");

// // // //     const performance = outlets.map((outlet) => {
// // // //       // Match orders belonging to this outlet
// // // //       const outletOrders = orders.filter(
// // // //         (order) => order.restaurant?._id?.toString() === outlet._id.toString()
// // // //       );

// // // //       const revenue = outletOrders.reduce((sum, o) => sum + o.totalPrice, 0);

// // // //       // Return FULL restaurant fields needed by AdminOutlets
// // // //       return {
// // // //         _id: outlet._id,
// // // //         name: outlet.restaurantName,
// // // //         description: outlet.description || "",
// // // //         openTime: outlet.openTime || "",
// // // //         closeTime: outlet.closeTime || "",
// // // //         isOpen: outlet.isOpen ?? true,
// // // //         image: outlet.profileImage || "/images/default-restaurant.png",

// // // //         // Existing stats
// // // //         orders: outletOrders.length,
// // // //         revenue,
// // // //       };
// // // //     });

// // // //     res.json({ success: true, performance });
// // // //   } catch (err) {
// // // //     console.error("Error in getOutletPerformance:", err);
// // // //     res.status(500).json({ success: false, message: "Error fetching outlet data" });
// // // //   }
// // // // };

// // // // // ===============================
// // // // // 🕒 Get Recent Orders
// // // // // ===============================
// // // // exports.getRecentOrders = async (req, res) => {
// // // //   try {
// // // //     const recentOrders = await Order.find()
// // // //       .populate("restaurant", "restaurantName")
// // // //       .populate("user", "name email")
// // // //       .sort({ createdAt: -1 })
// // // //       .limit(5);

// // // //     res.json({ success: true, orders: recentOrders });
// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     res.status(500).json({ success: false, message: "Error fetching orders" });
// // // //   }
// // // // };







// // // // backend/controllers/adminController.js

// // // const Order = require("../models/Order");
// // // const Restaurant = require("../models/Restaurant");
// // // const User = require("../models/User");

// // // // ===============================
// // // // 📊 Admin Dashboard Summary
// // // // ===============================
// // // exports.getDashboardStats = async (req, res) => {
// // //   try {
// // //     const [totalOrders, totalRevenueAgg, totalRestaurants, totalUsers] =
// // //       await Promise.all([
// // //         Order.countDocuments(),
// // //         Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
// // //         Restaurant.countDocuments(),
// // //         User.countDocuments(),
// // //       ]);

// // //     const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

// // //     res.json({
// // //       success: true,
// // //       totalRevenue,
// // //       totalOrders,
// // //       totalRestaurants,
// // //       totalUsers,
// // //     });
// // //   } catch (error) {
// // //     console.error("Admin dashboard fetch error:", error);
// // //     res.status(500).json({ success: false, message: "Server Error" });
// // //   }
// // // };

// // // // ===============================
// // // // 🏪 Get Outlet Performance (FULL OUTLET DETAILS)
// // // // ===============================
// // // exports.getOutletPerformance = async (req, res) => {
// // //   try {
// // //     const outlets = await Restaurant.find().lean();
// // //     const orders = await Order.find().populate("restaurant", "_id restaurantName");

// // //     const performance = outlets.map((outlet) => {
// // //       const outletOrders = orders.filter(
// // //         (order) => order.restaurant?._id?.toString() === outlet._id.toString()
// // //       );

// // //       const revenue = outletOrders.reduce((sum, o) => sum + o.totalPrice, 0);

// // //       return {
// // //         _id: outlet._id,
// // //         name: outlet.restaurantName || outlet.name || "",
// // //         description: outlet.description || "",
// // //         openTime: outlet.openTime || "",
// // //         closeTime: outlet.closeTime || "",
// // //         isOpen: outlet.isOpen ?? true,
// // //         image: outlet.profileImage || outlet.image || "/images/default-restaurant.png",
// // //         orders: outletOrders.length,
// // //         revenue,
// // //       };
// // //     });

// // //     res.json({ success: true, performance });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ success: false, message: "Error fetching outlet data" });
// // //   }
// // // };

// // // // ===============================
// // // // 🕒 Get Recent Orders
// // // // ===============================
// // // exports.getRecentOrders = async (req, res) => {
// // //   try {
// // //     const recentOrders = await Order.find()
// // //       .populate("restaurant", "restaurantName")
// // //       .populate("user", "name email")
// // //       .sort({ createdAt: -1 })
// // //       .limit(5);

// // //     res.json({ success: true, orders: recentOrders });
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ success: false, message: "Error fetching orders" });
// // //   }
// // // };




// // // backend/controllers/adminController.js
// // const Order = require("../models/Order");
// // const Restaurant = require("../models/Restaurant");
// // const User = require("../models/User");

// // exports.getDashboardStats = async (req, res) => {
// //   try {
// //     const [totalOrders, totalRevenueAgg, totalRestaurants, totalUsers] = await Promise.all([
// //       Order.countDocuments(),
// //       Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
// //       Restaurant.countDocuments(),
// //       User.countDocuments(),
// //     ]);

// //     const totalRevenue = totalRevenueAgg?.[0]?.total || 0;
// //     res.json({ success: true, totalRevenue, totalOrders, totalRestaurants, totalUsers });
// //   } catch (error) {
// //     console.error("Admin dashboard fetch error:", error);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // // Outlet performance returning full fields used by AdminOutlets
// // exports.getOutletPerformance = async (req, res) => {
// //   try {
// //     const outlets = await Restaurant.find().lean();
// //     const orders = await Order.find().populate("restaurant", "_id restaurantName");

// //     const performance = outlets.map((outlet) => {
// //       const outletOrders = orders.filter((order) => order.restaurant?._id?.toString() === outlet._id.toString());
// //       const revenue = outletOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

// //       return {
// //         _id: outlet._id,
// //         name: outlet.restaurantName || outlet.name || "",
// //         description: outlet.description || "",
// //         openTime: outlet.openTime || "",
// //         closeTime: outlet.closeTime || "",
// //         isOpen: outlet.isOpen ?? true,
// //         image: outlet.profileImage || outlet.image || outlet.profilePic || "/images/default-restaurant.png",
// //         orders: outletOrders.length,
// //         revenue,
// //       };
// //     });

// //     res.json({ success: true, performance });
// //   } catch (err) {
// //     console.error("Error fetching outlet performance:", err);
// //     res.status(500).json({ success: false, message: "Error fetching outlet data" });
// //   }
// // };

// // exports.getRecentOrders = async (req, res) => {
// //   try {
// //     const recentOrders = await Order.find()
// //       .populate("restaurant", "restaurantName")
// //       .populate("user", "name email")
// //       .sort({ createdAt: -1 })
// //       .limit(5);

// //     res.json({ success: true, orders: recentOrders });
// //   } catch (error) {
// //     console.error("Error fetching recent orders:", error);
// //     res.status(500).json({ success: false, message: "Error fetching orders" });
// //   }
// // };




// // backend/controllers/adminController.js
// const Order = require("../models/Order");
// const Restaurant = require("../models/Restaurant");
// const User = require("../models/User");

// // 🆕 Monthly Revenue model + Excel generator
// const MonthlyRevenue = require("../models/MonthlyRevenue");
// const { generateRevenueExcel, excelPath } = require("../utils/revenueExcel");

// exports.getDashboardStats = async (req, res) => {
//   try {
//     const [totalOrders, totalRevenueAgg, totalRestaurants, totalUsers] = await Promise.all([
//       Order.countDocuments(),
//       Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
//       Restaurant.countDocuments(),
//       User.countDocuments(),
//     ]);

//     const totalRevenue = totalRevenueAgg?.[0]?.total || 0;
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
//     const orders = await Order.find().populate("restaurant", "_id restaurantName");

//     const performance = outlets.map((outlet) => {
//       const outletOrders = orders.filter(
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

// // Recent orders
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
//    🆕 MONTHLY REVENUE FUNCTIONS
// ========================================================== */

// // 📌 Get all monthly revenue data
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

// // 📌 Download Excel file
// exports.downloadRevenueExcel = async (req, res) => {
//   try {
//     // Always regenerate before sending
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




// backend/controllers/adminController.js
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

// Monthly Revenue model + Excel generator
const MonthlyRevenue = require("../models/MonthlyRevenue");
const { generateRevenueExcel, excelPath } = require("../utils/revenueExcel");

exports.getDashboardStats = async (req, res) => {
  try {
    // Count total orders (all statuses)
    const totalOrders = await Order.countDocuments();

    // Count restaurants & users
    const [totalRestaurants, totalUsers] = await Promise.all([
      Restaurant.countDocuments(),
      User.countDocuments(),
    ]);

    // Aggregate revenue ONLY from delivered orders (case-insensitive)
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

    res.json({ success: true, totalRevenue, totalOrders, totalRestaurants, totalUsers });
  } catch (error) {
    console.error("Admin dashboard fetch error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Outlet performance
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
   MONTHLY REVENUE ENDPOINTS
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
