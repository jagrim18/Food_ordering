// const Order = require("../models/Order");

// // ✅ Place a new order (User)
// const placeOrder = async (req, res) => {
//   try {
//     const { items, totalPrice, restaurantId } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in the order" });
//     }
//     if (!restaurantId) {
//       return res.status(400).json({ message: "Restaurant ID is required" });
//     }
//     if (!totalPrice || totalPrice <= 0) {
//       return res.status(400).json({ message: "Total price is required" });
//     }

//     // ✅ Use new Order() for clarity
//     const order = new Order({
//       user: req.user._id,
//       restaurant: restaurantId,
//       items,
//       totalPrice, // ✅ consistent field
//       status: "Pending",
//     });

//     await order.save();

//     // ✅ Populate before sending response
//     const populatedOrder = await Order.findById(order._id)
//       .populate("user", "name email")
//       .populate("restaurant", "name email");

//     // ✅ Emit event only to restaurant
//     const io = req.app.get("io");
//     io.to(restaurantId.toString()).emit("orderPlaced", populatedOrder);

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

// // ✅ Update order status
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const order = await Order.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     )
//       .populate("user", "name email")
//       .populate("restaurant", "name email");

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // ✅ Emit update to both user & restaurant
//     const io = req.app.get("io");
//     io.to(order.user._id.toString()).emit("orderUpdated", order);
//     io.to(order.restaurant._id.toString()).emit("orderUpdated", order);

//     res.json({ message: "Order status updated", order });
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
require("../models/Restaurant"); // ✅ Register Restaurant schema
require("../models/User");       // ✅ Register User schema if not already

// ✅ Place a new order (User)
const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, restaurantId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order" });
    }
    if (!restaurantId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }
    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ message: "Total price is required" });
    }

    // ✅ Create new order
    const order = new Order({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      totalPrice, // ✅ consistent field
      status: "Pending",
    });

    await order.save();

    // ✅ Populate before sending response
    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("restaurant", "name email");

    // ✅ Emit event only to restaurant
    const io = req.app.get("io");
    io.to(restaurantId.toString()).emit("orderPlaced", populatedOrder);

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

// ✅ Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("restaurant", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // ✅ Emit update to both user & restaurant
    const io = req.app.get("io");
    io.to(order.user._id.toString()).emit("orderUpdated", order);
    io.to(order.restaurant._id.toString()).emit("orderUpdated", order);

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("❌ Update order status error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getRestaurantOrders,
  getAllOrders,
  updateOrderStatus,
};
