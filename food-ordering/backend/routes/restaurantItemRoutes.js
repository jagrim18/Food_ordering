const express = require("express");
const router = express.Router();
const {
  getItemsByRestaurant,
  addRestaurantItem,
  updateRestaurantItem,
  deleteRestaurantItem,
} = require("../controllers/restaurantItemController");

// ✅ Fetch all menu items for a specific restaurant
router.get("/:restaurantId", getItemsByRestaurant);

// ✅ Add new menu item
router.post("/", addRestaurantItem);

// ✅ Update a menu item
router.put("/:id", updateRestaurantItem);

// ✅ Delete a menu item
router.delete("/:id", deleteRestaurantItem);

module.exports = router;
