import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load saved cart on startup
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        const cleaned = parsed.filter(
          (c) => c && c.item && c.item._id && c.restaurantId
        );
        setCart(cleaned);
      } catch (err) {
        console.error("Error parsing cart:", err);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // ✅ Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add item safely with single-restaurant restriction
  const addToCart = (item, restaurantId) => {
    if (!item || !restaurantId) {
      alert("❌ Missing item or restaurant info — cannot add to cart.");
      return;
    }

    setCart((prevCart) => {
      const safeCart = prevCart.filter((c) => c?.item && c.item._id);

      // If the cart already has items from another restaurant
      if (
        safeCart.length > 0 &&
        safeCart[0].restaurantId !== restaurantId
      ) {
        const confirmSwitch = window.confirm(
          "⚠️ Your cart contains items from another restaurant.\nDo you want to clear it and add this new item?"
        );
        if (!confirmSwitch) return safeCart; // User cancelled — keep old cart
        return [{ item, restaurantId, quantity: 1 }]; // Clear and add new item
      }

      // Same restaurant → update or add
      const existing = safeCart.find((c) => c.item._id === item._id);
      if (existing) {
        return safeCart.map((c) =>
          c.item._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }

      return [...safeCart, { item, restaurantId, quantity: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((c) => c.item && c.item._id !== itemId)
    );
  };

  // ✅ Update quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((c) =>
        c.item && c.item._id === itemId ? { ...c, quantity } : c
      )
    );
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
