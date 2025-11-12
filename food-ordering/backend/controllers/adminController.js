// backend/controllers/adminController.js
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User"); // Assuming you already have User model

// ===============================
// 📊 Admin Dashboard Summary
// ===============================
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalOrders, totalRevenueAgg, totalRestaurants, totalUsers] =
      await Promise.all([
        Order.countDocuments(),
        Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
        Restaurant.countDocuments(),
        User.countDocuments(),
      ]);

    const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

    res.json({
      success: true,
      totalRevenue,
      totalOrders,
      totalRestaurants,
      totalUsers,
    });
  } catch (error) {
    console.error("Admin dashboard fetch error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ===============================
// 🏪 Get Outlet Performance
// ===============================
exports.getOutletPerformance = async (req, res) => {
  try {
    const outlets = await Restaurant.find()
      .select("restaurantName profileImage createdAt")
      .lean();

    const orders = await Order.find().populate("restaurant", "restaurantName");

    const performance = outlets.map((outlet) => {
      const outletOrders = orders.filter(
        (order) => order.restaurant?.restaurantName === outlet.restaurantName
      );
      const revenue = outletOrders.reduce((sum, o) => sum + o.totalPrice, 0);
      return {
        name: outlet.restaurantName,
        image: outlet.profileImage || "/images/default-restaurant.png",
        orders: outletOrders.length,
        revenue,
      };
    });

    res.json({ success: true, performance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching outlet data" });
  }
};

// ===============================
// 🕒 Get Recent Orders
// ===============================
exports.getRecentOrders = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("restaurant", "restaurantName")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ success: true, orders: recentOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};
