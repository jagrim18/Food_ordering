import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function MenuItemCard({ item }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="menu-card">
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
}

export default MenuItemCard;
