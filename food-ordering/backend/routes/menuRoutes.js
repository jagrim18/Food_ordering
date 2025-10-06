const express = require("express");
const router = express.Router();
const {
  addMenuItem,
  getMenu,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// ===============================
// @route   POST /api/menu
// @desc    Add menu item (Restaurant only)
// ===============================
router.post("/", protect, restaurantOnly, addMenuItem);

// ===============================
// @route   GET /api/menu
// @desc    Get all menu items
// ===============================
router.get("/", getMenu);

// ===============================
// @route   GET /api/menu/:restaurantId
// @desc    Get menu items by restaurant
// ===============================
router.get("/:restaurantId", getMenuByRestaurant);

// ===============================
// @route   PUT /api/menu/:id
// @desc    Update menu item (Restaurant/Admin)
// ===============================
router.put("/:id", protect, updateMenuItem);

// ===============================
// @route   DELETE /api/menu/:id
// @desc    Delete menu item (Restaurant/Admin)
// ===============================
router.delete("/:id", protect, deleteMenuItem);

module.exports = router;
