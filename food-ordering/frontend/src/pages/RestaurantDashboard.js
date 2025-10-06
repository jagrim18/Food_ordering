import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/RestaurantDashboard.css";

function RestaurantDashboard() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Main Course" });
  const [error, setError] = useState("");

  // ✅ Load restaurant from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("restaurant");
    if (!stored) {
      navigate("/restaurant/login");
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      setRestaurant(parsed);
      fetchMenu(parsed._id);
    } catch (err) {
      console.error("Invalid restaurant JSON:", err);
      navigate("/restaurant/login");
    }
  }, [navigate]);

  // ✅ Fetch menu items
  const fetchMenu = async (restaurantId) => {
    try {
      const res = await api.get(`/menu/${restaurantId}`);
      setMenu(res.data || []);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  // ✅ Add new menu item
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    try {
      const res = await api.post(`/menu`, { ...newItem });
      setMenu([...menu, res.data.menuItem]);
      setNewItem({ name: "", price: "", category: "Main Course" });
    } catch (err) {
      console.error("Add item failed:", err);
      setError("Failed to add item.");
    }
  };

  // ✅ Delete menu item
  const handleDelete = async (id) => {
    try {
      await api.delete(`/menu/${id}`);
      setMenu(menu.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ✅ Edit menu item
  const handleEdit = async (id, updated) => {
    try {
      const res = await api.put(`/menu/${id}`, updated);
      setMenu(menu.map((item) => (item._id === id ? res.data : item)));
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("restaurant");
    localStorage.removeItem("token");
    navigate("/restaurant/login");
  };

  return (
    <div className="restaurant-dashboard-page">
      <div className="dashboard-container">
        {restaurant && (
          <div className="dashboard-header">
            <h1 className="dashboard-title">Welcome, {restaurant.name} 🍴</h1>
            <div>
              <button
                onClick={() => navigate("/restaurant/orders")}
                className="orders-btn"
              >
                View Orders
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Add New Item */}
        <form onSubmit={handleAddItem} className="add-item-form">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <button type="submit" className="add-btn">
            Add Item
          </button>
        </form>

        {/* Menu List */}
        <h2 className="menu-title">Your Menu</h2>
        <div className="menu-list">
          {menu.length > 0 ? (
            menu.map((item) => (
              <div key={item._id} className="menu-item">
                <div>
                  <span className="font-medium">{item.name}</span> - ₹{item.price}
                </div>
                <div className="menu-actions">
                  <button
                    onClick={() =>
                      handleEdit(item._id, {
                        name: prompt("New name:", item.name) || item.name,
                        price: prompt("New price:", item.price) || item.price,
                        category: item.category,
                      })
                    }
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-message">No items in your menu yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDashboard;
