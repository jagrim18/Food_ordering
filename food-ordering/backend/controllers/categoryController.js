const Category = require("../models/Category");

// GET /api/categories/:restaurantId
exports.getCategories = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const categories = await Category.find({ restaurantId }).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    console.error("❌ getCategories Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/categories
exports.addCategory = async (req, res) => {
  try {
    const { restaurantId, name } = req.body;

    if (!restaurantId || !name)
      return res.status(400).json({ message: "restaurantId & name required" });

    const category = await Category.create({ restaurantId, name });

    return res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "Category already exists",
      });
    }

    console.error("❌ addCategory Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
