// frontend/src/pages/RestaurantMenu.js
import { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/RestaurantMenu.css";

function RestaurantMenu() {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "", image: "" });
  const [editingItem, setEditingItem] = useState(null);

  // 🧩 Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu/myitems");
      setMenu(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // ➕ Add or Update Item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/menu/${editingItem._id}`, newItem);
      } else {
        await api.post("/menu/add", newItem);
      }
      setNewItem({ name: "", price: "", category: "", image: "" });
      setEditingItem(null);
      fetchMenu();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // 🗑️ Delete Item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/menu/${id}`);
        fetchMenu();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  // ✏️ Edit Item
  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image || "",
    });
  };

  return (
    <div className="menu-container">
      <h2>🍽️ Manage Menu</h2>

      {/* 🧾 Add/Edit Form */}
      <form className="menu-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
        />

        <button type="submit" className="add-btn">
          {editingItem ? "Update Item" : "Add Item"}
        </button>

        {editingItem && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditingItem(null);
              setNewItem({ name: "", price: "", category: "", image: "" });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* 📋 Menu List */}
      <div className="menu-grid">
        {menu.length === 0 ? (
          <p className="no-items">No items in your menu yet.</p>
        ) : (
          menu.map((item) => (
            <div key={item._id} className="menu-card">
              <img
                src={item.image || "/default-food.png"}
                alt={item.name}
                className="menu-image"
              />
              <div className="menu-info">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price}</p>
              </div>
              <div className="menu-actions">
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  ✏️ Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RestaurantMenu;
