// const express = require("express");
// const router = express.Router();
// const {
//   registerUser,
//   registerRestaurant,
//   verifyOTP,
//   resendOTP,
//   loginUser,
// } = require("../controllers/authController");

// router.post("/register", registerUser);
// router.post("/register-restaurant", registerRestaurant);
// router.post("/verify-otp", verifyOTP);
// router.post("/resend-otp", resendOTP);
// router.post("/login", loginUser);

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  registerUser,
  registerRestaurant,
  verifyOTP,
  resendOTP,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/register-restaurant", registerRestaurant);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
