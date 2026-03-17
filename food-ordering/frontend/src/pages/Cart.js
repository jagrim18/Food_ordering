// // // import React, { useContext, useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { AuthContext } from "../context/AuthContext";
// // // import { CartContext } from "../context/CartContext";
// // // import api from "../utils/api";
// // // import "../styles/Cart.css";
// // // import { X, Trash2, CheckCircle2, Clock } from "lucide-react";

// // // function Cart({ isOpen, onClose }) {
// // //   const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
// // //   const { user } = useContext(AuthContext);
// // //   const navigate = useNavigate();

// // //   const [promoCode, setPromoCode] = useState("");
// // //   const [discount, setDiscount] = useState(0);
// // //   const [tip, setTip] = useState(0);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
// // //   const [pickupTime, setPickupTime] = useState("15 minutes");
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// // //   const [orderNumber, setOrderNumber] = useState(""); // ✅ renamed for clarity

// // //   const subtotal = cart.reduce(
// // //     (acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1),
// // //     0
// // //   );
// // //   const gst = subtotal * 0.05;
// // //   const totalPrice = subtotal + gst + tip - discount;

// // //   useEffect(() => {
// // //     if (cart.length === 0) return;
// // //     const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
// // //     if (!restaurantId) return;

// // //     const fetchRecommended = async () => {
// // //       try {
// // //         await api.get(`/restaurants/${restaurantId}/menu`);
// // //       } catch (err) {
// // //         console.error("Error fetching recommended:", err.message);
// // //       }
// // //     };
// // //     fetchRecommended();
// // //   }, [cart]);

// // //   const handleApplyPromo = () => {
// // //     if (promoCode.trim().toLowerCase() === "save10") {
// // //       setDiscount(subtotal * 0.1);
// // //       alert("🎉 Promo code applied: 10% off!");
// // //     } else {
// // //       alert("⚠️ Invalid promo code");
// // //     }
// // //   };

// // //   const handleProceedCheckout = () => {
// // //     if (!cart.length) return alert("🛒 Your cart is empty!");
// // //     if (!user) {
// // //       alert("⚠️ Please login first to place an order.");
// // //       navigate("/login");
// // //       return;
// // //     }
// // //     setShowCheckoutModal(true);
// // //   };

// // //   const handlePlaceOrder = async () => {
// // //     if (!user || !cart.length) return;

// // //     try {
// // //       setIsLoading(true);

// // //       const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
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
// // //         pickupTime,
// // //       });

// // //       if (res.status === 201) {
// // //         // ✅ Use real backend orderNumber (ORD00001)
// // //         const generatedOrderNumber = res.data.orderNumber || "ORD00000";
// // //         setOrderNumber(generatedOrderNumber);

// // //         // Save locally
// // //         const ordersKey = `orders_${user._id}`;
// // //         const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
// // //         const newOrder = { id: Date.now(), items: cart, totalPrice, status: "Pending" };
// // //         localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

// // //         clearCart();
// // //         localStorage.removeItem("cart");

// // //         setShowCheckoutModal(false);
// // //         setShowSuccessModal(true);
// // //       } else {
// // //         alert("⚠️ Something went wrong while placing your order.");
// // //       }
// // //     } catch (err) {
// // //       console.error("❌ Order error:", err.message);
// // //       alert("❌ Error placing order, please try again.");
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   const handleContinueOrdering = () => {
// // //     setShowSuccessModal(false);
// // //     onClose?.();
// // //     navigate("/orders");
// // //   };

// // //   return (
// // //     <>
// // //       {/* Overlay */}
// // //       <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>

// // //       {/* Drawer */}
// // //       <div className={`cart-drawer clean ${isOpen ? "open" : ""}`}>
// // //         <div className="cart-header clean">
// // //           <h3>Your Cart</h3>
// // //           <button className="close-btn" onClick={onClose}>
// // //             <X size={20} />
// // //           </button>
// // //         </div>

// // //         <p className="cart-subtext">
// // //           {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
// // //         </p>

// // //         <div className="cart-items">
// // //           {cart.length === 0 ? (
// // //             <p className="empty-cart">Your cart is empty 🍽️</p>
// // //           ) : (
// // //             cart.map((c, index) => (
// // //               <div className="cart-item clean" key={c.item?._id || index}>
// // //                 <img src={c.item?.image || "/images/default-food.png"} alt={c.item?.name} />
// // //                 <div className="cart-item-info">
// // //                   <h4>{c.item?.name}</h4>
// // //                   <p>₹{c.item?.price}</p>
// // //                   <div className="qty-controller">
// // //                     <button onClick={() => updateQuantity(c.item._id, Math.max(1, c.quantity - 1))}>−</button>
// // //                     <span>{c.quantity}</span>
// // //                     <button onClick={() => updateQuantity(c.item._id, c.quantity + 1)}>+</button>
// // //                   </div>
// // //                 </div>
// // //                 <button className="remove-btn clean" onClick={() => removeFromCart(c.item._id)}>
// // //                   <Trash2 size={16} />
// // //                 </button>
// // //               </div>
// // //             ))
// // //           )}
// // //         </div>

// // //         {/* Summary */}
// // //         {cart.length > 0 && (
// // //           <div className="cart-summary clean">
// // //             <div className="cart-line">
// // //               <span>Subtotal</span>
// // //               <span>₹{subtotal.toFixed(2)}</span>
// // //             </div>
// // //             <div className="cart-line">
// // //               <span>GST (5%)</span>
// // //               <span>₹{gst.toFixed(2)}</span>
// // //             </div>
// // //             {discount > 0 && (
// // //               <div className="cart-line">
// // //                 <span>Discount</span>
// // //                 <span>-₹{discount.toFixed(2)}</span>
// // //               </div>
// // //             )}
// // //             <div className="cart-line total">
// // //               <span>Total</span>
// // //               <span>₹{totalPrice.toFixed(2)}</span>
// // //             </div>

// // //             <div className="promo-row">
// // //               <input
// // //                 type="text"
// // //                 placeholder="Enter promo code"
// // //                 value={promoCode}
// // //                 onChange={(e) => setPromoCode(e.target.value)}
// // //               />
// // //               <button onClick={handleApplyPromo}>Apply</button>
// // //             </div>

// // //             <button className="checkout-btn clean" onClick={handleProceedCheckout} disabled={isLoading}>
// // //               {isLoading ? "⏳ Processing..." : "Proceed to Checkout"}
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Checkout Modal */}
// // //       {showCheckoutModal && (
// // //         <div className="checkout-modal-backdrop">
// // //           <div className="checkout-modal">
// // //             <div className="checkout-header">
// // //               <h3>Complete Your Order</h3>
// // //               <button onClick={() => setShowCheckoutModal(false)}>
// // //                 <X size={20} />
// // //               </button>
// // //             </div>
// // //             <p className="checkout-subtext">Please provide your details to complete the order</p>

// // //             <div className="checkout-form">
// // //               <label>Full Name</label>
// // //               <input type="text" defaultValue={user?.name || ""} placeholder="John Doe" />
// // //               <label>Email</label>
// // //               <input type="email" value={user?.email || ""} disabled placeholder="john@university.edu" />
// // //               <label>Pickup Time</label>
// // //               <div className="pickup-options">
// // //                 {["15 minutes", "30 minutes", "45 minutes", "1 hour"].map((t) => (
// // //                   <label key={t}>
// // //                     <input type="radio" name="pickup" checked={pickupTime === t} onChange={() => setPickupTime(t)} />
// // //                     {t}
// // //                   </label>
// // //                 ))}
// // //               </div>

// // //               <div className="total-row">
// // //                 <span>Total Amount</span>
// // //                 <span className="price">₹{totalPrice.toFixed(2)}</span>
// // //               </div>

// // //               <p className="note">💳 Payment will be collected at pickup</p>

// // //               <div className="checkout-actions">
// // //                 <button className="cancel" onClick={() => setShowCheckoutModal(false)}>
// // //                   Cancel
// // //                 </button>
// // //                 <button className="confirm" onClick={handlePlaceOrder} disabled={isLoading}>
// // //                   {isLoading ? "Placing..." : "Place Order"}
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ✅ Success Modal */}
// // //       {showSuccessModal && (
// // //         <div className="success-modal-backdrop">
// // //           <div className="success-modal">
// // //             <div className="success-icon">
// // //               <CheckCircle2 size={60} color="#22c55e" strokeWidth={2.5} />
// // //             </div>
// // //             <h2>Order Confirmed!</h2>
// // //             <p>Your order has been successfully placed</p>

// // //             <div className="order-number-box">
// // //               <small>Order Number</small>
// // //               {/* ✅ Show real backend number */}
// // //               <h3>{orderNumber}</h3>
// // //             </div>

// // //             <div className="pickup-info">
// // //               <Clock size={16} color="#6b7280" />
// // //               <span>
// // //                 Estimated pickup time <b>{pickupTime}</b>
// // //               </span>
// // //             </div>

// // //             <div className="confirmation-note">
// // //               <span>📩 You’ll receive a confirmation email shortly. Please show your order number when picking up your food.</span>
// // //             </div>

// // //             <button className="continue-btn" onClick={handleContinueOrdering}>
// // //               Continue Ordering
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }

// // // export default Cart;






// // // frontend/src/pages/Cart.js
// // import React, { useContext, useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";
// // import { CartContext } from "../context/CartContext";
// // import api from "../utils/api";
// // import "../styles/Cart.css";
// // import { X, Trash2, CheckCircle2, Clock } from "lucide-react";

// // function Cart({ isOpen, onClose }) {
// //   const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
// //   const { user } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const [promoCode, setPromoCode] = useState("");
// //   const [discount, setDiscount] = useState(0);
// //   const [tip, setTip] = useState(0);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
// //   const [pickupTime, setPickupTime] = useState("15 minutes");
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [orderNumber, setOrderNumber] = useState(""); // ✅ renamed for clarity

// //   const subtotal = cart.reduce(
// //     (acc, c) => acc + (c.item?.price || 0) * (c.quantity || 1),
// //     0
// //   );
// //   const gst = subtotal * 0.05;
// //   const totalPrice = subtotal + gst + tip - discount;

// //   useEffect(() => {
// //     if (cart.length === 0) return;
// //     const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
// //     if (!restaurantId) return;

// //     const fetchRecommended = async () => {
// //       try {
// //         await api.get(`/restaurants/${restaurantId}/menu`);
// //       } catch (err) {
// //         console.error("Error fetching recommended:", err.message);
// //       }
// //     };
// //     fetchRecommended();
// //   }, [cart]);

// //   const handleApplyPromo = () => {
// //     if (promoCode.trim().toLowerCase() === "save10") {
// //       setDiscount(subtotal * 0.1);
// //       alert("🎉 Promo code applied: 10% off!");
// //     } else {
// //       alert("⚠️ Invalid promo code");
// //     }
// //   };

// //   const handleProceedCheckout = () => {
// //     if (!cart.length) return alert("🛒 Your cart is empty!");
// //     if (!user) {
// //       alert("⚠️ Please login first to place an order.");
// //       navigate("/login");
// //       return;
// //     }
// //     setShowCheckoutModal(true);
// //   };

// //   // Existing cash-on-pickup place order
// //   const handlePlaceOrder = async () => {
// //     if (!user || !cart.length) return;

// //     try {
// //       setIsLoading(true);

// //       const restaurantId = cart[0]?.restaurantId || cart[0]?.item?.restaurantId;
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
// //         pickupTime,
// //       });

// //       if (res.status === 201) {
// //         // ✅ Use real backend orderNumber (ORD00001)
// //         const generatedOrderNumber = res.data.orderNumber || "ORD00000";
// //         setOrderNumber(generatedOrderNumber);

// //         // Save locally
// //         const ordersKey = `orders_${user._id}`;
// //         const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
// //         const newOrder = { id: Date.now(), items: cart, totalPrice, status: "Pending" };
// //         localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

// //         clearCart();
// //         localStorage.removeItem("cart");

// //         setShowCheckoutModal(false);
// //         setShowSuccessModal(true);
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

// //   // ====== NEW: Razorpay Online Payment Flow ======
// //   const handlePayment = async () => {
// //     if (!user || !cart.length) {
// //       alert("🛒 Your cart is empty or you're not logged in");
// //       return;
// //     }

// //     try {
// //       setIsLoading(true);

// //       // 1) ask backend to create razorpay order
// //       const createOrderRes = await api.post("/payment/create-order", {
// //         amount: totalPrice, // rupees
// //       });

// //       const razorOrder = createOrderRes.data;
// //       if (!razorOrder || !razorOrder.id) {
// //         throw new Error("Failed to create payment order");
// //       }

// //       // 2) prepare options for Razorpay checkout
// //       const options = {
// //         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
// //         amount: razorOrder.amount,
// //         currency: razorOrder.currency || "INR",
// //         name: "Campus Food Ordering",
// //         description: "Order Payment",
// //         order_id: razorOrder.id,
// //         handler: async function (response) {
// //           try {
// //             // 3) verify payment on backend and persist order
// //             const cartItems = cart.map((c) => ({
// //               name: c.item.name,
// //               price: c.item.price,
// //               quantity: c.quantity,
// //               image: c.item.image,
// //               restaurantId: c.item.restaurantId || c.restaurantId,
// //             }));

// //             const verifyRes = await api.post("/payment/verify-payment", {
// //               order_id: response.razorpay_order_id,
// //               payment_id: response.razorpay_payment_id,
// //               signature: response.razorpay_signature,
// //               cart: cartItems,
// //               userId: user._id,
// //               totalPrice,
// //               restaurantId: cartItems[0]?.restaurantId,
// //               pickupTime,
// //             });

// //             if (verifyRes.data && verifyRes.data.success) {
// //               // clear cart + show success
// //               const generatedOrderNumber = verifyRes.data.orderNumber || "ORD00000";
// //               setOrderNumber(generatedOrderNumber);

// //               // Save locally for quick access
// //               const ordersKey = `orders_${user._id}`;
// //               const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
// //               const newOrder = { id: Date.now(), items: cart, totalPrice, status: "Paid" };
// //               localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

// //               clearCart();
// //               localStorage.removeItem("cart");

// //               setShowCheckoutModal(false);
// //               setShowSuccessModal(true);
// //               alert("✅ Payment successful and order placed!");
// //             } else {
// //               console.error("Payment verification failed:", verifyRes.data);
// //               alert("⚠️ Payment verification failed. Please contact support.");
// //             }
// //           } catch (err) {
// //             console.error("❌ verify error:", err);
// //             alert("❌ Error verifying payment. Please contact support.");
// //           }
// //         },
// //         prefill: {
// //           name: user?.name,
// //           email: user?.email,
// //           contact: user?.phone,
// //         },
// //         theme: {
// //           color: "#FF4B2B",
// //         },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.open();
// //     } catch (err) {
// //       console.error("❌ handlePayment error:", err);
// //       alert("❌ Error initiating payment. Try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleContinueOrdering = () => {
// //     setShowSuccessModal(false);
// //     onClose?.();
// //     navigate("/orders");
// //   };

// //   return (
// //     <>
// //       {/* Overlay */}
// //       <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>

// //       {/* Drawer */}
// //       <div className={`cart-drawer clean ${isOpen ? "open" : ""}`}>
// //         <div className="cart-header clean">
// //           <h3>Your Cart</h3>
// //           <button className="close-btn" onClick={onClose}>
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <p className="cart-subtext">
// //           {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
// //         </p>

// //         <div className="cart-items">
// //           {cart.length === 0 ? (
// //             <p className="empty-cart">Your cart is empty 🍽️</p>
// //           ) : (
// //             cart.map((c, index) => (
// //               <div className="cart-item clean" key={c.item?._id || index}>
// //                 <img src={c.item?.image || "/images/default-food.png"} alt={c.item?.name} />
// //                 <div className="cart-item-info">
// //                   <h4>{c.item?.name}</h4>
// //                   <p>₹{c.item?.price}</p>
// //                   <div className="qty-controller">
// //                     <button onClick={() => updateQuantity(c.item._id, Math.max(1, c.quantity - 1))}>−</button>
// //                     <span>{c.quantity}</span>
// //                     <button onClick={() => updateQuantity(c.item._id, c.quantity + 1)}>+</button>
// //                   </div>
// //                 </div>
// //                 <button className="remove-btn clean" onClick={() => removeFromCart(c.item._id)}>
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

// //             <div className="promo-row">
// //               <input
// //                 type="text"
// //                 placeholder="Enter promo code"
// //                 value={promoCode}
// //                 onChange={(e) => setPromoCode(e.target.value)}
// //               />
// //               <button onClick={handleApplyPromo}>Apply</button>
// //             </div>

// //             <button className="checkout-btn clean" onClick={handleProceedCheckout} disabled={isLoading}>
// //               {isLoading ? "⏳ Processing..." : "Proceed to Checkout"}
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Checkout Modal */}
// //       {showCheckoutModal && (
// //         <div className="checkout-modal-backdrop">
// //           <div className="checkout-modal">
// //             <div className="checkout-header">
// //               <h3>Complete Your Order</h3>
// //               <button onClick={() => setShowCheckoutModal(false)}>
// //                 <X size={20} />
// //               </button>
// //             </div>
// //             <p className="checkout-subtext">Please provide your details to complete the order</p>

// //             <div className="checkout-form">
// //               <label>Full Name</label>
// //               <input type="text" defaultValue={user?.name || ""} placeholder="John Doe" />
// //               <label>Email</label>
// //               <input type="email" value={user?.email || ""} disabled placeholder="john@university.edu" />
// //               <label>Pickup Time</label>
// //               <div className="pickup-options">
// //                 {["15 minutes", "30 minutes", "45 minutes", "1 hour"].map((t) => (
// //                   <label key={t}>
// //                     <input type="radio" name="pickup" checked={pickupTime === t} onChange={() => setPickupTime(t)} />
// //                     {t}
// //                   </label>
// //                 ))}
// //               </div>

// //               <div className="total-row">
// //                 <span>Total Amount</span>
// //                 <span className="price">₹{totalPrice.toFixed(2)}</span>
// //               </div>

// //               <p className="note">💳 Choose payment method</p>

// //               <div className="checkout-actions">
// //                 <button className="cancel" onClick={() => setShowCheckoutModal(false)}>
// //                   Cancel
// //                 </button>

// //                 {/* Cash-on-pickup */}
// //                 <button className="confirm" onClick={handlePlaceOrder} disabled={isLoading}>
// //                   {isLoading ? "Placing..." : "Place Order (Cash Pickup)"}
// //                 </button>

// //                 {/* Online payment */}
// //                 <button className="confirm" onClick={handlePayment} disabled={isLoading} style={{ marginLeft: 8 }}>
// //                   {isLoading ? "Processing..." : "Pay Now (Online)"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ✅ Success Modal */}
// //       {showSuccessModal && (
// //         <div className="success-modal-backdrop">
// //           <div className="success-modal">
// //             <div className="success-icon">
// //               <CheckCircle2 size={60} color="#22c55e" strokeWidth={2.5} />
// //             </div>
// //             <h2>Order Confirmed!</h2>
// //             <p>Your order has been successfully placed</p>

// //             <div className="order-number-box">
// //               <small>Order Number</small>
// //               {/* ✅ Show real backend number */}
// //               <h3>{orderNumber}</h3>
// //             </div>

// //             <div className="pickup-info">
// //               <Clock size={16} color="#6b7280" />
// //               <span>
// //                 Estimated pickup time <b>{pickupTime}</b>
// //               </span>
// //             </div>

// //             <div className="confirmation-note">
// //               <span>📩 You’ll receive a confirmation email shortly. Please show your order number when picking up your food.</span>
// //             </div>

// //             <button className="continue-btn" onClick={handleContinueOrdering}>
// //               Continue Ordering
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default Cart;


// // frontend/src/pages/Cart.js
// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import api from "../utils/api";
// import "../styles/Cart.css";
// import { X, Trash2, CheckCircle2, Clock } from "lucide-react";

// function Cart({ isOpen, onClose }) {
//   const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [promoCode, setPromoCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [tip, setTip] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
//   const [pickupTime, setPickupTime] = useState("15 minutes");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [orderNumber, setOrderNumber] = useState("");

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

//   // ============================
//   // Cash-on-Pickup Place Order
//   // ============================
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
//         const generatedOrderNumber = res.data.orderNumber || "ORD00000";
//         setOrderNumber(generatedOrderNumber);

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

//   // ============================
//   // Razorpay Online Payment
//   // ============================
//   const handlePayment = async () => {
//     if (!user || !cart.length) {
//       alert("🛒 Your cart is empty or you're not logged in");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       const createOrderRes = await api.post("/payment/create-order", {
//         amount: totalPrice,
//       });

//       const razorOrder = createOrderRes.data;
//       if (!razorOrder || !razorOrder.id) {
//         throw new Error("Failed to create payment order");
//       }

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: razorOrder.amount,
//         currency: razorOrder.currency || "INR",
//         name: "Campus Food Ordering",
//         description: "Order Payment",
//         order_id: razorOrder.id,

//         handler: async function (response) {
//           try {
//             const cartItems = cart.map((c) => ({
//               name: c.item.name,
//               price: c.item.price,
//               quantity: c.quantity,
//               image: c.item.image,
//               restaurantId: c.item.restaurantId || c.restaurantId,
//             }));

//             const verifyRes = await api.post("/payment/verify-payment", {
//               order_id: response.razorpay_order_id,
//               payment_id: response.razorpay_payment_id,
//               signature: response.razorpay_signature,
//               cart: cartItems,
//               userId: user._id,
//               totalPrice,
//               restaurantId: cartItems[0]?.restaurantId,
//               pickupTime,
//             });

//             if (verifyRes.data && verifyRes.data.success) {
//               const generatedOrderNumber = verifyRes.data.orderNumber || "ORD00000";
//               setOrderNumber(generatedOrderNumber);

//               const ordersKey = `orders_${user._id}`;
//               const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
//               const newOrder = { id: Date.now(), items: cart, totalPrice, status: "Paid" };
//               localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

//               clearCart();
//               localStorage.removeItem("cart");

//               setShowCheckoutModal(false);
//               setShowSuccessModal(true);
//             } else {
//               alert("⚠️ Payment verification failed.");
//             }
//           } catch (err) {
//             alert("❌ Error verifying payment.");
//             console.error(err);
//           }
//         },

//         prefill: {
//           name: user?.name,
//           email: user?.email,
//           contact: user?.phone,
//         },
//         theme: {
//           color: "#6366f1",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("❌ handlePayment error:", err);
//       alert("❌ Error initiating payment. Try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleContinueOrdering = () => {
//     setShowSuccessModal(false);
//     onClose?.();
//     navigate("/orders");
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

//               {/* NEW PAYMENT SECTION */}
//               <p className="note">💳 Choose payment method</p>

//               <div
//                 className="checkout-actions"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "12px",
//                   marginTop: "10px",
//                 }}
//               >

//                 {/* ONLINE PAYMENT */}
//                 <button
//                   className="confirm"
//                   onClick={handlePayment}
//                   disabled={isLoading}
//                   style={{
//                     background: "#6366f1",
//                     color: "white",
//                     borderRadius: "8px",
//                     padding: "10px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {isLoading ? "Processing Payment..." : "Pay Online (Razorpay)"}
//                 </button>

//                 {/* CASH PICKUP */}
//                 <button
//                   className="confirm"
//                   onClick={handlePlaceOrder}
//                   disabled={isLoading}
//                   style={{
//                     background: "#4b5563",
//                     color: "white",
//                     borderRadius: "8px",
//                     padding: "10px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {isLoading ? "Placing..." : "Pay at Pickup (Cash)"}
//                 </button>

//                 {/* CANCEL */}
//                 <button
//                   className="cancel"
//                   onClick={() => setShowCheckoutModal(false)}
//                   style={{ marginTop: "5px" }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
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
//               <h3>{orderNumber}</h3>
//             </div>

//             <div className="pickup-info">
//               <Clock size={16} color="#6b7280" />
//               <span>
//                 Estimated pickup time <b>{pickupTime}</b>
//               </span>
//             </div>

//             <div className="confirmation-note">
//               <span>
//                 📩 You’ll receive a confirmation email shortly. Please show your order number when picking up your food.
//               </span>
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






// frontend/src/pages/Cart.js
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online"); // "online" or "cash"

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

  // ============================
  // Cash-on-Pickup Place Order
  // ============================
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
        restaurantId: c.item.restaurantId || c.restaurantId,
      }));

      const res = await api.post("/orders", {
        items: orderItems,
        totalPrice,
        restaurantId,
      });

      if (res.status === 201) {
        const generatedOrderNumber = res.data.orderNumber || "ORD00000";
        setOrderNumber(generatedOrderNumber);

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

  // ============================
  // Razorpay Online Payment
  // ============================
  const handlePayment = async () => {
    if (!user || !cart.length) {
      alert("🛒 Your cart is empty or you're not logged in");
      return;
    }

    try {
      setIsLoading(true);

      const createOrderRes = await api.post("/payment/create-order", {
        amount: totalPrice,
      });

      const razorOrder = createOrderRes.data;
      if (!razorOrder || !razorOrder.id) {
        throw new Error("Failed to create payment order");
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: razorOrder.amount,
        currency: razorOrder.currency || "INR",
        name: "Campus Food Ordering",
        description: "Order Payment",
        order_id: razorOrder.id,

        handler: async function (response) {
          try {
            const cartItems = cart.map((c) => ({
              name: c.item.name,
              price: c.item.price,
              quantity: c.quantity,
              image: c.item.image,
              restaurantId: c.item.restaurantId || c.restaurantId,
            }));

            const verifyRes = await api.post("/payment/verify-payment", {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              cart: cartItems,
              userId: user._id,
              totalPrice,
              restaurantId: cartItems[0]?.restaurantId,
            });

            if (verifyRes.data && verifyRes.data.success) {
              const generatedOrderNumber = verifyRes.data.orderNumber || "ORD00000";
              setOrderNumber(generatedOrderNumber);

              const ordersKey = `orders_${user._id}`;
              const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
              const newOrder = { id: Date.now(), items: cart, totalPrice, status: "Paid" };
              localStorage.setItem(ordersKey, JSON.stringify([...existingOrders, newOrder]));

              clearCart();
              localStorage.removeItem("cart");

              setShowCheckoutModal(false);
              setShowSuccessModal(true);
            } else {
              alert("⚠️ Payment verification failed.");
            }
          } catch (err) {
            alert("❌ Error verifying payment.");
            console.error(err);
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        theme: {
          color: "#7c3aed", // Razorpay theme color tuned to your brand purple
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ handlePayment error:", err);
      alert("❌ Error initiating payment. Try again.");
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
              <div className="total-row">
                <span>Total Amount</span>
                <span className="price">₹{totalPrice.toFixed(2)}</span>
              </div>

              {/* ======= Segmented Control (iOS-style) ======= */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "14px 0",
                }}
              >
                <div
                  role="tablist"
                  aria-label="Payment method"
                  style={{
                    display: "inline-flex",
                    borderRadius: 12,
                    padding: 4,
                    background: "transparent",
                    border: "1px solid rgba(124,58,237,0.18)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
                  }}
                >
                  <button
                    onClick={() => setPaymentMethod("online")}
                    aria-pressed={paymentMethod === "online"}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      background: paymentMethod === "online" ? "#7c3aed" : "transparent",
                      color: paymentMethod === "online" ? "#fff" : "#c7c7d9",
                      fontWeight: 700,
                      minWidth: 160,
                    }}
                  >
                    Online Payment
                  </button>

                  <button
                    onClick={() => setPaymentMethod("cash")}
                    aria-pressed={paymentMethod === "cash"}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 10,
                      border: "none",
                      cursor: "pointer",
                      background: paymentMethod === "cash" ? "#7c3aed" : "transparent",
                      color: paymentMethod === "cash" ? "#fff" : "#c7c7d9",
                      fontWeight: 700,
                      minWidth: 160,
                    }}
                  >
                    Pay at Counter
                  </button>
                </div>
              </div>

              {/* ONLINE PAYMENT: Icons + Pay Now */}
              {paymentMethod === "online" && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 12,
                      alignItems: "center",
                      marginBottom: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Logos: external sources are used for convenience */}
                    <img
                      alt="UPI"
                      src="https://upload.wikimedia.org/wikipedia/commons/8/82/UPI_logo.svg"
                      width="52"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    <img
                      alt="Visa"
                      src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                      width="52"
                      style={{ background: "transparent" }}
                    />
                    <img
                      alt="Mastercard"
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                      width="52"
                      style={{ background: "transparent" }}
                    />
                  </div>

                  <button
                    className="confirm"
                    onClick={handlePayment}
                    disabled={isLoading}
                    style={{
                      background: "#7c3aed",
                      color: "white",
                      borderRadius: 10,
                      padding: "12px",
                      width: "100%",
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 8,
                    }}
                  >
                    {isLoading ? "Processing Payment..." : "Pay Now (UPI / Card)"}
                  </button>
                </>
              )}

              {/* CASH PICKUP */}
              {paymentMethod === "cash" && (
                <>
                  <button
                    className="confirm"
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    style={{
                      background: "#4b5563",
                      color: "white",
                      borderRadius: 10,
                      padding: "12px",
                      width: "100%",
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 8,
                    }}
                  >
                    {isLoading ? "Placing..." : "Confirm Order (Pay at Counter)"}
                  </button>
                </>
              )}

              {/* CANCEL */}
              <button
                className="cancel"
                onClick={() => setShowCheckoutModal(false)}
                style={{ marginTop: 6 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
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
              <h3>{orderNumber}</h3>
            </div>
            <div className="confirmation-note">
              <span>
                📩 You’ll receive a confirmation email shortly. Please show your order number when picking up your food.
              </span>
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
