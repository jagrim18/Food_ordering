// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage when app starts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c._id === item._id);
      if (existing) {
        return prevCart.map((c) =>
          c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // ✅ Update quantity
  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
