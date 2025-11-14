// // // const Order = require("../models/Order");
// // // const OrderCounter = require("../models/OrderCounter");
// // // require("../models/Restaurant");
// // // require("../models/User");

// // // // ✅ Generate daily-reset sequential order number
// // // const generateOrderNumber = async () => {
// // //   const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

// // //   // Find today's counter or create new one
// // //   let counter = await OrderCounter.findOne({ date: today });

// // //   if (!counter) {
// // //     counter = await OrderCounter.create({ date: today, seq: 0 });
// // //   }

// // //   // Increment and save
// // //   counter.seq += 1;
// // //   await counter.save();

// // //   // Format: ORD0001, ORD0002, ...
// // //   return `ORD${counter.seq.toString().padStart(4, "0")}`;
// // // };

// // // // ✅ Place a new order (User)
// // // const placeOrder = async (req, res) => {
// // //   try {
// // //     const { items, totalPrice, restaurantId } = req.body;

// // //     if (!items?.length)
// // //       return res.status(400).json({ message: "No items in the order" });
// // //     if (!restaurantId)
// // //       return res.status(400).json({ message: "Restaurant ID is required" });
// // //     if (!totalPrice || totalPrice <= 0)
// // //       return res.status(400).json({ message: "Total price must be valid" });

// // //     const mixedRestaurant = items.some(
// // //       (i) => i.restaurantId && i.restaurantId !== restaurantId
// // //     );
// // //     if (mixedRestaurant) {
// // //       return res.status(400).json({
// // //         message: "❌ All items in the order must belong to the same restaurant.",
// // //       });
// // //     }

// // //     // 🆕 Generate daily sequential order number
// // //     const nextOrderNumber = await generateOrderNumber();

// // //     const order = new Order({
// // //       user: req.user._id,
// // //       restaurant: restaurantId,
// // //       items,
// // //       totalPrice,
// // //       status: "Pending",
// // //       orderNumber: nextOrderNumber,
// // //     });

// // //     await order.save();

// // //     const populatedOrder = await Order.findById(order._id)
// // //       .populate("user", "name email")
// // //       .populate("restaurant", "name email");

// // //     // 🔄 Socket notification
// // //     const io = req.app.get("io");
// // //     if (io && populatedOrder?.restaurant?._id) {
// // //       io.to(populatedOrder.restaurant._id.toString()).emit(
// // //         "orderPlaced",
// // //         populatedOrder
// // //       );
// // //     }

// // //     res.status(201).json({
// // //       message: "Order placed successfully",
// // //       orderNumber: nextOrderNumber,
// // //       order: populatedOrder,
// // //     });
// // //   } catch (err) {
// // //     console.error("❌ Place order error:", err);
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ✅ Get logged-in user's orders
// // // const getOrders = async (req, res) => {
// // //   try {
// // //     const orders = await Order.find({ user: req.user._id })
// // //       .populate("restaurant", "name email")
// // //       .sort({ createdAt: -1 });
// // //     res.json(orders);
// // //   } catch (err) {
// // //     console.error("❌ Get user orders error:", err);
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ✅ Get all orders for a restaurant
// // // const getRestaurantOrders = async (req, res) => {
// // //   try {
// // //     const restaurantId = req.user._id;
// // //     const orders = await Order.find({ restaurant: restaurantId })
// // //       .populate("user", "name email")
// // //       .sort({ createdAt: -1 });
// // //     res.json(orders);
// // //   } catch (err) {
// // //     console.error("❌ Get restaurant orders error:", err);
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ✅ Admin: Get all orders
// // // const getAllOrders = async (req, res) => {
// // //   try {
// // //     const orders = await Order.find()
// // //       .populate("user", "name email")
// // //       .populate("restaurant", "name email")
// // //       .sort({ createdAt: -1 });
// // //     res.json(orders);
// // //   } catch (err) {
// // //     console.error("❌ Get all orders error:", err);
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ✅ Update order status (restaurant/admin)
// // // const updateOrderStatus = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const { status } = req.body;

// // //     if (!status)
// // //       return res.status(400).json({ message: "Status field is required" });

// // //     const order = await Order.findByIdAndUpdate(
// // //       id,
// // //       { status },
// // //       { new: true }
// // //     )
// // //       .populate("user", "name email")
// // //       .populate("restaurant", "name email");

// // //     if (!order) return res.status(404).json({ message: "Order not found" });

// // //     const io = req.app.get("io");
// // //     if (io) {
// // //       if (order?.user?._id)
// // //         io.to(order.user._id.toString()).emit("orderUpdated", order);
// // //       if (order?.restaurant?._id)
// // //         io.to(order.restaurant._id.toString()).emit("orderUpdated", order);
// // //     }

// // //     res.json({ message: "Order status updated successfully", order });
// // //   } catch (err) {
// // //     console.error("❌ Update order status error:", err);
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // // ❌ Cancel an order (User)
// // // const cancelOrder = async (req, res) => {
// // //   try {
// // //     const order = await Order.findById(req.params.id)
// // //       .populate("restaurant", "name email")
// // //       .populate("user", "name email");

// // //     if (!order) return res.status(404).json({ message: "Order not found" });

// // //     if (order.user._id.toString() !== req.user._id.toString()) {
// // //       return res
// // //         .status(403)
// // //         .json({ message: "You are not authorized to cancel this order" });
// // //     }

// // //     if (["Cancelled", "Delivered"].includes(order.status)) {
// // //       return res.status(400).json({
// // //         message: `Order cannot be cancelled (current: ${order.status})`,
// // //       });
// // //     }

// // //     order.status = "Cancelled";
// // //     await order.save();

// // //     const io = req.app.get("io");
// // //     if (io && order?.restaurant?._id) {
// // //       io.to(order.restaurant._id.toString()).emit("orderCancelled", order);
// // //     }

// // //     res.json({ message: "Order cancelled successfully", order });
// // //   } catch (err) {
// // //     console.error("❌ Cancel order error:", err);
// // //     res.status(500).json({ message: "Server Error", error: err.message });
// // //   }
// // // };

// // // module.exports = {
// // //   placeOrder,
// // //   getOrders,
// // //   getRestaurantOrders,
// // //   getAllOrders,
// // //   updateOrderStatus,
// // //   cancelOrder,
// // // };







// // const Order = require("../models/Order");
// // const OrderCounter = require("../models/OrderCounter");
// // require("../models/Restaurant");
// // require("../models/User");

// // // ✅ Generate daily-reset sequential order number
// // const generateOrderNumber = async () => {
// //   const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
// //   let counter = await OrderCounter.findOne({ date: today });

// //   if (!counter) {
// //     counter = await OrderCounter.create({ date: today, seq: 0 });
// //   }

// //   counter.seq += 1;
// //   await counter.save();
// //   return `ORD${counter.seq.toString().padStart(4, "0")}`;
// // };

// // // ✅ Place a new order (User)
// // const placeOrder = async (req, res) => {
// //   try {
// //     const { items, totalPrice, restaurantId } = req.body;

// //     if (!items?.length)
// //       return res.status(400).json({ message: "No items in the order" });
// //     if (!restaurantId)
// //       return res.status(400).json({ message: "Restaurant ID is required" });
// //     if (!totalPrice || totalPrice <= 0)
// //       return res.status(400).json({ message: "Total price must be valid" });

// //     const mixedRestaurant = items.some(
// //       (i) => i.restaurantId && i.restaurantId !== restaurantId
// //     );
// //     if (mixedRestaurant) {
// //       return res.status(400).json({
// //         message: "❌ All items in the order must belong to the same restaurant.",
// //       });
// //     }

// //     // 🆕 Generate daily sequential order number
// //     const nextOrderNumber = await generateOrderNumber();

// //     const order = new Order({
// //       user: req.user._id,
// //       restaurant: restaurantId,
// //       items,
// //       totalPrice,
// //       status: "Pending",
// //       orderNumber: nextOrderNumber,
// //     });

// //     await order.save();

// //     const populatedOrder = await Order.findById(order._id)
// //       .populate("user", "name email")
// //       .populate("restaurant", "name email");

// //     // 🔄 Socket notification (Restaurant + Admin)
// //     const io = req.app.get("io");
// //     if (io && populatedOrder?.restaurant?._id) {
// //       // Notify restaurant in its room
// //       io.to(populatedOrder.restaurant._id.toString()).emit(
// //         "orderPlaced",
// //         populatedOrder
// //       );

// //       // Notify all admins in global admin room
// //       io.to("admin-room").emit("adminOrderUpdate", {
// //         type: "newOrder",
// //         order: populatedOrder,
// //       });
// //     }

// //     res.status(201).json({
// //       message: "Order placed successfully",
// //       orderNumber: nextOrderNumber,
// //       order: populatedOrder,
// //     });
// //   } catch (err) {
// //     console.error("❌ Place order error:", err);
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // // ✅ Get logged-in user's orders
// // const getOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({ user: req.user._id })
// //       .populate("restaurant", "name email")
// //       .sort({ createdAt: -1 });
// //     res.json(orders);
// //   } catch (err) {
// //     console.error("❌ Get user orders error:", err);
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // // ✅ Get all orders for a restaurant
// // const getRestaurantOrders = async (req, res) => {
// //   try {
// //     const restaurantId = req.user._id;
// //     const orders = await Order.find({ restaurant: restaurantId })
// //       .populate("user", "name email")
// //       .sort({ createdAt: -1 });
// //     res.json(orders);
// //   } catch (err) {
// //     console.error("❌ Get restaurant orders error:", err);
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // // ✅ Admin: Get all orders
// // const getAllOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find()
// //       .populate("user", "name email")
// //       .populate("restaurant", "name email")
// //       .sort({ createdAt: -1 });
// //     res.json(orders);
// //   } catch (err) {
// //     console.error("❌ Get all orders error:", err);
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // // ✅ Update order status (restaurant/admin)
// // const updateOrderStatus = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { status } = req.body;

// //     if (!status)
// //       return res.status(400).json({ message: "Status field is required" });

// //     const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
// //       .populate("user", "name email")
// //       .populate("restaurant", "name email");

// //     if (!order) return res.status(404).json({ message: "Order not found" });

// //     const io = req.app.get("io");
// //     if (io) {
// //       // Notify user & restaurant
// //       if (order?.user?._id)
// //         io.to(order.user._id.toString()).emit("orderUpdated", order);
// //       if (order?.restaurant?._id)
// //         io.to(order.restaurant._id.toString()).emit("orderUpdated", order);

// //       // Notify admin dashboard of the update
// //       io.to("admin-room").emit("adminOrderUpdate", {
// //         type: "statusChange",
// //         order,
// //       });
// //     }

// //     res.json({ message: "Order status updated successfully", order });
// //   } catch (err) {
// //     console.error("❌ Update order status error:", err);
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // // ❌ Cancel an order (User)
// // const cancelOrder = async (req, res) => {
// //   try {
// //     const order = await Order.findById(req.params.id)
// //       .populate("restaurant", "name email")
// //       .populate("user", "name email");

// //     if (!order) return res.status(404).json({ message: "Order not found" });

// //     if (order.user._id.toString() !== req.user._id.toString()) {
// //       return res
// //         .status(403)
// //         .json({ message: "You are not authorized to cancel this order" });
// //     }

// //     if (["Cancelled", "Delivered"].includes(order.status)) {
// //       return res.status(400).json({
// //         message: `Order cannot be cancelled (current: ${order.status})`,
// //       });
// //     }

// //     order.status = "Cancelled";
// //     await order.save();

// //     const io = req.app.get("io");
// //     if (io && order?.restaurant?._id) {
// //       io.to(order.restaurant._id.toString()).emit("orderCancelled", order);

// //       // 🆕 Notify admins of cancellation
// //       io.to("admin-room").emit("adminOrderUpdate", {
// //         type: "cancelled",
// //         order,
// //       });
// //     }

// //     res.json({ message: "Order cancelled successfully", order });
// //   } catch (err) {
// //     console.error("❌ Cancel order error:", err);
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // module.exports = {
// //   placeOrder,
// //   getOrders,
// //   getRestaurantOrders,
// //   getAllOrders,
// //   updateOrderStatus,
// //   cancelOrder,
// // };







// const Order = require("../models/Order");
// const OrderCounter = require("../models/OrderCounter");
// require("../models/Restaurant");
// require("../models/User");

// // 🆕 Monthly Revenue model
// const MonthlyRevenue = require("../models/MonthlyRevenue");

// /* ==========================================================
//    Generate daily-reset sequential order number
// ========================================================== */
// const generateOrderNumber = async () => {
//   const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
//   let counter = await OrderCounter.findOne({ date: today });

//   if (!counter) {
//     counter = await OrderCounter.create({ date: today, seq: 0 });
//   }

//   counter.seq += 1;
//   await counter.save();

//   return `ORD${counter.seq.toString().padStart(4, "0")}`;
// };

// /* ==========================================================
//    Place a new order (User)
// ========================================================== */
// const placeOrder = async (req, res) => {
//   try {
//     const { items, totalPrice, restaurantId } = req.body;

//     if (!items?.length)
//       return res.status(400).json({ message: "No items in the order" });

//     if (!restaurantId)
//       return res.status(400).json({ message: "Restaurant ID is required" });

//     if (!totalPrice || totalPrice <= 0)
//       return res.status(400).json({ message: "Total price must be valid" });

//     const mixedRestaurant = items.some(
//       (i) => i.restaurantId && i.restaurantId !== restaurantId
//     );

//     if (mixedRestaurant) {
//       return res.status(400).json({
//         message: "❌ All items in the order must belong to the same restaurant.",
//       });
//     }

//     // Generate daily sequence number
//     const nextOrderNumber = await generateOrderNumber();

//     const order = new Order({
//       user: req.user._id,
//       restaurant: restaurantId,
//       items,
//       totalPrice,
//       status: "Pending",
//       orderNumber: nextOrderNumber,
//     });

//     await order.save();

//     const populatedOrder = await Order.findById(order._id)
//       .populate("user", "name email")
//       .populate("restaurant", "name email");

//     // Socket notification
//     const io = req.app.get("io");
//     if (io && populatedOrder?.restaurant?._id) {
//       io.to(populatedOrder.restaurant._id.toString()).emit(
//         "orderPlaced",
//         populatedOrder
//       );
//       io.to("admin-room").emit("adminOrderUpdate", {
//         type: "newOrder",
//         order: populatedOrder,
//       });
//     }

//     res.status(201).json({
//       message: "Order placed successfully",
//       orderNumber: nextOrderNumber,
//       order: populatedOrder,
//     });
//   } catch (err) {
//     console.error("❌ Place order error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// /* ==========================================================
//    Get logged-in user's orders
// ========================================================== */
// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id })
//       .populate("restaurant", "name email")
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     console.error("❌ Get user orders error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// /* ==========================================================
//    Get all orders for a restaurant
// ========================================================== */
// const getRestaurantOrders = async (req, res) => {
//   try {
//     const restaurantId = req.user._id;

//     const orders = await Order.find({ restaurant: restaurantId })
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     console.error("❌ Get restaurant orders error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// /* ==========================================================
//    Admin: Get all orders
// ========================================================== */
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email")
//       .populate("restaurant", "name email")
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     console.error("❌ Get all orders error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// /* ==========================================================
//    Update Order Status + Monthly Revenue Logic
// ========================================================== */
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!status)
//       return res.status(400).json({ message: "Status field is required" });

//     // Get previous status before update
//     const prevOrder = await Order.findById(id);

//     if (!prevOrder)
//       return res.status(404).json({ message: "Order not found" });

//     // Update order status
//     const order = await Order.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     )
//       .populate("user", "name email")
//       .populate("restaurant", "name email");

//     /* ================================================
//        ⭐ MONTHLY REVENUE UPDATE
//        Trigger only when status changes TO "Delivered"
//     ================================================= */
//     if (status === "Delivered" && prevOrder.status !== "Delivered") {
//       const now = new Date();
//       const monthKey = `${now.getFullYear()}-${String(
//         now.getMonth() + 1
//       ).padStart(2, "0")}`;

//       let monthEntry = await MonthlyRevenue.findOne({ month: monthKey });

//       // Create month if missing
//       if (!monthEntry) {
//         monthEntry = new MonthlyRevenue({
//           month: monthKey,
//           totalRevenue: 0,
//           totalOrders: 0,
//         });
//       }

//       // Update monthly stats
//       monthEntry.totalRevenue += order.totalPrice;
//       monthEntry.totalOrders += 1;

//       await monthEntry.save();
//     }

//     // Socket notifications (unchanged)
//     const io = req.app.get("io");

//     if (io) {
//       if (order?.user?._id)
//         io.to(order.user._id.toString()).emit("orderUpdated", order);

//       if (order?.restaurant?._id)
//         io.to(order.restaurant._id.toString()).emit("orderUpdated", order);

//       io.to("admin-room").emit("adminOrderUpdate", {
//         type: "statusChange",
//         order,
//       });
//     }

//     res.json({ message: "Order status updated successfully", order });
//   } catch (err) {
//     console.error("❌ Update order status error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// /* ==========================================================
//    Cancel an order
// ========================================================== */
// const cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate("restaurant", "name email")
//       .populate("user", "name email");

//     if (!order)
//       return res.status(404).json({ message: "Order not found" });

//     if (order.user._id.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to cancel this order" });
//     }

//     if (["Cancelled", "Delivered"].includes(order.status)) {
//       return res
//         .status(400)
//         .json({ message: `Order cannot be cancelled (current: ${order.status})` });
//     }

//     order.status = "Cancelled";
//     await order.save();

//     const io = req.app.get("io");

//     if (io && order?.restaurant?._id) {
//       io.to(order.restaurant._id.toString()).emit("orderCancelled", order);

//       io.to("admin-room").emit("adminOrderUpdate", {
//         type: "cancelled",
//         order,
//       });
//     }

//     res.json({ message: "Order cancelled successfully", order });
//   } catch (err) {
//     console.error("❌ Cancel order error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// module.exports = {
//   placeOrder,
//   getOrders,
//   getRestaurantOrders,
//   getAllOrders,
//   updateOrderStatus,
//   cancelOrder,
// };

// backend/controllers/orderController.js
const Order = require("../models/Order");
const OrderCounter = require("../models/OrderCounter");
const Restaurant = require("../models/Restaurant");
const MonthlyRevenue = require("../models/MonthlyRevenue");

// Helper: generate daily order number
const generateOrderNumber = async () => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  let counter = await OrderCounter.findOne({ date: today });

  if (!counter) {
    counter = await OrderCounter.create({ date: today, seq: 0 });
  }

  counter.seq += 1;
  await counter.save();

  return `ORD${counter.seq.toString().padStart(4, "0")}`;
};

// Place order
const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, restaurantId } = req.body;

    if (!items?.length)
      return res.status(400).json({ message: "No items in the order" });

    if (!restaurantId)
      return res.status(400).json({ message: "Restaurant ID is required" });

    if (!totalPrice || totalPrice <= 0)
      return res.status(400).json({ message: "Total price must be valid" });

    const mixedRestaurant = items.some(
      (i) => i.restaurantId && i.restaurantId !== restaurantId
    );

    if (mixedRestaurant) {
      return res.status(400).json({
        message: "❌ All items in the order must belong to the same restaurant.",
      });
    }

    const nextOrderNumber = await generateOrderNumber();

    const order = new Order({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      totalPrice,
      status: "Pending",
      orderNumber: nextOrderNumber,
    });

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("restaurant", "name email");

    const io = req.app.get("io");
    if (io && populatedOrder?.restaurant?._id) {
      io.to(populatedOrder.restaurant._id.toString()).emit(
        "orderPlaced",
        populatedOrder
      );
      io.to("admin-room").emit("adminOrderUpdate", {
        type: "newOrder",
        order: populatedOrder,
      });
    }

    res.status(201).json({
      message: "Order placed successfully",
      orderNumber: nextOrderNumber,
      order: populatedOrder,
    });
  } catch (err) {
    console.error("❌ Place order error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get user's orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant", "name email restaurantName")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Get user orders error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get restaurant (owner) orders
const getRestaurantOrders = async (req, res) => {
  try {
    const restaurantId = req.user._id;

    const orders = await Order.find({ restaurant: restaurantId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Get restaurant orders error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Admin: get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name email restaurantName")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Get all orders error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

/* ==========================================================
   Update Order Status + Monthly revenue and restaurant totals
   - case-insensitive status handling
   - only triggers revenue update when transitioning TO "Delivered"
========================================================== */
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status)
      return res.status(400).json({ message: "Status field is required" });

    // normalize statuses for comparison
    const newStatus = String(status).trim();
    const newStatusLower = newStatus.toLowerCase();

    // fetch previous order
    const prevOrder = await Order.findById(id);
    if (!prevOrder) return res.status(404).json({ message: "Order not found" });

    const prevStatusLower = String(prevOrder.status || "").toLowerCase();

    // update order
    const order = await Order.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    )
      .populate("user", "name email")
      .populate("restaurant", "name email");

    // If transitioned into Delivered from a non-delivered state
    if (newStatusLower === "delivered" && prevStatusLower !== "delivered") {
      // 1) Update MonthlyRevenue document
      const now = new Date();
      const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

      let monthEntry = await MonthlyRevenue.findOne({ month: monthKey });
      if (!monthEntry) {
        monthEntry = await MonthlyRevenue.create({
          month: monthKey,
          totalRevenue: 0,
          totalOrders: 0,
        });
      }

      monthEntry.totalRevenue = (monthEntry.totalRevenue || 0) + (order.totalPrice || 0);
      monthEntry.totalOrders = (monthEntry.totalOrders || 0) + 1;
      await monthEntry.save();

      // 2) Update Restaurant aggregated fields (so UI can show quickly)
      if (order.restaurant) {
        const restId = typeof order.restaurant === "object" ? order.restaurant._id : order.restaurant;
        const restaurantDoc = await Restaurant.findById(restId);
        if (restaurantDoc) {
          restaurantDoc.totalRevenue = (restaurantDoc.totalRevenue || 0) + (order.totalPrice || 0);

          // Keep a simple rolling monthlyRevenue: recalc from MonthlyRevenue if you prefer.
          // Here we add to monthlyRevenue to allow quick UI read; admin endpoint ultimately uses MonthlyRevenue collection.
          restaurantDoc.monthlyRevenue = (restaurantDoc.monthlyRevenue || 0) + (order.totalPrice || 0);

          await restaurantDoc.save();
        }
      }
    }

    // socket notifications (unchanged)
    const io = req.app.get("io");
    if (io) {
      if (order?.user?._id) io.to(order.user._id.toString()).emit("orderUpdated", order);
      if (order?.restaurant?._id) io.to(order.restaurant._id.toString()).emit("orderUpdated", order);

      io.to("admin-room").emit("adminOrderUpdate", {
        type: "statusChange",
        order,
      });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (err) {
    console.error("❌ Update order status error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("restaurant", "name email")
      .populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to cancel this order" });
    }

    if (["Cancelled", "Delivered"].includes(String(order.status || "").toLowerCase())) {
      return res.status(400).json({ message: `Order cannot be cancelled (current: ${order.status})` });
    }

    order.status = "Cancelled";
    await order.save();

    const io = req.app.get("io");
    if (io && order?.restaurant?._id) {
      io.to(order.restaurant._id.toString()).emit("orderCancelled", order);
      io.to("admin-room").emit("adminOrderUpdate", {
        type: "cancelled",
        order,
      });
    }

    res.json({ message: "Order cancelled successfully", order });
  } catch (err) {
    console.error("❌ Cancel order error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getRestaurantOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};
