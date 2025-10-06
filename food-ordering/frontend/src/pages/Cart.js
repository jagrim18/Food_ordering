// // import React, { useContext } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
// // import { CartContext } from "../context/CartContext";
// // import api from "../utils/api";
// // import "../styles/Cart.css";

// // function Cart() {
// //   const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
// //   const { user } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   // ✅ Calculate totalPrice
// //   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

// //   const handleOrder = async () => {
// //     if (!cart || cart.length === 0) {
// //       alert("Your cart is empty!");
// //       return;
// //     }

// //     if (!user) {
// //       alert("⚠️ Please login first to place an order.");
// //       navigate("/login");
// //       return;
// //     }

// //     try {
// //       // ✅ Prepare order payload
// //       const orderItems = cart.map((item) => ({
// //         menuItem: item._id,
// //         name: item.name,
// //         price: item.price,
// //         quantity: item.quantity,
// //       }));

// //       // ✅ Assume all items are from the same restaurant
// //       const restaurantId = cart[0].restaurant?._id || cart[0].restaurant;

// //       if (!restaurantId) {
// //         alert("❌ Restaurant information missing in cart items");
// //         return;
// //       }

// //       // ✅ Send to backend (use totalPrice instead of total)
// //       await api.post("/orders", {
// //         items: orderItems,
// //         totalPrice, // 🔥 fixed key
// //         restaurantId,
// //       });

// //       // ✅ Save fallback order in localStorage
// //       const ordersKey = `orders_${user._id}`;
// //       const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
// //       const newOrder = {
// //         id: Date.now(),
// //         items: cart,
// //         totalPrice, // 🔥 fixed key
// //         status: "Pending",
// //       };
// //       localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

// //       alert("✅ Order placed successfully!");
// //       clearCart(); // empty cart
// //       localStorage.removeItem(`cart_${user._id}`); // clear stored cart
// //       navigate("/orders");
// //     } catch (err) {
// //       console.error("Order error:", err.response?.data || err.message);
// //       alert("❌ Error placing order. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="cart-container">
// //       <div className="cart-items">
// //         <h2>🛒 Your Cart</h2>
// //         {cart.length === 0 ? (
// //           <p>Your cart is empty.</p>
// //         ) : (
// //           cart.map((item) => (
// //             <div key={item._id} className="cart-item">
// //               <div className="cart-item-info">
// //                 <img
// //                   src={item.image || "https://via.placeholder.com/80"}
// //                   alt={item.name}
// //                   className="cart-item-image"
// //                 />
// //                 <div>
// //                   <h4>{item.name}</h4>
// //                   <p>₹{item.price}</p>
// //                 </div>
// //               </div>

// //               <div className="cart-quantity">
// //                 <button
// //                   onClick={() =>
// //                     updateQuantity(item._id, item.quantity - 1 > 0 ? item.quantity - 1 : 1)
// //                   }
// //                 >
// //                   ➖
// //                 </button>
// //                 <span>{item.quantity}</span>
// //                 <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
// //                   ➕
// //                 </button>
// //               </div>

// //               <button onClick={() => removeFromCart(item._id)} className="remove-btn">
// //                 ❌ Remove
// //               </button>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {cart.length > 0 && (
// //         <div className="cart-summary">
// //           <h3>Order Summary</h3>
// //           <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
// //           <h2>Total: ₹{totalPrice}</h2>
// //           <button onClick={handleOrder} className="order-btn">
// //             ✅ Order Now
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Cart;









// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import api from "../utils/api";
// import "../styles/Cart.css";

// function Cart() {
//   const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // ✅ Calculate total price
//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   const handleOrder = async () => {
//     if (!cart || cart.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }

//     if (!user) {
//       alert("⚠️ Please login first to place an order.");
//       navigate("/login");
//       return;
//     }

//     try {
//       // ✅ Build order payload
//       const orderItems = cart.map((item) => ({
//         menuItem: item._id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//       }));

//       // ✅ Ensure restaurantId exists
//       const restaurantId = cart[0].restaurant?._id || cart[0].restaurant;
//       if (!restaurantId) {
//         alert("❌ Restaurant information missing in cart items");
//         return;
//       }

//       // ✅ Send order to backend with Authorization token
//       await api.post(
//         "/orders",
//         { items: orderItems, totalPrice, restaurantId },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`, // 🔥 Attach token
//           },
//         }
//       );

//       // ✅ Save fallback order in localStorage
//       const ordersKey = `orders_${user._id}`;
//       const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
//       const newOrder = {
//         id: Date.now(),
//         items: cart,
//         totalPrice,
//         status: "Pending",
//       };
//       localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

//       alert("✅ Order placed successfully!");
//       clearCart();
//       localStorage.removeItem(`cart_${user._id}`); // clear stored cart
//       navigate("/orders");
//     } catch (err) {
//       console.error("Order error:", err.response?.data || err.message);
//       alert(`❌ Error placing order: ${err.response?.data?.message || "Please try again."}`);
//     }
//   };

//   return (
//     <div className="cart-container">
//       <div className="cart-items">
//         <h2>🛒 Your Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           cart.map((item) => (
//             <div key={item._id} className="cart-item">
//               <div className="cart-item-info">
//                 <img
//                   src={item.image || "https://via.placeholder.com/80"}
//                   alt={item.name}
//                   className="cart-item-image"
//                 />
//                 <div>
//                   <h4>{item.name}</h4>
//                   <p>₹{item.price}</p>
//                 </div>
//               </div>

//               <div className="cart-quantity">
//                 <button
//                   onClick={() =>
//                     updateQuantity(item._id, item.quantity - 1 > 0 ? item.quantity - 1 : 1)
//                   }
//                 >
//                   ➖
//                 </button>
//                 <span>{item.quantity}</span>
//                 <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
//                   ➕
//                 </button>
//               </div>

//               <button onClick={() => removeFromCart(item._id)} className="remove-btn">
//                 ❌ Remove
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {cart.length > 0 && (
//         <div className="cart-summary">
//           <h3>Order Summary</h3>
//           <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
//           <h2>Total: ₹{totalPrice}</h2>
//           <button onClick={handleOrder} className="order-btn">
//             ✅ Order Now
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;







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
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!user) {
      alert("⚠️ Please login first to place an order.");
      navigate("/login");
      return;
    }

    try {
      // ✅ Build order payload
      const orderItems = cart.map((item) => ({
        menuItem: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      // ✅ Ensure restaurantId exists
      const restaurantId = cart[0].restaurant?._id || cart[0].restaurant;
      if (!restaurantId) {
        alert("❌ Restaurant information missing in cart items");
        return;
      }

      // ✅ Send order to backend (token auto-attached by api.js)
      await api.post("/orders", {
        items: orderItems,
        totalPrice,
        restaurantId,
      });

      // ✅ Save fallback order in localStorage
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
      localStorage.removeItem(`cart_${user._id}`); // clear stored cart
      navigate("/orders");
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert(`❌ Error placing order: ${err.response?.data?.message || "Please try again."}`);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-info">
                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
              </div>

              <div className="cart-quantity">
                <button
                  onClick={() =>
                    updateQuantity(item._id, item.quantity - 1 > 0 ? item.quantity - 1 : 1)
                  }
                >
                  ➖
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                  ➕
                </button>
              </div>

              <button onClick={() => removeFromCart(item._id)} className="remove-btn">
                ❌ Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
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
