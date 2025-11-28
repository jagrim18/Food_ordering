// // backend/routes/paymentRoutes.js
// const express = require("express");
// const router = express.Router();
// const { createPaymentOrder, verifyPayment } = require("../controllers/paymentController");
// const { protect } = require("../middlewares/authMiddleware");

// // Create razorpay order (frontend will call)
// router.post("/create-order", protect, createPaymentOrder);

// // Verify payment and persist order
// router.post("/verify-payment", protect, verifyPayment);

// module.exports = router;






const express = require("express");
const router = express.Router();

const {
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const { protect } = require("../middlewares/authMiddleware");

// Create Razorpay order
router.post("/create-order", protect, createPaymentOrder);

// Verify Razorpay payment
router.post("/verify-payment", protect, verifyPayment);

module.exports = router;
