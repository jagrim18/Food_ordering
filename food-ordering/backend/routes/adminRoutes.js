// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getOutletPerformance,
  getRecentOrders,
  getMonthlyRevenue,
  downloadRevenueExcel,
  getDailyRevenue,
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { changePassword } = require("../controllers/authController");

/* ============================================================
   ADMIN DASHBOARD ROUTES
============================================================ */

// Admin overview stats
router.get("/dashboard", /* protect, adminOnly, */ getDashboardStats);

// Outlet performance
router.get("/outlets", /* protect, adminOnly, */ getOutletPerformance);

// Recent orders
router.get("/recent-orders", /* protect, adminOnly, */ getRecentOrders);

/* ============================================================
   MONTHLY & DAILY REVENUE SYSTEM
============================================================ */
router.get("/revenue/monthly", /* protect, adminOnly, */ getMonthlyRevenue);
router.get("/revenue/daily", /* protect, adminOnly, */ getDailyRevenue);
router.get("/revenue/excel", /* protect, adminOnly, */ downloadRevenueExcel);

/* ============================================================
   🔐 NEW — ADMIN CHANGE PASSWORD
============================================================ */
router.put("/change-password", protect, adminOnly, changePassword);

module.exports = router;
