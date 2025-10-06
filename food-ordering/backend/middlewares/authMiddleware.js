const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

// ✅ Verify token and attach user/restaurant to request
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Try User first
      let authUser = await User.findById(decoded.id).select("-password");
      if (!authUser) {
        // ✅ Try Restaurant
        authUser = await Restaurant.findById(decoded.id).select("-password");
      }

      if (!authUser) {
        return res.status(401).json({ message: "User/Restaurant not found" });
      }

      // ✅ Assign role if missing
      if (!authUser.role) {
        authUser.role = authUser.name ? "restaurant" : "user"; 
      }

      req.user = authUser;
      return next();
    } catch (err) {
      console.error("❌ Auth error:", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin access only" });
};

const restaurantOnly = (req, res, next) => {
  if (req.user && req.user.role === "restaurant") return next();
  return res.status(403).json({ message: "Restaurant access only" });
};

module.exports = { protect, adminOnly, restaurantOnly };
