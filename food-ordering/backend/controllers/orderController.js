// backend/controllers/orderController.js
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const MonthlyRevenue = require("../models/MonthlyRevenue");
const DailyRevenue = require("../models/DailyRevenue");

// =============================
// PLACE ORDER (UPDATED)
// =============================
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
      (i) => i.restaurantId && i.restaurantId.toString() !== restaurantId.toString()
    );

    if (mixedRestaurant) {
      return res.status(400).json({
        message: "❌ All items in the order must belong to the same restaurant.",
      });
    }

    // NEW — Increment restaurant orderCounter
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $inc: { orderCounter: 1 } },
      { new: true }
    );

    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    // orderCounter is numeric; store numeric orderNumber
    const nextOrderNumber = restaurant.orderCounter;

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

// =============================
// GET USER ORDERS
// =============================
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

// =============================
// GET RESTAURANT ORDERS
// =============================
const getRestaurantOrders = async (req, res) => {
  try {
    // Prefer req.restaurant (set by middleware). Fallback to req.user if present.
    const restaurantId =
      (req.restaurant && req.restaurant._id) ||
      (req.user && req.user.role === "restaurant" && req.user._id);

    if (!restaurantId) {
      return res
        .status(400)
        .json({ message: "Restaurant identity not found in request" });
    }

    const orders = await Order.find({ restaurant: restaurantId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Get restaurant orders error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// =============================
// GET ALL ORDERS (ADMIN)
// =============================
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

// =============================
// UPDATE ORDER STATUS (UPDATED)
// =============================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status)
      return res.status(400).json({ message: "Status field is required" });

    const newStatus = String(status).trim();
    const newStatusLower = newStatus.toLowerCase();

    const prevOrder = await Order.findById(id);
    if (!prevOrder) return res.status(404).json({ message: "Order not found" });

    const prevStatusLower = String(prevOrder.status || "").toLowerCase();

    let updateData = { status: newStatus };

    // ⭐ When order moves to Preparing — mark timestamp
    if (newStatusLower === "preparing" && !prevOrder.preparingAt) {
      updateData.preparingAt = new Date();
    }

    // ⭐ When order moves to Delivered — calculate prep time
    if (newStatusLower === "delivered" && prevStatusLower !== "delivered") {
      const now = new Date();
      updateData.deliveredAt = now;

      if (prevOrder.preparingAt) {
        const ms = now - prevOrder.preparingAt;
        updateData.prepTime = Math.round(ms / 60000); // minutes
      }
    }

    const order = await Order.findByIdAndUpdate(id, updateData, { new: true })
      .populate("user", "name email")
      .populate("restaurant", "name email");

    // ⭐ Revenue update when marking Delivered
    if (newStatusLower === "delivered" && prevStatusLower !== "delivered") {
      const now = new Date();

      // ---- Monthly update ----
      const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

      let monthEntry = await MonthlyRevenue.findOne({ month: monthKey });
      if (!monthEntry) {
        monthEntry = await MonthlyRevenue.create({
          month: monthKey,
          totalRevenue: 0,
          totalOrders: 0,
        });
      }

      monthEntry.totalRevenue += order.totalPrice;
      monthEntry.totalOrders += 1;
      await monthEntry.save();

      // ---- Daily update (new) ----
      const dayKey = now.toISOString().slice(0, 10); // YYYY-MM-DD

      let dayEntry = await DailyRevenue.findOne({ day: dayKey });
      if (!dayEntry) {
        dayEntry = await DailyRevenue.create({
          day: dayKey,
          totalRevenue: 0,
          totalOrders: 0,
        });
      }

      dayEntry.totalRevenue += order.totalPrice;
      dayEntry.totalOrders += 1;
      await dayEntry.save();

      // ---- Update restaurant totals (existing) ----
      if (order.restaurant) {
        const restId = typeof order.restaurant === "object" ? order.restaurant._id : order.restaurant;

        const restaurantDoc = await Restaurant.findById(restId);
        if (restaurantDoc) {
          restaurantDoc.totalRevenue += order.totalPrice;
          restaurantDoc.monthlyRevenue += order.totalPrice;
          await restaurantDoc.save();
        }
      }
    }

    const io = req.app.get("io");
    if (io) {
      if (order?.user?._id)
        io.to(order.user._id.toString()).emit("orderUpdated", order);
      if (order?.restaurant?._id)
        io.to(order.restaurant._id.toString()).emit("orderUpdated", order);

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

// =============================
// CANCEL ORDER (same)
// =============================
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

    if (["cancelled", "delivered"].includes(order.status.toLowerCase())) {
      return res.status(400).json({
        message: `Order cannot be cancelled (current: ${order.status})`,
      });
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
