// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Admin = require("../models/Admin");

/*
  protect()
  - Reads Bearer token
  - Verifies JWT
  - Looks up Admin -> Restaurant -> User (in that order)
  - Sets req.user (always) and when restaurant found also sets req.restaurant
*/
const protect = async (req, res, next) => {
  let token;

  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let authUser = await Admin.findById(decoded.id).select("-password");
    let role = "admin";

    if (!authUser) {
      authUser = await Restaurant.findById(decoded.id).select("-password");
      role = "restaurant";
    }
    if (!authUser) {
      authUser = await User.findById(decoded.id).select("-password");
      role = "user";
    }

    if (!authUser) {
      return res.status(401).json({ message: "User not found" });
    }

    // set role fallback if model didn't have it
    authUser.role = authUser.role || role;

    // Always provide req.user for consistency
    req.user = authUser;
    req.token = token;

    // If it's a restaurant, also attach req.restaurant for controllers that expect it
    if (authUser.role === "restaurant") {
      req.restaurant = authUser;
    }

    next();
  } catch (err) {
    console.error("Auth protect error:", err);
    return res.status(401).json({ message: "Token invalid or expired" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admin access only" });
};

const restaurantOnly = (req, res, next) => {
  // if protect() ran, req.user should exist; ensure it is a restaurant
  if (req.user?.role !== "restaurant") {
    return res.status(403).json({ message: "Restaurant access only" });
  }

  // Ensure req.restaurant exists for controllers that read it
  if (!req.restaurant) {
    req.restaurant = req.user;
  }

  return next();
};

module.exports = { protect, adminOnly, restaurantOnly };
