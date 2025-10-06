import React, { useState, useEffect } from "react";
import "../styles/Admin.css"; // CSS file

function AdminMenu() {
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "main",
  });
  const [editId, setEditId] = useState(null);

  // Fetch menu items
  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      let url = "http://localhost:5000/api/menu";
      let method = "POST";

      if (editId) {
        url = `http://localhost:5000/api/menu/${editId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (editId) {
          setMenu(menu.map((item) => (item._id === editId ? data : item)));
          setEditId(null);
        } else {
          setMenu([...menu, data]);
        }
        setFormData({ name: "", description: "", price: "", image: "", category: "main" });
        alert("✅ Item saved successfully!");
      } else {
        alert("❌ Failed: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error saving item");
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
  };

  // Delete item
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMenu(menu.filter((item) => item._id !== id));
        alert("🗑️ Item deleted!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error deleting item");
    }
  };

  return (
    <div className="admin-container">
      <h2>🍔 Admin Menu Management</h2>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="name" placeholder="Food Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="starter">Starter</option>
          <option value="main">Main</option>
          <option value="dessert">Dessert</option>
          <option value="drink">Drink</option>
        </select>
        <button type="submit">{editId ? "Update Item" : "Add Item"}</button>
      </form>

      {/* Menu List */}
      <h3>📋 Current Menu</h3>
      <div className="menu-list">
        {menu.map((item) => (
          <div key={item._id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <div className="menu-details">
              <h4>
                {item.name} - ₹{item.price}
              </h4>
              <p>{item.description}</p>
              <p className="category">Category: {item.category}</p>
              <div className="menu-actions">
                <button onClick={() => handleEdit(item)}>✏️ Edit</button>
                <button className="delete" onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMenu;
