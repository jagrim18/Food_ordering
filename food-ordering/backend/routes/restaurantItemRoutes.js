// const express = require("express");
// const router = express.Router();
// const {
//   getFullMenuData,
//   getItemsByRestaurant,
//   addRestaurantItem,
//   updateRestaurantItem,
//   deleteRestaurantItem,
// } = require("../controllers/restaurantItemController");

// router.get("/full/:restaurantId", getFullMenuData); // 🆕 combined data route
// router.get("/restaurant/:restaurantId", getItemsByRestaurant);
// router.post("/", addRestaurantItem);
// router.put("/:id", updateRestaurantItem);
// router.delete("/:id", deleteRestaurantItem);

// module.exports = router;


// backend/routes/restaurantItemRoutes.js
const express = require("express");
const router = express.Router();
const {
  getFullMenuData,
  getItemsByRestaurant,
  addRestaurantItem,
  updateRestaurantItem,
  deleteRestaurantItem,
} = require("../controllers/restaurantItemController");

// Public: get restaurant profile + menu (supports ?isVeg=veg|nonveg)
router.get("/full/:restaurantId", getFullMenuData);

// Public: get items by restaurant (supports ?isVeg=veg|nonveg)
router.get("/restaurant/:restaurantId", getItemsByRestaurant);

// Protected endpoints (if you have auth middleware, add it here)
// If you use 'protect' middleware in other routes, add it as needed.
// e.g., router.post("/", protect, restaurantOnly, addRestaurantItem);
router.post("/", addRestaurantItem);
router.put("/:id", updateRestaurantItem);
router.delete("/:id", deleteRestaurantItem);

module.exports = router;
