// // const RestaurantItem = require("../models/RestaurantItem");

// // // ✅ Get all menu items for a specific restaurant
// // const getItemsByRestaurant = async (req, res) => {
// //   try {
// //     const restaurantId = req.params.id;
// //     const items = await RestaurantItem.find({ restaurantId });

// //     if (!items || items.length === 0) {
// //       return res.status(404).json({ message: "No items found for this restaurant" });
// //     }

// //     res.status(200).json(items);
// //   } catch (error) {
// //     console.error("Error fetching restaurant items:", error);
// //     res.status(500).json({ message: "Server error while fetching menu items" });
// //   }
// // };

// // // ✅ Add a new item to a restaurant's menu
// // const addRestaurantItem = async (req, res) => {
// //   try {
// //     const { restaurantId, name, price, category, image } = req.body;

// //     if (!restaurantId || !name || !price) {
// //       return res.status(400).json({ message: "Please provide restaurantId, name, and price" });
// //     }

// //     const newItem = new RestaurantItem({
// //       restaurantId,
// //       name,
// //       price,
// //       category,
// //       image,
// //     });

// //     const savedItem = await newItem.save();
// //     res.status(201).json(savedItem);
// //   } catch (error) {
// //     console.error("Error adding restaurant item:", error);
// //     res.status(500).json({ message: "Server error while adding item" });
// //   }
// // };

// // // ✅ Update an existing menu item
// // const updateRestaurantItem = async (req, res) => {
// //   try {
// //     const updatedItem = await RestaurantItem.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );

// //     if (!updatedItem) {
// //       return res.status(404).json({ message: "Item not found" });
// //     }

// //     res.status(200).json(updatedItem);
// //   } catch (error) {
// //     console.error("Error updating restaurant item:", error);
// //     res.status(500).json({ message: "Server error while updating item" });
// //   }
// // };

// // // ✅ Delete a menu item
// // const deleteRestaurantItem = async (req, res) => {
// //   try {
// //     const deletedItem = await RestaurantItem.findByIdAndDelete(req.params.id);

// //     if (!deletedItem) {
// //       return res.status(404).json({ message: "Item not found" });
// //     }

// //     res.status(200).json({ message: "Item deleted successfully" });
// //   } catch (error) {
// //     console.error("Error deleting restaurant item:", error);
// //     res.status(500).json({ message: "Server error while deleting item" });
// //   }
// // };

// // module.exports = {
// //   getItemsByRestaurant,
// //   addRestaurantItem,
// //   updateRestaurantItem,
// //   deleteRestaurantItem,
// // };













// // const RestaurantItem = require("../models/RestaurantItem");

// // // ✅ Get all menu items for a specific restaurant
// // const getItemsByRestaurant = async (req, res) => {
// //   try {
// //     const restaurantId = req.params.id;
// //     const items = await RestaurantItem.find({ restaurantId });

// //     if (!items || items.length === 0) {
// //       return res.status(404).json({ message: "No items found for this restaurant" });
// //     }

// //     res.status(200).json(items);
// //   } catch (error) {
// //     console.error("❌ Error fetching restaurant items:", error);
// //     res.status(500).json({ message: "Server error while fetching menu items" });
// //   }
// // };

// // // ✅ Add a new item to a restaurant's menu
// // const addRestaurantItem = async (req, res) => {
// //   try {
// //     const { restaurantId, name, price, category, image } = req.body;

// //     if (!restaurantId || !name || !price) {
// //       return res.status(400).json({ message: "Please provide restaurantId, name, and price" });
// //     }

// //     const newItem = new RestaurantItem({
// //       restaurantId,
// //       name,
// //       price,
// //       category,
// //       image,
// //     });

// //     const savedItem = await newItem.save();
// //     res.status(201).json(savedItem);
// //   } catch (error) {
// //     console.error("❌ Error adding restaurant item:", error);
// //     res.status(500).json({ message: "Server error while adding item" });
// //   }
// // };

// // // ✅ Update an existing menu item
// // const updateRestaurantItem = async (req, res) => {
// //   try {
// //     const updatedItem = await RestaurantItem.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );

// //     if (!updatedItem) {
// //       return res.status(404).json({ message: "Item not found" });
// //     }

// //     res.status(200).json(updatedItem);
// //   } catch (error) {
// //     console.error("❌ Error updating restaurant item:", error);
// //     res.status(500).json({ message: "Server error while updating item" });
// //   }
// // };

// // // ✅ Delete a menu item
// // const deleteRestaurantItem = async (req, res) => {
// //   try {
// //     const deletedItem = await RestaurantItem.findByIdAndDelete(req.params.id);

// //     if (!deletedItem) {
// //       return res.status(404).json({ message: "Item not found" });
// //     }

// //     res.status(200).json({ message: "✅ Item deleted successfully" });
// //   } catch (error) {
// //     console.error("❌ Error deleting restaurant item:", error);
// //     res.status(500).json({ message: "Server error while deleting item" });
// //   }
// // };

// // module.exports = {
// //   getItemsByRestaurant,
// //   addRestaurantItem,
// //   updateRestaurantItem,
// //   deleteRestaurantItem,
// // };














// const RestaurantItem = require("../models/RestaurantItem");

// // ✅ Get all menu items for a specific restaurant
// const getItemsByRestaurant = async (req, res) => {
//   try {
//     const restaurantId = req.params.id;
//     const items = await RestaurantItem.find({ restaurantId })
//       .populate("restaurantId", "name address"); // include restaurant info if needed

//     if (!items || items.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No items found for this restaurant" });
//     }

//     res.status(200).json(items);
//   } catch (error) {
//     console.error("❌ Error fetching restaurant items:", error);
//     res
//       .status(500)
//       .json({ message: "Server error while fetching menu items" });
//   }
// };

// // ✅ Add a new item to a restaurant's menu
// const addRestaurantItem = async (req, res) => {
//   try {
//     const { restaurantId, name, price, category, image, description } = req.body;

//     if (!restaurantId || !name || !price) {
//       return res
//         .status(400)
//         .json({ message: "Please provide restaurantId, name, and price" });
//     }

//     const newItem = new RestaurantItem({
//       restaurantId,
//       name,
//       price,
//       category,
//       image,
//       description,
//     });

//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (error) {
//     console.error("❌ Error adding restaurant item:", error);
//     res.status(500).json({ message: "Server error while adding item" });
//   }
// };

// // ✅ Update an existing menu item
// const updateRestaurantItem = async (req, res) => {
//   try {
//     const updatedItem = await RestaurantItem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updatedItem) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     res.status(200).json(updatedItem);
//   } catch (error) {
//     console.error("❌ Error updating restaurant item:", error);
//     res.status(500).json({ message: "Server error while updating item" });
//   }
// };

// // ✅ Delete a menu item
// const deleteRestaurantItem = async (req, res) => {
//   try {
//     const deletedItem = await RestaurantItem.findByIdAndDelete(req.params.id);

//     if (!deletedItem) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     res.status(200).json({ message: "✅ Item deleted successfully" });
//   } catch (error) {
//     console.error("❌ Error deleting restaurant item:", error);
//     res.status(500).json({ message: "Server error while deleting item" });
//   }
// };

// module.exports = {
//   getItemsByRestaurant,
//   addRestaurantItem,
//   updateRestaurantItem,
//   deleteRestaurantItem,
// };






// const RestaurantItem = require("../models/RestaurantItem");

// // ✅ Get all items for a specific restaurant
// const getItemsByRestaurant = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;
//     const items = await RestaurantItem.find({ restaurantId });

//     if (!items || items.length === 0) {
//       return res.status(200).json([]); // No error, just empty list
//     }

//     res.status(200).json(items);
//   } catch (error) {
//     console.error("❌ Error fetching restaurant items:", error);
//     res.status(500).json({ message: "Server error while fetching menu items" });
//   }
// };

// // ✅ Add new restaurant item
// const addRestaurantItem = async (req, res) => {
//   try {
//     const { restaurantId, name, price, description, category, image } = req.body;

//     if (!restaurantId || !name || !price) {
//       return res
//         .status(400)
//         .json({ message: "restaurantId, name, and price are required" });
//     }

//     const newItem = new RestaurantItem({
//       restaurantId,
//       name,
//       price,
//       description,
//       category,
//       image,
//     });

//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (error) {
//     console.error("❌ Error adding restaurant item:", error);
//     res.status(500).json({ message: "Server error while adding item" });
//   }
// };

// // ✅ Update existing item
// const updateRestaurantItem = async (req, res) => {
//   try {
//     const updated = await RestaurantItem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updated) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//     res.status(200).json(updated);
//   } catch (error) {
//     console.error("❌ Error updating item:", error);
//     res.status(500).json({ message: "Server error while updating item" });
//   }
// };

// // ✅ Delete item
// const deleteRestaurantItem = async (req, res) => {
//   try {
//     const deleted = await RestaurantItem.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//     res.status(200).json({ message: "✅ Item deleted successfully" });
//   } catch (error) {
//     console.error("❌ Error deleting item:", error);
//     res.status(500).json({ message: "Server error while deleting item" });
//   }
// };

// module.exports = {
//   getItemsByRestaurant,
//   addRestaurantItem,
//   updateRestaurantItem,
//   deleteRestaurantItem,
// };















const RestaurantItem = require("../models/RestaurantItem");

// ✅ Get all items for a specific restaurant
const getItemsByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    if (!restaurantId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    // Fetch all items linked to this restaurantId
    const items = await RestaurantItem.find({ restaurantId });

    res.status(200).json(items || []);
  } catch (error) {
    console.error("❌ Error fetching restaurant items:", error);
    res.status(500).json({ message: "Server error while fetching menu items" });
  }
};

// ✅ Add new restaurant item
const addRestaurantItem = async (req, res) => {
  try {
    const { restaurantId, name, price, description, category, image } = req.body;

    if (!restaurantId || !name || !price) {
      return res.status(400).json({
        message: "restaurantId, name, and price are required",
      });
    }

    const newItem = new RestaurantItem({
      restaurantId,
      name,
      price,
      description,
      category,
      image,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("❌ Error adding restaurant item:", error);
    res.status(500).json({ message: "Server error while adding item" });
  }
};

// ✅ Update existing item
const updateRestaurantItem = async (req, res) => {
  try {
    const updated = await RestaurantItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating item:", error);
    res.status(500).json({ message: "Server error while updating item" });
  }
};

// ✅ Delete item
const deleteRestaurantItem = async (req, res) => {
  try {
    const deleted = await RestaurantItem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "✅ Item deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting item:", error);
    res.status(500).json({ message: "Server error while deleting item" });
  }
};

module.exports = {
  getItemsByRestaurant,
  addRestaurantItem,
  updateRestaurantItem,
  deleteRestaurantItem,
};
