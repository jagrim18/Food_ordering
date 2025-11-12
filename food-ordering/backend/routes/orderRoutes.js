// // module.exports = router;
// const express = require("express");
// const {
//   placeOrder,
//   getOrders,
//   getRestaurantOrders,
//   getAllOrders,
//   updateOrderStatus,
//   cancelOrder,
// } = require("../controllers/orderController");
// const {
//   protect,
//   adminOnly,
//   restaurantOnly,
// } = require("../middlewares/authMiddleware");
// const Order = require("../models/Order");

// const router = express.Router();

// /* ============================
//    🧑‍💻 USER ROUTES
// ============================ */

// // ✅ Place a new order
// router.post("/", protect, placeOrder);

// // ✅ Get logged-in user's orders
// router.get("/myorders", protect, getOrders);

// // ⭐ Rate and Review an Order
// router.post("/:id/rate", protect, async (req, res) => {
//   try {
//     const { rating, review } = req.body;
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     if (order.user.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: "Unauthorized" });

//     order.rating = rating;
//     order.review = review;
//     await order.save();

//     res.status(200).json({ message: "Rating saved successfully", order });
//   } catch (error) {
//     console.error("❌ Rating error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // 📄 Get Invoice
// router.get("/:id/invoice", protect, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate("user", "name email")
//       .populate("restaurant", "name")
//       .lean();

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     const invoice = {
//       orderId: order._id,
//       orderNumber: order.orderNumber,
//       user: order.user,
//       restaurant: order.restaurant,
//       items: order.items.map((i) => ({
//         name: i.name,
//         quantity: i.quantity,
//         price: i.price,
//         total: i.price * i.quantity,
//       })),
//       totalPrice: order.totalPrice,
//       status: order.status,
//       date: order.createdAt,
//     };

//     res.json(invoice);
//   } catch (error) {
//     console.error("❌ Invoice error:", error);
//     res.status(500).json({ message: "Server error generating invoice" });
//   }
// });

// // ❌ Cancel Order
// router.put("/:id/cancel", protect, cancelOrder);

// /* ============================
//    🍴 RESTAURANT ROUTES
// ============================ */

// // ✅ Get all orders for this restaurant
// router.get("/restaurant", protect, restaurantOnly, getRestaurantOrders);

// /* ============================
//    🛠️ ADMIN ROUTES
// ============================ */

// // ✅ Get all orders in the system
// router.get("/all", protect, adminOnly, getAllOrders);

// /* ============================
//    🔄 SHARED ROUTES
// ============================ */

// // ✅ Update order status
// router.put(
//   "/:id/status",
//   protect,
//   (req, res, next) => {
//     if (
//       req.user &&
//       (req.user.role === "restaurant" || req.user.role === "admin")
//     ) {
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
  cancelOrder,
} = require("../controllers/orderController");
const {
  protect,
  adminOnly,
  restaurantOnly,
} = require("../middlewares/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

/* ============================
   🧑‍💻 USER ROUTES
============================ */

// ✅ Place a new order
router.post("/", protect, placeOrder);

// ✅ Get logged-in user's orders
router.get("/myorders", protect, getOrders);

// ⭐ Rate and Review an Order
router.post("/:id/rate", protect, async (req, res) => {
  try {
    const { rating, review } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    order.rating = rating;
    order.review = review;
    await order.save();

    res.status(200).json({ message: "Rating saved successfully", order });
  } catch (error) {
    console.error("❌ Rating error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// 📄 Get Invoice
router.get("/:id/invoice", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("restaurant", "name")
      .lean();

    if (!order) return res.status(404).json({ message: "Order not found" });

    const invoice = {
      orderId: order._id,
      orderNumber: order.orderNumber,
      user: order.user,
      restaurant: order.restaurant,
      items: order.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        total: i.price * i.quantity,
      })),
      totalPrice: order.totalPrice,
      status: order.status,
      date: order.createdAt,
    };

    res.json(invoice);
  } catch (error) {
    console.error("❌ Invoice error:", error);
    res.status(500).json({ message: "Server error generating invoice" });
  }
});

// ❌ Cancel Order
router.put("/:id/cancel", protect, cancelOrder);

/* ============================
   🍴 RESTAURANT ROUTES
============================ */

// ✅ Get all orders for this restaurant
router.get("/restaurant", protect, restaurantOnly, getRestaurantOrders);

/* ============================
   🛠️ ADMIN ROUTES
============================ */

// ✅ Get all orders in the system
router.get("/all", protect, adminOnly, getAllOrders);

/* ============================
   🔄 SHARED ROUTES
============================ */

// ✅ Update order status
router.put(
  "/:id/status",
  protect,
  (req, res, next) => {
    if (
      req.user &&
      (req.user.role === "restaurant" || req.user.role === "admin")
    ) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Only restaurant or admin can update orders" });
  },
  updateOrderStatus
);

module.exports = router;
