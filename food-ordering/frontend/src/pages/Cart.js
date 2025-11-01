import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import api from "../utils/api";
import "../styles/Cart.css";

function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Calculate total price
  const totalPrice = cart.reduce(
    (acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1),
    0
  );

  const handleOrder = async () => {
    if (!cart || cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    if (!user) {
      alert("⚠️ Please login first to place an order.");
      navigate("/login");
      return;
    }

    // ✅ Ensure all items are from the same restaurant
    const restaurantId = cart[0]?.restaurantId;
    if (!restaurantId) {
      alert("❌ Restaurant information missing in cart items.");
      return;
    }

    try {
      const orderItems = cart.map((c) => ({
        menuItem: c.item._id,
        name: c.item.name,
        price: c.item.price,
        quantity: c.quantity,
      }));

      await api.post("/orders", {
        items: orderItems,
        totalPrice,
        restaurantId,
      });

      // ✅ Save locally for quick access
      const ordersKey = `orders_${user._id}`;
      const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
      const newOrder = {
        id: Date.now(),
        items: cart,
        totalPrice,
        status: "Pending",
      };
      localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

      alert("✅ Order placed successfully!");
      clearCart();
      localStorage.removeItem("cart");
      navigate("/orders");
    } catch (err) {
      console.error("❌ Order error:", err.response?.data || err.message);
      alert(`❌ Error placing order: ${err.response?.data?.message || "Please try again."}`);
    }
  };

  return (
    <div className="cart-container">
      {/* 🧺 Left Section: Cart Items */}
      <div className="cart-items">
        <h2>🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((c, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-info">
                <img
                  src={c.item?.image || "https://via.placeholder.com/80"}
                  alt={c.item?.name}
                  className="cart-item-image"
                />
                <div>
                  <h4>{c.item?.name}</h4>
                  <p>₹{c.item?.price}</p>
                </div>
              </div>

              <div className="cart-quantity">
                <button
                  onClick={() =>
                    updateQuantity(c.item._id, Math.max(1, c.quantity - 1))
                  }
                >
                  ➖
                </button>
                <span>{c.quantity}</span>
                <button onClick={() => updateQuantity(c.item._id, c.quantity + 1)}>
                  ➕
                </button>
              </div>

              <button
                onClick={() => removeFromCart(c.item._id)}
                className="remove-btn"
              >
                ❌ Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* 💰 Right Section: Order Summary */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {cart.reduce((acc, c) => acc + c.quantity, 0)}</p>
          <h2>Total: ₹{totalPrice}</h2>

          <button onClick={handleOrder} className="order-btn">
            ✅ Order Now
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
