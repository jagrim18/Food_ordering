import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../utils/api";
import "../styles/Menu.css";

function Menu() {
  const { addToCart } = useContext(CartContext);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/menu/${restaurantId}`); // ✅ now backend supports this
        console.log("Menu data:", res.data);
        setMenuItems(res.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    if (restaurantId) fetchMenu();
  }, [restaurantId]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setSelectedItem(null);
  };

  return (
    <div className="menu-container">
      <h1 className="menu-title">🍴 Menu</h1>

      <div className="menu-grid">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div
              key={item._id}
              className="menu-card"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
            </div>
          ))
        ) : (
          <p className="no-items">No items available for this restaurant.</p>
        )}
      </div>

      {/* ===== Modal Popup ===== */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedItem(null)}
            >
              ✖
            </button>

            <img src={selectedItem.image} alt={selectedItem.name} />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>
            {selectedItem.ingredients && (
              <p>
                <strong>Ingredients:</strong> {selectedItem.ingredients}
              </p>
            )}
            <div className="price">₹{selectedItem.price}</div>

            <button
              className="add-btn"
              onClick={() => handleAddToCart(selectedItem)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
