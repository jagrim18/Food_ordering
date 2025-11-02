// const Order = require("../models/Order");
// require("../models/Restaurant");
// require("../models/User");

// // ✅ Place a new order (User)
// const placeOrder = async (req, res) => {
//   try {
//     const { items, totalPrice, restaurantId } = req.body;

//     if (!items?.length)
//       return res.status(400).json({ message: "No items in the order" });
//     if (!restaurantId)
//       return res.status(400).json({ message: "Restaurant ID is required" });
//     if (!totalPrice || totalPrice <= 0)
//       return res.status(400).json({ message: "Total price must be valid" });

//     const order = new Order({
//       user: req.user._id,
//       restaurant: restaurantId,
//       items,
//       totalPrice,
//       status: "Pending",
//     });

//     await order.save();

//     const populatedOrder = await Order.findById(order._id)
//       .populate("user", "name email")
//       .populate("restaurant", "name email");

//     const io = req.app.get("io");
//     if (io && populatedOrder?.restaurant?._id) {
//       io.to(populatedOrder.restaurant._id.toString()).emit(
//         "orderPlaced",
//         populatedOrder
//       );
//     }

//     res.status(201).json(populatedOrder);
//   } catch (err) {
//     console.error("❌ Place order error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// // ✅ Get logged-in user's orders
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

// // ✅ Get all orders for a restaurant
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

// // ✅ Admin: Get all orders
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

// // ✅ Update order status (restaurant/admin)
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!status)
//       return res.status(400).json({ message: "Status field is required" });

//     const order = await Order.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     )
//       .populate("user", "name email")
//       .populate("restaurant", "name email");

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     const io = req.app.get("io");

//     // ✅ Emit safely to user and restaurant rooms only if both exist
//     if (io) {
//       if (order?.user?._id)
//         io.to(order.user._id.toString()).emit("orderUpdated", order);
//       if (order?.restaurant?._id)
//         io.to(order.restaurant._id.toString()).emit("orderUpdated", order);
//     }

//     res.json({ message: "Order status updated successfully", order });
//   } catch (err) {
//     console.error("❌ Update order status error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// module.exports = {
//   placeOrder,
//   getOrders,
//   getRestaurantOrders,
//   getAllOrders,
//   updateOrderStatus,
// };










const Order = require("../models/Order");
require("../models/Restaurant");
require("../models/User");

// ✅ Place a new order (User)
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

    const order = new Order({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      totalPrice,
      status: "Pending",
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
    }

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error("❌ Place order error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get logged-in user's orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Get user orders error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Get all orders for a restaurant
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

// ✅ Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Get all orders error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ✅ Update order status (restaurant/admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status)
      return res.status(400).json({ message: "Status field is required" });

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("restaurant", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const io = req.app.get("io");
    if (io) {
      if (order?.user?._id)
        io.to(order.user._id.toString()).emit("orderUpdated", order);
      if (order?.restaurant?._id)
        io.to(order.restaurant._id.toString()).emit("orderUpdated", order);
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (err) {
    console.error("❌ Update order status error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ❌ Cancel an order (User only)
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("restaurant", "name email")
      .populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to cancel this order" });
    }

    if (["Cancelled", "Delivered"].includes(order.status)) {
      return res
        .status(400)
        .json({ message: `Order cannot be cancelled (current: ${order.status})` });
    }

    order.status = "Cancelled";
    await order.save();

    const io = req.app.get("io");
    if (io && order?.restaurant?._id) {
      io.to(order.restaurant._id.toString()).emit("orderCancelled", order);
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
