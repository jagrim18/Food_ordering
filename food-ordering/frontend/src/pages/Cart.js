// // // // import React, { useContext, useState, useEffect } from "react";
// // // // import { useNavigate } from "react-router-dom";
// // // // import { AuthContext } from "../context/AuthContext";
// // // // import { CartContext } from "../context/CartContext";
// // // // import api from "../utils/api";
// // // // import "../styles/Cart.css";

// // // // function Cart() {
// // // //   const { cart, removeFromCart, clearCart, updateQuantity, addToCart } =
// // // //     useContext(CartContext);
// // // //   const { user } = useContext(AuthContext);
// // // //   const navigate = useNavigate();

// // // //   const [promoCode, setPromoCode] = useState("");
// // // //   const [discount, setDiscount] = useState(0);
// // // //   const [tip, setTip] = useState(0);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [recommended, setRecommended] = useState([]);

// // // //   const subtotal = cart.reduce(
// // // //     (acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1),
// // // //     0
// // // //   );
// // // //   const gst = subtotal * 0.05;
// // // //   const deliveryFee = subtotal > 500 ? 0 : 30;
// // // //   const totalPrice = subtotal + gst + deliveryFee + tip - discount;

// // // //   /* ==========================================================
// // // //      🍔 Fetch Recommended Items from Same Restaurant
// // // //   ========================================================== */
// // // //   useEffect(() => {
// // // //     const fetchRecommended = async (restaurantId) => {
// // // //       try {
// // // //         const res = await api.get(`/restaurants/${restaurantId}/menu`);
// // // //         setRecommended(res.data.menu || []);
// // // //       } catch (err) {
// // // //         console.error("Error fetching recommended:", err.response?.data || err.message);
// // // //       }
// // // //     };

// // // //     if (cart.length > 0) {
// // // //       const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
// // // //       if (restaurantId) fetchRecommended(restaurantId);
// // // //     }
// // // //   }, [cart[0]?.restaurantId]);

// // // //   /* ==========================================================
// // // //      🎟️ Promo Code
// // // //   ========================================================== */
// // // //   const handleApplyPromo = () => {
// // // //     if (promoCode.trim().toLowerCase() === "save10") {
// // // //       setDiscount(subtotal * 0.1);
// // // //       alert("🎉 Promo code applied: 10% off!");
// // // //     } else {
// // // //       alert("⚠️ Invalid promo code");
// // // //     }
// // // //   };

// // // //   /* ==========================================================
// // // //      🛒 Handle Order Placement
// // // //   ========================================================== */
// // // //   const handleOrder = async () => {
// // // //     if (!cart || cart.length === 0) {
// // // //       alert("🛒 Your cart is empty!");
// // // //       return;
// // // //     }
// // // //     if (!user) {
// // // //       alert("⚠️ Please login first to place an order.");
// // // //       navigate("/login");
// // // //       return;
// // // //     }

// // // //     const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
// // // //     if (!restaurantId) {
// // // //       alert("❌ Restaurant info missing in cart items.");
// // // //       console.error("Cart content:", cart);
// // // //       return;
// // // //     }

// // // //     const allSameRestaurant = cart.every(
// // // //       (c) => (c.restaurantId || c.item?.restaurantId) === restaurantId
// // // //     );
// // // //     if (!allSameRestaurant) {
// // // //       alert("🚫 All items must be from the same restaurant!");
// // // //       return;
// // // //     }

// // // //     try {
// // // //       setIsLoading(true);

// // // //       const orderItems = cart.map((c) => ({
// // // //         name: c.item.name,
// // // //         price: c.item.price,
// // // //         quantity: c.quantity,
// // // //         image: c.item.image,
// // // //       }));

// // // //       // ✅ Send correct backend payload
// // // //       const res = await api.post("/orders", {
// // // //         items: orderItems,
// // // //         totalPrice,
// // // //         restaurantId, // important
// // // //       });

// // // //       if (res.status === 201) {
// // // //         const ordersKey = `orders_${user._id}`;
// // // //         const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
// // // //         const newOrder = {
// // // //           id: Date.now(),
// // // //           items: cart,
// // // //           totalPrice,
// // // //           status: "Pending",
// // // //         };
// // // //         localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

// // // //         alert("✅ Order placed successfully!");
// // // //         clearCart();
// // // //         localStorage.removeItem("cart");
// // // //         navigate("/orders");
// // // //       } else {
// // // //         alert("⚠️ Something went wrong while placing your order.");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("❌ Order error:", err.response?.data || err.message);
// // // //       alert(err.response?.data?.message || "❌ Error placing order, please try again.");
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   /* ==========================================================
// // // //      🧺 Empty Cart UI
// // // //   ========================================================== */
// // // //   if (cart.length === 0) {
// // // //     return (
// // // //       <div className="empty-cart">
// // // //         <img
// // // //           src="/images/empty-cart.png"
// // // //           alt="Empty cart"
// // // //         />
// // // //         <h2>Your cart is empty 🍽️</h2>
// // // //         <button onClick={() => navigate("/restaurants")}>Browse Restaurants</button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   /* ==========================================================
// // // //      🧾 Main Cart UI
// // // //   ========================================================== */
// // // //   return (
// // // //     <div className="cart-page">
// // // //       {/* 🏪 Restaurant Header */}
// // // //       <div className="restaurant-header">
// // // //         <img
// // // //           src={cart[0]?.restaurantLogo || "/images/default-restaurant.png"}
// // // //           alt="Restaurant Logo"
// // // //           className="restaurant-logo"
// // // //         />
// // // //         <div>
// // // //           <h2>{cart[0]?.restaurantName || "Restaurant"}</h2>
// // // //           <p>📍 {cart[0]?.restaurantLocation || "Location unavailable"}</p>
// // // //           <p>⏱️ Estimated Delivery: 35 mins</p>
// // // //         </div>
// // // //       </div>

// // // //       {/* Main Layout */}
// // // //       <div className="cart-layout">
// // // //         {/* 🧺 Left: Cart Items */}
// // // //         <div className="cart-items">
// // // //           <h3>🧺 Items in Your Cart</h3>
// // // //           {cart.map((c, index) => (
// // // //             <div key={c.item?._id || index} className="cart-item">
// // // //               <img
// // // //                 src={c.item?.image || "/images/default-food.png"}
// // // //                 alt={c.item?.name}
// // // //                 className="cart-item-image"
// // // //                 loading="lazy"
// // // //               />
// // // //               <div className="cart-item-details">
// // // //                 <h4>{c.item?.name}</h4>
// // // //                 <p>₹{c.item?.price}</p>
// // // //                 <span className="category-tag">
// // // //                   {c.item?.category || "Main Course"}
// // // //                 </span>
// // // //                 <div className="quantity-controls">
// // // //                   <button
// // // //                     onClick={() =>
// // // //                       updateQuantity(c.item._id, Math.max(1, c.quantity - 1))
// // // //                     }
// // // //                   >
// // // //                     −
// // // //                   </button>
// // // //                   <span>{c.quantity}</span>
// // // //                   <button onClick={() => updateQuantity(c.item._id, c.quantity + 1)}>
// // // //                     +
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //               <div className="cart-item-actions">
// // // //                 <button
// // // //                   className="remove-btn"
// // // //                   onClick={() => removeFromCart(c.item._id)}
// // // //                 >
// // // //                   ❌ Remove
// // // //                 </button>
// // // //                 <button className="save-btn">💾 Save for Later</button>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* 💰 Right: Summary */}
// // // //         <div className="cart-summary">
// // // //           <h3>💰 Bill Details</h3>
// // // //           <div className="summary-row">
// // // //             <span>Subtotal</span>
// // // //             <span>₹{subtotal.toFixed(2)}</span>
// // // //           </div>
// // // //           <div className="summary-row">
// // // //             <span>GST (5%)</span>
// // // //             <span>₹{gst.toFixed(2)}</span>
// // // //           </div>
// // // //           <div className="summary-row">
// // // //             <span>Delivery Fee</span>
// // // //             <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
// // // //           </div>
// // // //           <div className="summary-row tip-row">
// // // //             <label>Add Tip:</label>
// // // //             <input
// // // //               type="number"
// // // //               value={tip}
// // // //               min="0"
// // // //               onChange={(e) => setTip(Number(e.target.value))}
// // // //               placeholder="₹0"
// // // //             />
// // // //           </div>
// // // //           {discount > 0 && (
// // // //             <div className="summary-row discount-row">
// // // //               <span>Discount</span>
// // // //               <span>-₹{discount.toFixed(2)}</span>
// // // //             </div>
// // // //           )}
// // // //           <hr />
// // // //           <div className="summary-total">
// // // //             <h4>Total Payable</h4>
// // // //             <h4>₹{totalPrice.toFixed(2)}</h4>
// // // //           </div>

// // // //           <div className="promo-section">
// // // //             <input
// // // //               type="text"
// // // //               value={promoCode}
// // // //               onChange={(e) => setPromoCode(e.target.value)}
// // // //               placeholder="Enter promo code"
// // // //             />
// // // //             <button onClick={handleApplyPromo}>Apply</button>
// // // //           </div>

// // // //           <button
// // // //             className="checkout-btn"
// // // //             onClick={handleOrder}
// // // //             disabled={isLoading}
// // // //           >
// // // //             {isLoading ? "⏳ Placing Order..." : "✅ Proceed to Checkout"}
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* 🍔 Recommended Items */}
// // // //       {recommended.length > 0 && (
// // // //         <div className="recommended-section">
// // // //           <h3>🍔 Add more items from this restaurant</h3>
// // // //           <div className="recommended-carousel">
// // // //             {recommended.slice(0, 10).map((item) => (
// // // //               <div key={item._id || item.name} className="recommended-card">
// // // //                 <img
// // // //                   src={item.image || "/images/default-food.png"}
// // // //                   alt={item.name}
// // // //                 />
// // // //                 <h4>{item.name}</h4>
// // // //                 <p>₹{item.price}</p>
// // // //                 <button onClick={() => addToCart(item, item.restaurantId)}>
// // // //                   ➕ Add
// // // //                 </button>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Cart;





// // // import React, { useContext, useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { AuthContext } from "../context/AuthContext";
// // // import { CartContext } from "../context/CartContext";
// // // import api from "../utils/api";
// // // import "../styles/Cart.css";

// // // function Cart() {
// // //   const { cart, removeFromCart, clearCart, updateQuantity, addToCart } =
// // //     useContext(CartContext);
// // //   const { user } = useContext(AuthContext);
// // //   const navigate = useNavigate();

// // //   const [promoCode, setPromoCode] = useState("");
// // //   const [discount, setDiscount] = useState(0);
// // //   const [tip, setTip] = useState(0);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [recommended, setRecommended] = useState([]);

// // //   const subtotal = cart.reduce(
// // //     (acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1),
// // //     0
// // //   );
// // //   const gst = subtotal * 0.05;
// // //   const totalPrice = subtotal + gst + tip - discount;

// // //   useEffect(() => {
// // //     const fetchRecommended = async (restaurantId) => {
// // //       try {
// // //         const res = await api.get(`/restaurants/${restaurantId}/menu`);
// // //         setRecommended(res.data.menu || []);
// // //       } catch (err) {
// // //         console.error("Error fetching recommended:", err.response?.data || err.message);
// // //       }
// // //     };

// // //     if (cart.length > 0) {
// // //       const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
// // //       if (restaurantId) fetchRecommended(restaurantId);
// // //     }
// // //   }, [cart]);

// // //   const handleApplyPromo = () => {
// // //     if (promoCode.trim().toLowerCase() === "save10") {
// // //       setDiscount(subtotal * 0.1);
// // //       alert("🎉 Promo code applied: 10% off!");
// // //     } else {
// // //       alert("⚠️ Invalid promo code");
// // //     }
// // //   };

// // //   const handleOrder = async () => {
// // //     if (!cart || cart.length === 0) {
// // //       alert("🛒 Your cart is empty!");
// // //       return;
// // //     }
// // //     if (!user) {
// // //       alert("⚠️ Please login first to place an order.");
// // //       navigate("/login");
// // //       return;
// // //     }

// // //     const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
// // //     if (!restaurantId) {
// // //       alert("❌ Restaurant info missing in cart items.");
// // //       return;
// // //     }

// // //     const allSameRestaurant = cart.every(
// // //       (c) => (c.restaurantId || c.item?.restaurantId) === restaurantId
// // //     );
// // //     if (!allSameRestaurant) {
// // //       alert("🚫 All items must be from the same restaurant!");
// // //       return;
// // //     }

// // //     try {
// // //       setIsLoading(true);

// // //       const orderItems = cart.map((c) => ({
// // //         name: c.item.name,
// // //         price: c.item.price,
// // //         quantity: c.quantity,
// // //         image: c.item.image,
// // //       }));

// // //       const res = await api.post("/orders", {
// // //         items: orderItems,
// // //         totalPrice,
// // //         restaurantId,
// // //       });

// // //       if (res.status === 201) {
// // //         const ordersKey = `orders_${user._id}`;
// // //         const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
// // //         const newOrder = {
// // //           id: Date.now(),
// // //           items: cart,
// // //           totalPrice,
// // //           status: "Pending",
// // //         };
// // //         localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

// // //         alert("✅ Order placed successfully!");
// // //         clearCart();
// // //         localStorage.removeItem("cart");
// // //         navigate("/orders");
// // //       } else {
// // //         alert("⚠️ Something went wrong while placing your order.");
// // //       }
// // //     } catch (err) {
// // //       console.error("❌ Order error:", err.response?.data || err.message);
// // //       alert(err.response?.data?.message || "❌ Error placing order, please try again.");
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   if (cart.length === 0) {
// // //     return (
// // //       <div className="empty-cart">
// // //         <img src="/images/empty-cart.png" alt="Empty cart" />
// // //         <h2>Your cart is empty 🍽️</h2>
// // //         <button onClick={() => navigate("/restaurants")}>Browse Restaurants</button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="cart-page">
// // //       {/* 🏪 Restaurant Header */}
// // //       <div className="restaurant-header">
// // //         <div className="restaurant-box">
// // //           <img
// // //             src={cart[0]?.restaurantLogo || "/images/default-restaurant.png"}
// // //             alt="Restaurant Logo"
// // //             className="restaurant-logo"
// // //           />
// // //           <h2 className="restaurant-name">
// // //             {cart[0]?.restaurantName || "Restaurant"}
// // //           </h2>
// // //           <p className="delivery-time">⏱️ Estimated Delivery: 35 mins</p>
// // //         </div>
// // //       </div>

// // //       <div className="cart-layout">
// // //         {/* 🧺 Left: Cart Items */}
// // //         <div className="cart-items">
// // //           <h3>🧺 Items in Your Cart</h3>
// // //           {cart.map((c, index) => (
// // //             <div key={c.item?._id || index} className="cart-item">
// // //               <img
// // //                 src={c.item?.image || "/images/default-food.png"}
// // //                 alt={c.item?.name}
// // //                 className="cart-item-image"
// // //                 loading="lazy"
// // //               />
// // //               <div className="cart-item-details">
// // //                 <h4>{c.item?.name}</h4>
// // //                 <p>₹{c.item?.price}</p>
// // //                 <span className="category-tag">
// // //                   {c.item?.category || "Main Course"}
// // //                 </span>
// // //                 <div className="quantity-controls">
// // //                   <button
// // //                     onClick={() =>
// // //                       updateQuantity(c.item._id, Math.max(1, c.quantity - 1))
// // //                     }
// // //                   >
// // //                     −
// // //                   </button>
// // //                   <span>{c.quantity}</span>
// // //                   <button onClick={() => updateQuantity(c.item._id, c.quantity + 1)}>
// // //                     +
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //               <div className="cart-item-actions">
// // //                 <button
// // //                   className="remove-btn"
// // //                   onClick={() => removeFromCart(c.item._id)}
// // //                 >
// // //                   ❌ Remove
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* 💰 Right: Summary */}
// // //         <div className="cart-summary">
// // //           <h3>💰 Bill Details</h3>
// // //           <div className="summary-row">
// // //             <span>Subtotal</span>
// // //             <span>₹{subtotal.toFixed(2)}</span>
// // //           </div>
// // //           <div className="summary-row">
// // //             <span>GST (5%)</span>
// // //             <span>₹{gst.toFixed(2)}</span>
// // //           </div>
// // //           <div className="summary-row tip-row">
// // //             <label>Add Tip:</label>
// // //             <input
// // //               type="number"
// // //               value={tip}
// // //               min="0"
// // //               onChange={(e) => setTip(Number(e.target.value))}
// // //               placeholder="₹0"
// // //             />
// // //           </div>
// // //           {discount > 0 && (
// // //             <div className="summary-row discount-row">
// // //               <span>Discount</span>
// // //               <span>-₹{discount.toFixed(2)}</span>
// // //             </div>
// // //           )}
// // //           <hr />
// // //           <div className="summary-total">
// // //             <h4>Total Payable</h4>
// // //             <h4>₹{totalPrice.toFixed(2)}</h4>
// // //           </div>

// // //           <div className="promo-section">
// // //             <input
// // //               type="text"
// // //               value={promoCode}
// // //               onChange={(e) => setPromoCode(e.target.value)}
// // //               placeholder="Enter promo code"
// // //             />
// // //             <button onClick={handleApplyPromo}>Apply</button>
// // //           </div>

// // //           <button
// // //             className="checkout-btn"
// // //             onClick={handleOrder}
// // //             disabled={isLoading}
// // //           >
// // //             {isLoading ? "⏳ Placing Order..." : "✅ Proceed to Checkout"}
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Cart;




// // import React, { useContext, useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
// // import { CartContext } from "../context/CartContext";
// // import api from "../utils/api";
// // import "../styles/Cart.css";
// // import { X, Trash2, CheckCircle2 } from "lucide-react";

// // function Cart({ isOpen, onClose }) {
// //   const { cart, removeFromCart, clearCart, updateQuantity, addToCart } =
// //     useContext(CartContext);
// //   const { user } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const [promoCode, setPromoCode] = useState("");
// //   const [discount, setDiscount] = useState(0);
// //   const [tip, setTip] = useState(0);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [recommended, setRecommended] = useState([]);

// //   const subtotal = cart.reduce(
// //     (acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1),
// //     0
// //   );
// //   const gst = subtotal * 0.05;
// //   const totalPrice = subtotal + gst + tip - discount;

// //   useEffect(() => {
// //     const fetchRecommended = async (restaurantId) => {
// //       try {
// //         const res = await api.get(`/restaurants/${restaurantId}/menu`);
// //         setRecommended(res.data.menu || []);
// //       } catch (err) {
// //         console.error("Error fetching recommended:", err.message);
// //       }
// //     };

// //     if (cart.length > 0) {
// //       const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
// //       if (restaurantId) fetchRecommended(restaurantId);
// //     }
// //   }, [cart]);

// //   const handleApplyPromo = () => {
// //     if (promoCode.trim().toLowerCase() === "save10") {
// //       setDiscount(subtotal * 0.1);
// //       alert("🎉 Promo code applied: 10% off!");
// //     } else {
// //       alert("⚠️ Invalid promo code");
// //     }
// //   };

// //   const handleOrder = async () => {
// //     if (!cart || cart.length === 0) {
// //       alert("🛒 Your cart is empty!");
// //       return;
// //     }
// //     if (!user) {
// //       alert("⚠️ Please login first to place an order.");
// //       navigate("/login");
// //       return;
// //     }

// //     const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
// //     if (!restaurantId) {
// //       alert("❌ Restaurant info missing in cart items.");
// //       return;
// //     }

// //     const allSameRestaurant = cart.every(
// //       (c) => (c.restaurantId || c.item?.restaurantId) === restaurantId
// //     );
// //     if (!allSameRestaurant) {
// //       alert("🚫 All items must be from the same restaurant!");
// //       return;
// //     }

// //     try {
// //       setIsLoading(true);

// //       const orderItems = cart.map((c) => ({
// //         name: c.item.name,
// //         price: c.item.price,
// //         quantity: c.quantity,
// //         image: c.item.image,
// //       }));

// //       const res = await api.post("/orders", {
// //         items: orderItems,
// //         totalPrice,
// //         restaurantId,
// //       });

// //       if (res.status === 201) {
// //         const ordersKey = `orders_${user._id}`;
// //         const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
// //         const newOrder = {
// //           id: Date.now(),
// //           items: cart,
// //           totalPrice,
// //           status: "Pending",
// //         };
// //         localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

// //         clearCart();
// //         localStorage.removeItem("cart");

// //         // ✅ Popup success message
// //         setShowPopup(true);
// //         setTimeout(() => {
// //           setShowPopup(false);
// //           onClose?.();
// //           navigate("/orders");
// //         }, 3000);
// //       } else {
// //         alert("⚠️ Something went wrong while placing your order.");
// //       }
// //     } catch (err) {
// //       console.error("❌ Order error:", err.message);
// //       alert("❌ Error placing order, please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* Overlay */}
// //       <div
// //         className={`cart-overlay ${isOpen ? "open" : ""}`}
// //         onClick={onClose}
// //       ></div>

// //       {/* Drawer */}
// //       <div className={`cart-drawer clean ${isOpen ? "open" : ""}`}>
// //         {/* Header */}
// //         <div className="cart-header clean">
// //           <h3>Your Cart</h3>
// //           <button className="close-btn" onClick={onClose}>
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <p className="cart-subtext">
// //           {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
// //         </p>

// //         {/* Items */}
// //         <div className="cart-items">
// //           {cart.length === 0 ? (
// //             <p className="empty-cart">Your cart is empty 🍽️</p>
// //           ) : (
// //             cart.map((c, index) => (
// //               <div className="cart-item clean" key={c.item?._id || index}>
// //                 <img
// //                   src={c.item?.image || "/images/default-food.png"}
// //                   alt={c.item?.name}
// //                 />
// //                 <div className="cart-item-info">
// //                   <h4>{c.item?.name}</h4>
// //                   <p>₹{c.item?.price}</p>
// //                   <div className="qty-controller">
// //                     <button
// //                       onClick={() =>
// //                         updateQuantity(c.item._id, Math.max(1, c.quantity - 1))
// //                       }
// //                     >
// //                       −
// //                     </button>
// //                     <span>{c.quantity}</span>
// //                     <button
// //                       onClick={() => updateQuantity(c.item._id, c.quantity + 1)}
// //                     >
// //                       +
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <button
// //                   className="remove-btn clean"
// //                   onClick={() => removeFromCart(c.item._id)}
// //                 >
// //                   <Trash2 size={16} />
// //                 </button>
// //               </div>
// //             ))
// //           )}
// //         </div>

// //         {/* Summary */}
// //         {cart.length > 0 && (
// //           <div className="cart-summary clean">
// //             <div className="cart-line">
// //               <span>Subtotal</span>
// //               <span>₹{subtotal.toFixed(2)}</span>
// //             </div>
// //             <div className="cart-line">
// //               <span>GST (5%)</span>
// //               <span>₹{gst.toFixed(2)}</span>
// //             </div>

// //             {discount > 0 && (
// //               <div className="cart-line">
// //                 <span>Discount</span>
// //                 <span>-₹{discount.toFixed(2)}</span>
// //               </div>
// //             )}

// //             <div className="cart-line total">
// //               <span>Total</span>
// //               <span>₹{totalPrice.toFixed(2)}</span>
// //             </div>

// //             {/* Promo Code */}
// //             <div className="promo-row">
// //               <input
// //                 type="text"
// //                 placeholder="Enter promo code"
// //                 value={promoCode}
// //                 onChange={(e) => setPromoCode(e.target.value)}
// //               />
// //               <button onClick={handleApplyPromo}>Apply</button>
// //             </div>

// //             <button
// //               className="checkout-btn clean"
// //               onClick={handleOrder}
// //               disabled={isLoading}
// //             >
// //               {isLoading ? "⏳ Placing Order..." : "Proceed to Checkout"}
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* ✅ Success Popup */}
// //       {showPopup && (
// //         <div className="order-popup">
// //           <CheckCircle2 size={28} />
// //           <span>Order placed successfully!</span>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default Cart;



// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import api from "../utils/api";
// import "../styles/Cart.css";
// import { X, Trash2, CheckCircle2, Clock } from "lucide-react";

// function Cart({ isOpen, onClose }) {
//   const { cart, removeFromCart, clearCart, updateQuantity } =
//     useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [tip, setTip] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
//   const [pickupTime, setPickupTime] = useState("15 minutes");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [orderId, setOrderId] = useState("");

//   const subtotal = cart.reduce(
//     (acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1),
//     0
//   );
//   const gst = subtotal * 0.05;
//   const totalPrice = subtotal + gst + tip - discount;

//   useEffect(() => {
//     if (cart.length === 0) return;
//     const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
//     if (!restaurantId) return;

//     const fetchRecommended = async () => {
//       try {
//         await api.get(`/restaurants/${restaurantId}/menu`);
//       } catch (err) {
//         console.error("Error fetching recommended:", err.message);
//       }
//     };
//     fetchRecommended();
//   }, [cart]);

//   const handleApplyPromo = () => {
//     if (promoCode.trim().toLowerCase() === "save10") {
//       setDiscount(subtotal * 0.1);
//       alert("🎉 Promo code applied: 10% off!");
//     } else {
//       alert("⚠️ Invalid promo code");
//     }
//   };

//   const handleProceedCheckout = () => {
//     if (!cart.length) return alert("🛒 Your cart is empty!");
//     if (!user) {
//       alert("⚠️ Please login first to place an order.");
//       navigate("/login");
//       return;
//     }
//     setShowCheckoutModal(true);
//   };

//   const handlePlaceOrder = async () => {
//     if (!user || !cart.length) return;

//     try {
//       setIsLoading(true);

//       const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
//       const orderItems = cart.map((c) => ({
//         name: c.item.name,
//         price: c.item.price,
//         quantity: c.quantity,
//         image: c.item.image,
//       }));

//       const res = await api.post("/orders", {
//         items: orderItems,
//         totalPrice,
//         restaurantId,
//         pickupTime,
//       });

//       if (res.status === 201) {
//         const newOrderId = res.data.orderId || `ORD${Math.floor(Math.random() * 90000 + 10000)}`;
//         setOrderId(newOrderId);

//         // Save locally
//         const ordersKey = `orders_${user._id}`;
//         const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
//         const newOrder = { id: Date.now(), items: cart, totalPrice, status: "Pending" };
//         localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

//         clearCart();
//         localStorage.removeItem("cart");

//         setShowCheckoutModal(false);
//         setShowSuccessModal(true);
//       } else {
//         alert("⚠️ Something went wrong while placing your order.");
//       }
//     } catch (err) {
//       console.error("❌ Order error:", err.message);
//       alert("❌ Error placing order, please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleContinueOrdering = () => {
//     setShowSuccessModal(false);
//     onClose?.();
//     navigate("/restaurants");
//   };

//   return (
//     <>
//       {/* Overlay */}
//       <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>

//       {/* Drawer */}
//       <div className={`cart-drawer clean ${isOpen ? "open" : ""}`}>
//         <div className="cart-header clean">
//           <h3>Your Cart</h3>
//           <button className="close-btn" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         <p className="cart-subtext">
//           {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
//         </p>

//         <div className="cart-items">
//           {cart.length === 0 ? (
//             <p className="empty-cart">Your cart is empty 🍽️</p>
//           ) : (
//             cart.map((c, index) => (
//               <div className="cart-item clean" key={c.item?._id || index}>
//                 <img src={c.item?.image || "/images/default-food.png"} alt={c.item?.name} />
//                 <div className="cart-item-info">
//                   <h4>{c.item?.name}</h4>
//                   <p>₹{c.item?.price}</p>
//                   <div className="qty-controller">
//                     <button onClick={() => updateQuantity(c.item._id, Math.max(1, c.quantity - 1))}>−</button>
//                     <span>{c.quantity}</span>
//                     <button onClick={() => updateQuantity(c.item._id, c.quantity + 1)}>+</button>
//                   </div>
//                 </div>
//                 <button className="remove-btn clean" onClick={() => removeFromCart(c.item._id)}>
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Summary */}
//         {cart.length > 0 && (
//           <div className="cart-summary clean">
//             <div className="cart-line">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="cart-line">
//               <span>GST (5%)</span>
//               <span>₹{gst.toFixed(2)}</span>
//             </div>
//             {discount > 0 && (
//               <div className="cart-line">
//                 <span>Discount</span>
//                 <span>-₹{discount.toFixed(2)}</span>
//               </div>
//             )}
//             <div className="cart-line total">
//               <span>Total</span>
//               <span>₹{totalPrice.toFixed(2)}</span>
//             </div>

//             <div className="promo-row">
//               <input
//                 type="text"
//                 placeholder="Enter promo code"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//               />
//               <button onClick={handleApplyPromo}>Apply</button>
//             </div>

//             <button className="checkout-btn clean" onClick={handleProceedCheckout} disabled={isLoading}>
//               {isLoading ? "⏳ Processing..." : "Proceed to Checkout"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Checkout Modal */}
//       {showCheckoutModal && (
//         <div className="checkout-modal-backdrop">
//           <div className="checkout-modal">
//             <div className="checkout-header">
//               <h3>Complete Your Order</h3>
//               <button onClick={() => setShowCheckoutModal(false)}>
//                 <X size={20} />
//               </button>
//             </div>
//             <p className="checkout-subtext">Please provide your details to complete the order</p>

//             <div className="checkout-form">
//               <label>Full Name</label>
//               <input type="text" defaultValue={user?.name || ""} placeholder="John Doe" />
//               <label>Email</label>
//               <input type="email" value={user?.email || ""} disabled placeholder="john@university.edu" />
//               <label>Pickup Time</label>
//               <div className="pickup-options">
//                 {["15 minutes", "30 minutes", "45 minutes", "1 hour"].map((t) => (
//                   <label key={t}>
//                     <input type="radio" name="pickup" checked={pickupTime === t} onChange={() => setPickupTime(t)} />
//                     {t}
//                   </label>
//                 ))}
//               </div>

//               <div className="total-row">
//                 <span>Total Amount</span>
//                 <span className="price">₹{totalPrice.toFixed(2)}</span>
//               </div>

//               <p className="note">💳 Payment will be collected at pickup</p>

//               <div className="checkout-actions">
//                 <button className="cancel" onClick={() => setShowCheckoutModal(false)}>
//                   Cancel
//                 </button>
//                 <button className="confirm" onClick={handlePlaceOrder} disabled={isLoading}>
//                   {isLoading ? "Placing..." : "Place Order"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Beautiful Success Modal */}
//       {showSuccessModal && (
//         <div className="success-modal-backdrop">
//           <div className="success-modal">
//             <div className="success-icon">
//               <CheckCircle2 size={60} color="#22c55e" strokeWidth={2.5} />
//             </div>
//             <h2>Order Confirmed!</h2>
//             <p>Your order has been successfully placed</p>

//             <div className="order-number-box">
//               <small>Order Number</small>
//               <h3>{orderId}</h3>
//             </div>

//             <div className="pickup-info">
//               <Clock size={16} color="#6b7280" />
//               <span>
//                 Estimated pickup time <b>{pickupTime}</b>
//               </span>
//             </div>

//             <div className="confirmation-note">
//               <span>📩 You’ll receive a confirmation email shortly. Please show your order number when picking up your food.</span>
//             </div>

//             <button className="continue-btn" onClick={handleContinueOrdering}>
//               Continue Ordering
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Cart;








import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import api from "../utils/api";
import "../styles/Cart.css";
import { X, Trash2, CheckCircle2, Clock } from "lucide-react";

function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [tip, setTip] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [pickupTime, setPickupTime] = useState("15 minutes");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(""); // ✅ renamed for clarity

  const subtotal = cart.reduce(
    (acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1),
    0
  );
  const gst = subtotal * 0.05;
  const totalPrice = subtotal + gst + tip - discount;

  useEffect(() => {
    if (cart.length === 0) return;
    const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
    if (!restaurantId) return;

    const fetchRecommended = async () => {
      try {
        await api.get(`/restaurants/${restaurantId}/menu`);
      } catch (err) {
        console.error("Error fetching recommended:", err.message);
      }
    };
    fetchRecommended();
  }, [cart]);

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "save10") {
      setDiscount(subtotal * 0.1);
      alert("🎉 Promo code applied: 10% off!");
    } else {
      alert("⚠️ Invalid promo code");
    }
  };

  const handleProceedCheckout = () => {
    if (!cart.length) return alert("🛒 Your cart is empty!");
    if (!user) {
      alert("⚠️ Please login first to place an order.");
      navigate("/login");
      return;
    }
    setShowCheckoutModal(true);
  };

  const handlePlaceOrder = async () => {
    if (!user || !cart.length) return;

    try {
      setIsLoading(true);

      const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
      const orderItems = cart.map((c) => ({
        name: c.item.name,
        price: c.item.price,
        quantity: c.quantity,
        image: c.item.image,
      }));

      const res = await api.post("/orders", {
        items: orderItems,
        totalPrice,
        restaurantId,
        pickupTime,
      });

      if (res.status === 201) {
        // ✅ Use real backend orderNumber (ORD00001)
        const generatedOrderNumber = res.data.orderNumber || "ORD00000";
        setOrderNumber(generatedOrderNumber);

        // Save locally
        const ordersKey = `orders_${user._id}`;
        const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
        const newOrder = { id: Date.now(), items: cart, totalPrice, status: "Pending" };
        localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

        clearCart();
        localStorage.removeItem("cart");

        setShowCheckoutModal(false);
        setShowSuccessModal(true);
      } else {
        alert("⚠️ Something went wrong while placing your order.");
      }
    } catch (err) {
      console.error("❌ Order error:", err.message);
      alert("❌ Error placing order, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueOrdering = () => {
    setShowSuccessModal(false);
    onClose?.();
    navigate("/orders");
  };

  return (
    <>
      {/* Overlay */}
      <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>

      {/* Drawer */}
      <div className={`cart-drawer clean ${isOpen ? "open" : ""}`}>
        <div className="cart-header clean">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p className="cart-subtext">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty 🍽️</p>
          ) : (
            cart.map((c, index) => (
              <div className="cart-item clean" key={c.item?._id || index}>
                <img src={c.item?.image || "/images/default-food.png"} alt={c.item?.name} />
                <div className="cart-item-info">
                  <h4>{c.item?.name}</h4>
                  <p>₹{c.item?.price}</p>
                  <div className="qty-controller">
                    <button onClick={() => updateQuantity(c.item._id, Math.max(1, c.quantity - 1))}>−</button>
                    <span>{c.quantity}</span>
                    <button onClick={() => updateQuantity(c.item._id, c.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn clean" onClick={() => removeFromCart(c.item._id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="cart-summary clean">
            <div className="cart-line">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-line">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="cart-line">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="cart-line total">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <div className="promo-row">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>

            <button className="checkout-btn clean" onClick={handleProceedCheckout} disabled={isLoading}>
              {isLoading ? "⏳ Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="checkout-modal-backdrop">
          <div className="checkout-modal">
            <div className="checkout-header">
              <h3>Complete Your Order</h3>
              <button onClick={() => setShowCheckoutModal(false)}>
                <X size={20} />
              </button>
            </div>
            <p className="checkout-subtext">Please provide your details to complete the order</p>

            <div className="checkout-form">
              <label>Full Name</label>
              <input type="text" defaultValue={user?.name || ""} placeholder="John Doe" />
              <label>Email</label>
              <input type="email" value={user?.email || ""} disabled placeholder="john@university.edu" />
              <label>Pickup Time</label>
              <div className="pickup-options">
                {["15 minutes", "30 minutes", "45 minutes", "1 hour"].map((t) => (
                  <label key={t}>
                    <input type="radio" name="pickup" checked={pickupTime === t} onChange={() => setPickupTime(t)} />
                    {t}
                  </label>
                ))}
              </div>

              <div className="total-row">
                <span>Total Amount</span>
                <span className="price">₹{totalPrice.toFixed(2)}</span>
              </div>

              <p className="note">💳 Payment will be collected at pickup</p>

              <div className="checkout-actions">
                <button className="cancel" onClick={() => setShowCheckoutModal(false)}>
                  Cancel
                </button>
                <button className="confirm" onClick={handlePlaceOrder} disabled={isLoading}>
                  {isLoading ? "Placing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-backdrop">
          <div className="success-modal">
            <div className="success-icon">
              <CheckCircle2 size={60} color="#22c55e" strokeWidth={2.5} />
            </div>
            <h2>Order Confirmed!</h2>
            <p>Your order has been successfully placed</p>

            <div className="order-number-box">
              <small>Order Number</small>
              {/* ✅ Show real backend number */}
              <h3>{orderNumber}</h3>
            </div>

            <div className="pickup-info">
              <Clock size={16} color="#6b7280" />
              <span>
                Estimated pickup time <b>{pickupTime}</b>
              </span>
            </div>

            <div className="confirmation-note">
              <span>📩 You’ll receive a confirmation email shortly. Please show your order number when picking up your food.</span>
            </div>

            <button className="continue-btn" onClick={handleContinueOrdering}>
              Continue Ordering
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
