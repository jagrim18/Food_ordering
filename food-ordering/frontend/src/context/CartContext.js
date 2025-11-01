// // // src/context/CartContext.js
// // import React, { createContext, useState, useEffect } from "react";

// // export const CartContext = createContext();

// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([]);

// //   // ✅ Load cart from localStorage when app starts
// //   useEffect(() => {
// //     const savedCart = localStorage.getItem("cart");
// //     if (savedCart) {
// //       setCart(JSON.parse(savedCart));
// //     }
// //   }, []);

// //   // ✅ Save cart to localStorage whenever it changes
// //   useEffect(() => {
// //     localStorage.setItem("cart", JSON.stringify(cart));
// //   }, [cart]);

// //   // ✅ Add item to cart
// //   const addToCart = (item) => {
// //     setCart((prevCart) => {
// //       const existing = prevCart.find((c) => c._id === item._id);
// //       if (existing) {
// //         return prevCart.map((c) =>
// //           c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c
// //         );
// //       }
// //       return [...prevCart, { ...item, quantity: 1 }];
// //     });
// //   };

// //   // ✅ Remove item
// //   const removeFromCart = (id) => {
// //     setCart((prevCart) => prevCart.filter((item) => item._id !== id));
// //   };

// //   // ✅ Update quantity
// //   const updateQuantity = (id, quantity) => {
// //     setCart((prevCart) =>
// //       prevCart.map((item) =>
// //         item._id === id ? { ...item, quantity } : item
// //       )
// //     );
// //   };

// //   // ✅ Clear cart
// //   const clearCart = () => setCart([]);

// //   return (
// //     <CartContext.Provider
// //       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };




















// // src/context/CartContext.js
// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // ✅ Load cart from localStorage on app start
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   // ✅ Save cart to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // ✅ Add item to cart (with restaurant info)
//   const addToCart = (item, restaurantId) => {
//     if (!restaurantId) {
//       alert("Restaurant information missing — cannot add item.");
//       return;
//     }

//     setCart((prevCart) => {
//       const existing = prevCart.find((c) => c._id === item._id);
//       if (existing) {
//         return prevCart.map((c) =>
//           c._id === item._id
//             ? { ...c, quantity: c.quantity + 1 }
//             : c
//         );
//       }

//       // attach restaurantId so order page knows where the item came from
//       return [
//         ...prevCart,
//         { ...item, restaurantId, quantity: 1 },
//       ];
//     });
//   };

//   // ✅ Remove item from cart
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== id));
//   };

//   // ✅ Update quantity
//   const updateQuantity = (id, quantity) => {
//     if (quantity < 1) return;
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item._id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   // ✅ Clear entire cart
//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };












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

  // ✅ Add item safely with restaurant info
  const addToCart = (item, restaurantId) => {
    if (!item || !restaurantId) {
      alert("❌ Missing item or restaurant info — cannot add to cart.");
      return;
    }

    setCart((prevCart) => {
      const safeCart = prevCart.filter((c) => c?.item && c.item._id);

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
