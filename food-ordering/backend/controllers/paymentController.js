
// // backend/controllers/paymentController.js
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const Order = require("../models/Order");
// const Restaurant = require("../models/Restaurant");

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /**
//  * Create Razorpay order (backend)
//  * POST /api/payment/create-order
//  * Body: { amount: Number }
//  */
// const createPaymentOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     const options = {
//       amount: Math.round(amount * 100), // in paise
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//       payment_capture: 1,
//     };

//     const order = await razorpay.orders.create(options);

//     // return razorpay order object to client
//     return res.status(200).json(order);
//   } catch (error) {
//     console.error("❌ createPaymentOrder error:", error);
//     return res.status(500).json({ error: "Payment order creation failed" });
//   }
// };

// /**
//  * Verify Razorpay payment signature and create Order in DB
//  * POST /api/payment/verify-payment
//  * Body: {
//  *   order_id, payment_id, signature,
//  *   cart: [{ name, price, quantity, image, restaurantId }],
//  *   userId,
//  *   totalPrice,
//  *   restaurantId,
//  *   pickupTime (optional)
//  * }
//  */
// const verifyPayment = async (req, res) => {
//   try {
//     const {
//       order_id,
//       payment_id,
//       signature,
//       cart,
//       userId,
//       totalPrice,
//       restaurantId,
//       pickupTime,
//     } = req.body;

//     if (!order_id || !payment_id || !signature) {
//       return res.status(400).json({ success: false, message: "Missing payment params" });
//     }

//     // verify signature
//     const sign = order_id + "|" + payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign)
//       .digest("hex");

//     if (expectedSign !== signature) {
//       return res.status(400).json({ success: false, message: "Invalid signature" });
//     }

//     // Basic validation: cart and restaurantId and userId
//     if (!Array.isArray(cart) || cart.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart is empty" });
//     }
//     if (!restaurantId) {
//       return res.status(400).json({ success: false, message: "restaurantId is required" });
//     }
//     if (!userId) {
//       return res.status(400).json({ success: false, message: "userId is required" });
//     }

//     // ---- Increment restaurant orderCounter (same as placeOrder) ----
//     const restaurant = await Restaurant.findByIdAndUpdate(
//       restaurantId,
//       { $inc: { orderCounter: 1 } },
//       { new: true }
//     );

//     if (!restaurant) {
//       return res.status(404).json({ success: false, message: "Restaurant not found" });
//     }

//     const nextOrderNumber = restaurant.orderCounter;

//     // build order items in the same shape as your Order model expects
//     const orderItems = cart.map((c) => ({
//       name: c.name,
//       price: c.price,
//       quantity: c.quantity,
//       image: c.image || "",
//       restaurantId: c.restaurantId || restaurantId,
//     }));

//     // create Order in DB
//     const newOrder = new Order({
//       user: userId,
//       restaurant: restaurantId,
//       items: orderItems,
//       totalPrice: totalPrice,
//       status: "Paid",
//       orderNumber: nextOrderNumber,
//       paymentInfo: {
//         orderId: order_id,
//         paymentId: payment_id,
//         method: "razorpay",
//         status: "paid",
//       },
//     });

//     if (pickupTime) newOrder.pickupTime = pickupTime; // non-required

//     await newOrder.save();

//     // populate user and restaurant for returning to client + socket emit
//     const populatedOrder = await Order.findById(newOrder._id)
//       .populate("user", "name email")
//       .populate("restaurant", "name email");

//     const io = req.app.get("io");
//     if (io && populatedOrder?.restaurant?._id) {
//       io.to(populatedOrder.restaurant._id.toString()).emit("orderPlaced", populatedOrder);
//       io.to("admin-room").emit("adminOrderUpdate", {
//         type: "newOrder",
//         order: populatedOrder,
//       });
//     }

//     // success
//     return res.status(200).json({
//       success: true,
//       orderNumber: nextOrderNumber,
//       order: populatedOrder,
//     });
//   } catch (error) {
//     console.error("❌ verifyPayment error:", error);
//     return res.status(500).json({ success: false, message: "Payment verification failed", error: error.message });
//   }
// };

// module.exports = {
//   createPaymentOrder,
//   verifyPayment,
// };



const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ----------------------------
// CREATE PAYMENT ORDER
// ----------------------------
const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (error) {
    console.error("❌ createPaymentOrder error:", error);
    return res.status(500).json({ error: "Payment order creation failed" });
  }
};

// ----------------------------
// VERIFY PAYMENT
// ----------------------------
const verifyPayment = async (req, res) => {
  try {
    const {
      order_id,
      payment_id,
      signature,
      cart,
      userId,
      restaurantId,
      totalPrice,
      pickupTime,
    } = req.body;

    // signature validation
    const sign = order_id + "|" + payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Validate params
    if (!restaurantId)
      return res.status(400).json({ success: false, message: "restaurantId missing" });

    if (!Array.isArray(cart) || cart.length === 0)
      return res.status(400).json({ success: false, message: "cart is empty" });

    // Increment restaurant counter
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $inc: { orderCounter: 1 } },
      { new: true }
    );

    const nextOrderNumber = restaurant.orderCounter;

    // format items
    const items = cart.map((c) => ({
      name: c.name,
      price: c.price,
      quantity: c.quantity,
      image: c.image,
      restaurantId: c.restaurantId || restaurantId,
    }));

    // Create order
    const newOrder = await Order.create({
      user: userId,
      restaurant: restaurantId,
      items,
      totalPrice,
      orderNumber: nextOrderNumber,
      status: "Paid",
      pickupTime,
      paymentInfo: {
        orderId: order_id,
        paymentId: payment_id,
        method: "razorpay",
        status: "paid",
      },
    });

    return res.status(200).json({
      success: true,
      orderNumber: nextOrderNumber,
    });
  } catch (error) {
    console.error("❌ verifyPayment error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
