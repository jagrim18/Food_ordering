// // backend/controllers/orderController.js
// const Order = require("../models/Order");
// const Restaurant = require("../models/Restaurant");
// const MonthlyRevenue = require("../models/MonthlyRevenue");
// const DailyRevenue = require("../models/DailyRevenue");

// const { printReceipt } = require("../utils/printReceipt");

// /**
//  * Helper: returns YYYY-MM-DD for IST
//  */
// const getISTDateKey = (date = new Date()) => {
//   const istOffsetMs = 5.5 * 60 * 60 * 1000;
//   const istDate = new Date(date.getTime() + istOffsetMs);
//   return istDate.toISOString().slice(0, 10);
// };

// /**
//  * Ensure today's DailyRevenue exists
//  */
// const ensureTodayDailyRevenue = async () => {
//   const today = getISTDateKey();
//   const exist = await DailyRevenue.findOne({ day: today });

//   if (!exist) {
//     await DailyRevenue.create({
//       day: today,
//       totalRevenue: 0,
//       totalOrders: 0,
//     });
//   }
// };

// // =============================
// // PLACE ORDER
// // =============================
// const placeOrder = async (req, res) => {
//   try {
//     await ensureTodayDailyRevenue();

//     const { items, totalPrice, restaurantId } = req.body;

//     if (!items?.length)
//       return res.status(400).json({ message: "No items in the order" });

//     if (!restaurantId)
//       return res.status(400).json({ message: "Restaurant ID is required" });

//     if (!totalPrice || totalPrice <= 0)
//       return res.status(400).json({ message: "Total price must be valid" });

//     const mixedRestaurant = items.some(
//       (i) => i.restaurantId && i.restaurantId.toString() !== restaurantId.toString()
//     );

//     if (mixedRestaurant) {
//       return res.status(400).json({
//         message: "❌ All items must belong to the same restaurant.",
//       });
//     }

//     // Auto-increment restaurant order number
//     const restaurant = await Restaurant.findByIdAndUpdate(
//       restaurantId,
//       { $inc: { orderCounter: 1 } },
//       { new: true }
//     );

//     if (!restaurant)
//       return res.status(404).json({ message: "Restaurant not found" });

//     const nextOrderNumber = restaurant.orderCounter;

//     const order = new Order({
//       user: req.user._id,
//       restaurant: restaurantId,
//       items,
//       totalPrice,
//       status: "Pending",
//       orderNumber: nextOrderNumber,
//     });

//     await order.save();

//     const populated = await Order.findById(order._id)
//       .populate("user", "name email")
//       .populate("restaurant", "name email restaurantName address phone");

//     // SOCKET
//     const io = req.app.get("io");
//     if (io) {
//       io.to(restaurantId.toString()).emit("orderPlaced", populated);
//       io.to("admin-room").emit("adminOrderUpdate", {
//         type: "newOrder",
//         order: populated,
//       });
//     }

//     // AUTO PRINT
//     (async () => {
//       try {
//         await printReceipt(populated, populated.restaurant);
//       } catch (err) {
//         console.error("❌ Auto-print failed:", err);
//       }
//     })();

//     res.status(201).json({
//       message: "Order placed successfully",
//       orderNumber: nextOrderNumber,
//       order: populated,
//     });
//   } catch (err) {
//     console.error("❌ Place Order Error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// // =============================
// // GET USER ORDERS
// // =============================
// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id })
//       .populate("restaurant", "restaurantName")
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     console.error("❌ Get orders error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // =============================
// // GET RESTAURANT ORDERS
// // =============================
// const getRestaurantOrders = async (req, res) => {
//   try {
//     const restaurantId =
//       req.restaurant?._id ||
//       (req.user?.role === "restaurant" && req.user._id);

//     if (!restaurantId)
//       return res.status(400).json({ message: "Restaurant ID missing" });

//     const orders = await Order.find({ restaurant: restaurantId })
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     console.error("❌ Get restaurant orders error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // =============================
// // RESTAURANT STATS
// // =============================
// const getRestaurantStats = async (req, res) => {
//   try {
//     await ensureTodayDailyRevenue();

//     const today = getISTDateKey();

//     const todayEntry = await DailyRevenue.findOne({ day: today });

//     const restaurantId =
//       req.restaurant?._id ||
//       (req.user?.role === "restaurant" && req.user._id);

//     const totalOrders = await Order.countDocuments({ restaurant: restaurantId });

//     const pendingOrders = await Order.countDocuments({
//       restaurant: restaurantId,
//       status: "Pending",
//     });

//     const deliveredOrders = await Order.find({
//       restaurant: restaurantId,
//       status: "Delivered",
//     });

//     const avgPrep =
//       deliveredOrders.length === 0
//         ? 0
//         : Math.round(
//             deliveredOrders.reduce((s, o) => s + (o.prepTime || 0), 0) /
//               deliveredOrders.length
//           );

//     res.json({
//       todayRevenue: todayEntry?.totalRevenue || 0,
//       totalOrders,
//       pendingOrders,
//       avgPrepTime: avgPrep,
//     });
//   } catch (err) {
//     console.error("❌ Stats error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // =============================
// // UPDATE ORDER STATUS
// // =============================
// const updateOrderStatus = async (req, res) => {
//   try {
//     await ensureTodayDailyRevenue();

//     const { id } = req.params;
//     const { status } = req.body;

//     if (!status) return res.status(400).json({ message: "Status required" });

//     const prev = await Order.findById(id);
//     if (!prev) return res.status(404).json({ message: "Order not found" });

//     const prevLower = prev.status.toLowerCase();
//     const newLower = status.toLowerCase();

//     let updateData = { status };

//     if (newLower === "preparing" && !prev.preparingAt) {
//       updateData.preparingAt = new Date();
//     }

//     if (newLower === "delivered" && prevLower !== "delivered") {
//       const now = new Date();
//       updateData.deliveredAt = now;

//       if (prev.preparingAt) {
//         updateData.prepTime = Math.round(
//           (now - prev.preparingAt) / 60000
//         );
//       }
//     }

//     const order = await Order.findByIdAndUpdate(id, updateData, {
//       new: true,
//     })
//       .populate("user", "name email")
//       .populate("restaurant", "name email");

//     // REVENUE UPDATES
//     if (newLower === "delivered" && prevLower !== "delivered") {
//       const now = new Date();
//       const dayKey = getISTDateKey(now);

//       // Daily revenue
//       let dayEntry = await DailyRevenue.findOne({ day: dayKey });
//       if (!dayEntry) {
//         dayEntry = await DailyRevenue.create({
//           day: dayKey,
//           totalRevenue: 0,
//           totalOrders: 0,
//         });
//       }

//       dayEntry.totalRevenue += order.totalPrice;
//       dayEntry.totalOrders += 1;
//       await dayEntry.save();

//       // Monthly revenue
//       const monthKey = `${now.getFullYear()}-${String(
//         now.getMonth() + 1
//       ).padStart(2, "0")}`;

//       let monthEntry = await MonthlyRevenue.findOne({ month: monthKey });
//       if (!monthEntry) {
//         monthEntry = await MonthlyRevenue.create({
//           month: monthKey,
//           totalRevenue: 0,
//           totalOrders: 0,
//         });
//       }

//       monthEntry.totalRevenue += order.totalPrice;
//       monthEntry.totalOrders += 1;
//       await monthEntry.save();
//     }

//     const io = req.app.get("io");
//     if (io) {
//       io.to(order.restaurant._id.toString()).emit("orderUpdated", order);
//     }

//     res.json({ message: "Order updated", order });
//   } catch (err) {
//     console.error("❌ Update order error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // =============================
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("user", "name email")
//       .populate("restaurant", "restaurantName")
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // =============================
// const cancelOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate("restaurant")
//       .populate("user");

//     if (!order) return res.status(404).json({ message: "Order not found" });

//     if (order.user._id.toString() !== req.user._id.toString())
//       return res.status(403).json({
//         message: "Not authorized",
//       });

//     if (["cancelled", "delivered"].includes(order.status.toLowerCase()))
//       return res.status(400).json({
//         message: `Order cannot be cancelled`,
//       });

//     order.status = "Cancelled";
//     await order.save();

//     const io = req.app.get("io");
//     if (io) {
//       io.to(order.restaurant._id.toString()).emit("orderCancelled", order);
//     }

//     res.json({ message: "Order cancelled", order });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// module.exports = {
//   placeOrder,
//   getOrders,
//   getRestaurantOrders,
//   getAllOrders,
//   updateOrderStatus,
//   cancelOrder,
//   getRestaurantStats,
// };








// backend/controllers/orderController.js
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const MonthlyRevenue = require("../models/MonthlyRevenue");
const DailyRevenue = require("../models/DailyRevenue");
const DailyOrderCounter = require("../models/DailyOrderCounter");

const { printReceipt } = require("../utils/printReceipt");

/**
 * Helper: returns YYYY-MM-DD for IST
 */
const getISTDateKey = (date = new Date()) => {
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + istOffsetMs);
  return istDate.toISOString().slice(0, 10);
};

/**
 * Ensure today's DailyRevenue exists
 */
const ensureTodayDailyRevenue = async () => {
  const today = getISTDateKey();
  const exist = await DailyRevenue.findOne({ day: today });

  if (!exist) {
    await DailyRevenue.create({
      day: today,
      totalRevenue: 0,
      totalOrders: 0,
    });
  }
};

// =============================
// PLACE ORDER
// =============================
const placeOrder = async (req, res) => {
  try {
    await ensureTodayDailyRevenue();

    const { items, totalPrice, restaurantId } = req.body;

    if (!items?.length)
      return res.status(400).json({ message: "No items in the order" });

    if (!restaurantId)
      return res.status(400).json({ message: "Restaurant ID is required" });

    if (!totalPrice || totalPrice <= 0)
      return res.status(400).json({ message: "Total price must be valid" });

    const mixedRestaurant = items.some(
      (i) =>
        i.restaurantId &&
        i.restaurantId.toString() !== restaurantId.toString()
    );

    if (mixedRestaurant) {
      return res.status(400).json({
        message: "❌ All items must belong to the same restaurant.",
      });
    }

    // ================================
    // DAILY ORDER NUMBER SYSTEM (NEW)
    // ================================
    const todayKey = getISTDateKey();
    let counter = await DailyOrderCounter.findOne({ date: todayKey });

    if (!counter) {
      counter = await DailyOrderCounter.create({
        date: todayKey,
        count: 1,
      });
    } else {
      counter.count += 1;
      await counter.save();
    }

    const nextOrderNumber = counter.count;

    // ============================
    // CREATE ORDER
    // ============================
    const order = new Order({
      user: req.user._id,
      restaurant: restaurantId,
      items,
      totalPrice,
      status: "Pending",
      orderNumber: nextOrderNumber, // 🔥 Daily number
    });

    await order.save();

    const populated = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("restaurant", "name email restaurantName address phone");

    // SOCKET
    const io = req.app.get("io");
    if (io) {
      io.to(restaurantId.toString()).emit("orderPlaced", populated);
      io.to("admin-room").emit("adminOrderUpdate", {
        type: "newOrder",
        order: populated,
      });
    }

    // AUTO PRINT
    (async () => {
      try {
        await printReceipt(populated, populated.restaurant);
      } catch (err) {
        console.error("❌ Auto-print failed:", err);
      }
    })();

    res.status(201).json({
      message: "Order placed successfully",
      orderNumber: nextOrderNumber,
      order: populated,
    });
  } catch (err) {
    console.error("❌ Place Order Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// =============================
// GET USER ORDERS
// =============================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("restaurant", "restaurantName")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Get orders error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// =============================
// GET RESTAURANT ORDERS
// =============================
const getRestaurantOrders = async (req, res) => {
  try {
    const restaurantId =
      req.restaurant?._id ||
      (req.user?.role === "restaurant" && req.user._id);

    if (!restaurantId)
      return res.status(400).json({ message: "Restaurant ID missing" });

    const orders = await Order.find({ restaurant: restaurantId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("❌ Get restaurant orders error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// =============================
// RESTAURANT STATS
// =============================
const getRestaurantStats = async (req, res) => {
  try {
    await ensureTodayDailyRevenue();

    const today = getISTDateKey();

    const todayEntry = await DailyRevenue.findOne({ day: today });

    const restaurantId =
      req.restaurant?._id ||
      (req.user?.role === "restaurant" && req.user._id);

    const totalOrders = await Order.countDocuments({ restaurant: restaurantId });

    const pendingOrders = await Order.countDocuments({
      restaurant: restaurantId,
      status: "Pending",
    });

    const deliveredOrders = await Order.find({
      restaurant: restaurantId,
      status: "Delivered",
    });

    const avgPrep =
      deliveredOrders.length === 0
        ? 0
        : Math.round(
            deliveredOrders.reduce((s, o) => s + (o.prepTime || 0), 0) /
              deliveredOrders.length
          );

    res.json({
      todayRevenue: todayEntry?.totalRevenue || 0,
      totalOrders,
      pendingOrders,
      avgPrepTime: avgPrep,
    });
  } catch (err) {
    console.error("❌ Stats error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// =============================
// UPDATE ORDER STATUS
// =============================
const updateOrderStatus = async (req, res) => {
  try {
    await ensureTodayDailyRevenue();

    const { id } = req.params;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: "Status required" });

    const prev = await Order.findById(id);
    if (!prev) return res.status(404).json({ message: "Order not found" });

    const prevLower = prev.status.toLowerCase();
    const newLower = status.toLowerCase();

    let updateData = { status };

    if (newLower === "preparing" && !prev.preparingAt) {
      updateData.preparingAt = new Date();
    }

    if (newLower === "delivered" && prevLower !== "delivered") {
      const now = new Date();
      updateData.deliveredAt = now;

      if (prev.preparingAt) {
        updateData.prepTime = Math.round((now - prev.preparingAt) / 60000);
      }
    }

    const order = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("user", "name email")
      .populate("restaurant", "name email");

    // REVENUE UPDATES
    if (newLower === "delivered" && prevLower !== "delivered") {
      const now = new Date();
      const dayKey = getISTDateKey(now);

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

      const monthKey = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}`;

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
    }

    const io = req.app.get("io");
    if (io) {
      io.to(order.restaurant._id.toString()).emit("orderUpdated", order);
    }

    res.json({ message: "Order updated", order });
  } catch (err) {
    console.error("❌ Update order error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// =============================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "restaurantName")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// =============================
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("restaurant")
      .populate("user");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user._id.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "Not authorized",
      });

    if (["cancelled", "delivered"].includes(order.status.toLowerCase()))
      return res.status(400).json({
        message: `Order cannot be cancelled`,
      });

    order.status = "Cancelled";
    await order.save();

    const io = req.app.get("io");
    if (io) {
      io.to(order.restaurant._id.toString()).emit("orderCancelled", order);
    }

    res.json({ message: "Order cancelled", order });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getRestaurantOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getRestaurantStats,
};
