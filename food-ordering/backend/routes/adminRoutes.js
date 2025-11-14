// // const express = require("express");
// // const router = express.Router();
// // const { getDashboardStats, getOutletPerformance, getRecentOrders } = require("../controllers/adminController");
// // const { protect } = require("../middlewares/authMiddleware"); // optional if auth exists

// // // Admin overview stats
// // router.get("/dashboard", /* protect, */ getDashboardStats);

// // // Outlet performance
// // router.get("/outlets", /* protect, */ getOutletPerformance);

// // // Recent orders
// // router.get("/recent-orders", /* protect, */ getRecentOrders);

// // module.exports = router;




// // backend/routes/adminRoutes.js
// const express = require("express");
// const router = express.Router();
// const { getDashboardStats, getOutletPerformance, getRecentOrders } = require("../controllers/adminController");
// const { protect } = require("../middlewares/authMiddleware");

// // Admin overview stats
// router.get("/dashboard", /* protect, */ getDashboardStats);

// // Outlet performance
// router.get("/outlets", /* protect, */ getOutletPerformance);

// // Recent orders
// router.get("/recent-orders", /* protect, */ getRecentOrders);

// module.exports = router;




// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { 
  getDashboardStats, 
  getOutletPerformance, 
  getRecentOrders,
  getMonthlyRevenue,
  downloadRevenueExcel
} = require("../controllers/adminController");

const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Admin overview stats
router.get("/dashboard", /* protect, */ getDashboardStats);

// Outlet performance
router.get("/outlets", /* protect, */ getOutletPerformance);

// Recent orders
router.get("/recent-orders", /* protect, */ getRecentOrders);

/* ==========================================================
   🆕 NEW ROUTES (Monthly Revenue System)
========================================================== */

// 📊 Get monthly revenue
router.get("/revenue/monthly", /* protect, adminOnly, */ getMonthlyRevenue);

// 📥 Download revenue Excel
router.get("/revenue/excel", /* protect, adminOnly, */ downloadRevenueExcel);

module.exports = router;
