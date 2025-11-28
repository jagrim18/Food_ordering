// // backend/routes/menuRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   addMenuItem,
//   getMenu,
//   getMenuByRestaurant,
//   updateMenuItem,
//   deleteMenuItem,
// } = require("../controllers/menuController");
// const { protect, restaurantOnly } = require("../middlewares/authMiddleware");

// /* ============================================================
//    📖 PUBLIC ROUTES — accessible to all users
// ============================================================ */

// // ✅ Get all menu items (for general browsing or testing)
// router.get("/", getMenu);

// // ✅ Get all menu items for a specific restaurant
// // Example: /api/menu/restaurant/6730df12ab12...
// router.get("/restaurant/:restaurantId", getMenuByRestaurant);

// // ✅ Frontend alias route for easier access
// // Example: /api/menu/:restaurantId
// router.get("/:restaurantId", getMenuByRestaurant);

// /* ============================================================
//    🔒 PROTECTED ROUTES — accessible only to restaurant owners
// ============================================================ */

// // ✅ Add a new menu item
// router.post("/", protect, restaurantOnly, addMenuItem);

// // ✅ Update a menu item (restaurant must own it)
// router.put("/:id", protect, restaurantOnly, updateMenuItem);

// // ✅ Delete a menu item (restaurant must own it)
// router.delete("/:id", protect, restaurantOnly, deleteMenuItem);

// /* ============================================================
//    ✅ Export Router
// ============================================================ */
// module.exports = router;





// backend/routes/menuRoutes.js
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

/* PUBLIC ROUTES */
router.get("/", getMenu);
router.get("/restaurant/:restaurantId", getMenuByRestaurant);
router.get("/:restaurantId", getMenuByRestaurant);

/* PROTECTED */
router.post("/", protect, restaurantOnly, addMenuItem);
router.put("/:id", protect, restaurantOnly, updateMenuItem);
router.delete("/:id", protect, restaurantOnly, deleteMenuItem);

module.exports = router;
