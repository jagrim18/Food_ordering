const express = require("express");
const router = express.Router();
const { getDashboardStats, getOutletPerformance, getRecentOrders } = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware"); // optional if auth exists

// Admin overview stats
router.get("/dashboard", /* protect, */ getDashboardStats);

// Outlet performance
router.get("/outlets", /* protect, */ getOutletPerformance);

// Recent orders
router.get("/recent-orders", /* protect, */ getRecentOrders);

module.exports = router;
