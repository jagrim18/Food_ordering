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

/* ============================
   🧑‍💻 USER ROUTES
============================ */

// ✅ Place a new order
router.post("/", protect, placeOrder);

// ✅ Get logged-in user's orders
router.get("/myorders", protect, getOrders);

/* ============================
   🍽️ RESTAURANT ROUTES
============================ */

// ✅ Get all orders for this restaurant
router.get("/restaurant", protect, restaurantOnly, getRestaurantOrders);

/* ============================
   🛠️ ADMIN ROUTES
============================ */

// ✅ Get all orders in the system
router.get("/all", protect, adminOnly, getAllOrders);

/* ============================
   🔄 SHARED ROUTES (Restaurant/Admin)
============================ */

// ✅ Update order status (only restaurant or admin)
router.put("/:id/status", protect, (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "restaurant" || req.user.role === "admin")
  ) {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Only restaurant or admin can update orders" });
}, updateOrderStatus);

module.exports = router;
