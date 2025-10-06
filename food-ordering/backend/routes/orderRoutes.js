// // const express = require("express");
// // const {
// //   placeOrder,
// //   getOrders,
// //   getRestaurantOrders,
// //   getAllOrders,
// //   updateOrderStatus,
// // } = require("../controllers/orderController");
// // const {
// //   protect,
// //   adminOnly,
// //   restaurantOnly,
// // } = require("../middlewares/authMiddleware");

// // const router = express.Router();

// // // ✅ User: place a new order
// // router.post("/", protect, placeOrder);

// // // ✅ User: get own orders
// // router.get("/myorders", protect, getOrders);

// // // ✅ Restaurant: get their orders
// // router.get("/restaurant", protect, restaurantOnly, getRestaurantOrders);

// // // ✅ Admin: get all orders
// // router.get("/all", protect, adminOnly, getAllOrders);

// // // ✅ Restaurant/Admin: update order status
// // router.put("/:id/status", protect, (req, res, next) => {
// //   if (req.user.role === "restaurant" || req.user.role === "admin") {
// //     return next();
// //   }
// //   return res.status(403).json({ message: "Only restaurant or admin can update orders" });
// // }, updateOrderStatus);

// // module.exports = router;












// const express = require("express");
// const {
//   placeOrder,
//   getOrders,
//   getRestaurantOrders,
//   getAllOrders,
//   updateOrderStatus,
// } = require("../controllers/orderController");
// const {
//   protect,
//   adminOnly,
//   restaurantOnly,
// } = require("../middlewares/authMiddleware");

// const router = express.Router();

// // User: place new order
// router.post("/", protect, placeOrder);

// // User: get own orders
// router.get("/myorders", protect, getOrders);

// // Restaurant: get their orders
// router.get("/restaurant", protect, restaurantOnly, getRestaurantOrders);

// // Admin: get all orders
// router.get("/all", protect, adminOnly, getAllOrders);

// // Restaurant/Admin: update order status
// router.put(
//   "/:id/status",
//   protect,
//   (req, res, next) => {
//     if (req.user.role === "restaurant" || req.user.role === "admin") {
//       return next();
//     }
//     return res
//       .status(403)
//       .json({ message: "Only restaurant or admin can update orders" });
//   },
//   updateOrderStatus
// );

// module.exports = router;






const express = require("express");
const {
  placeOrder,
  getOrders,
  getRestaurantOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const {
  protect,
  adminOnly,
  restaurantOnly,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// User: place new order
router.post("/", protect, placeOrder);

// User: get own orders
router.get("/myorders", protect, getOrders);

// Restaurant: get their orders
router.get("/restaurant", protect, restaurantOnly, getRestaurantOrders);

// Admin: get all orders
router.get("/all", protect, adminOnly, getAllOrders);

// Restaurant/Admin: update order status
router.put(
  "/:id/status",
  protect,
  (req, res, next) => {
    if (req.user.role === "restaurant" || req.user.role === "admin") {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Only restaurant or admin can update orders" });
  },
  updateOrderStatus
);

module.exports = router;
