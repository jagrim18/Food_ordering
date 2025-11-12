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

  // ✅ Add item safely (single restaurant restriction)
  const addToCart = (item, restaurantId) => {
    if (!item || !restaurantId) {
      alert("❌ Missing item or restaurant info — cannot add to cart.");
      return;
    }

    setCart((prevCart) => {
      const safeCart = prevCart.filter((c) => c?.item && c.item._id);

      // 🏪 If cart contains items from another restaurant
      if (
        safeCart.length > 0 &&
        safeCart[0].restaurantId !== restaurantId
      ) {
        const confirmSwitch = window.confirm(
          "⚠️ Your cart contains items from another restaurant.\nDo you want to clear it and add this new item?"
        );
        if (!confirmSwitch) return safeCart; // User cancelled
        return [{ item, restaurantId, quantity: 1 }]; // Clear + add
      }

      // ✅ Same restaurant — increase quantity or add new
      const existing = safeCart.find((c) => c.item._id === item._id);
      if (existing) {
        return safeCart.map((c) =>
          c.item._id === item._id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }

      return [...safeCart, { item, restaurantId, quantity: 1 }];
    });
  };

  // ✅ Decrease quantity (fix)
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updated = prevCart.map((c) =>
        c.item && c.item._id === itemId
          ? { ...c, quantity: c.quantity - 1 }
          : c
      );

      // 🧹 Remove if quantity ≤ 0
      return updated.filter((c) => c.quantity > 0);
    });
  };

  // ✅ Direct quantity update (for manual changes)
  const updateQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((c) => c.item._id !== itemId);
      }
      return prevCart.map((c) =>
        c.item && c.item._id === itemId ? { ...c, quantity } : c
      );
    });
  };

  // ✅ Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart, // now decreases one-by-one
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
