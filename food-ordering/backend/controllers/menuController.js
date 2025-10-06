const Menu = require("../models/Menu");

// ===============================
// @desc    Add new menu item
// @route   POST /api/menu
// @access  Private (Restaurant)
// ===============================
exports.addMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, ingredients, category } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, price, and category are required" });
    }

    const menuItem = new Menu({
      restaurant: req.user._id, // ✅ from token
      name,
      description,
      price,
      image,
      ingredients,
      category,
    });

    const savedItem = await menuItem.save();
    res
      .status(201)
      .json({ message: "Menu item added successfully", menuItem: savedItem });
  } catch (error) {
    console.error("❌ Error adding menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ===============================
// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
// ===============================
exports.getMenu = async (req, res) => {
  try {
    const items = await Menu.find().populate("restaurant", "name email cuisine");
    res.json(items);
  } catch (error) {
    console.error("❌ Error fetching menu:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ===============================
// @desc    Get menu items by restaurant
// @route   GET /api/menu/:restaurantId
// @access  Public
// ===============================
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menu = await Menu.find({ restaurant: restaurantId });
    res.json(menu);
  } catch (error) {
    console.error("❌ Error fetching menu by restaurant:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ===============================
// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private (Restaurant/Admin)
// ===============================
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (
      req.user.role !== "admin" &&
      menuItem.restaurant.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this menu item" });
    }

    const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    console.error("❌ Error updating menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ===============================
// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private (Restaurant/Admin)
// ===============================
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (
      req.user.role !== "admin" &&
      menuItem.restaurant.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this menu item" });
    }

    await menuItem.deleteOne();
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting menu item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
