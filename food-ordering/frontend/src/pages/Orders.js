// // // // frontend/src/pages/Orders.js
// // // import { useEffect, useState, useContext } from "react";
// // // import { motion } from "framer-motion";
// // // import api from "../utils/api";
// // // import { AuthContext } from "../context/AuthContext";
// // // import { io } from "socket.io-client";
// // // import "../styles/Orders.css";

// // // function Orders() {
// // //   const [orders, setOrders] = useState([]);
// // //   const { user } = useContext(AuthContext);

// // //   useEffect(() => {
// // //     if (!user) return;

// // //     const fetchOrders = async () => {
// // //       try {
// // //         const res = await api.get("/orders/myorders");
// // //         setOrders(res.data);
// // //         localStorage.setItem(`orders_${user._id}`, JSON.stringify(res.data));
// // //       } catch (err) {
// // //         console.error("Backend error, fallback:", err);
// // //         const savedOrders =
// // //           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
// // //         setOrders(savedOrders);
// // //       }
// // //     };

// // //     fetchOrders();

// // //     // 🔌 Real-time updates
// // //     const socket = io("http://localhost:5000");
// // //     socket.emit("joinRoom", user._id);
// // //     console.log("📡 Joined room:", user._id);

// // //     socket.on("orderUpdated", (updatedOrder) => {
// // //       if (
// // //         updatedOrder.user &&
// // //         (updatedOrder.user._id === user._id || updatedOrder.user === user._id)
// // //       ) {
// // //         setOrders((prev) =>
// // //           prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// // //         );
// // //       }
// // //     });

// // //     return () => {
// // //       socket.emit("leaveRoom", user._id);
// // //       socket.disconnect();
// // //     };
// // //   }, [user]);

// // //   return (
// // //     <div className="orders-container">
// // //       <div className="header-bar">
// // //         <h2>📦 My Orders</h2>
// // //         <div className="orders-summary">
// // //           <span>✅ Completed: {orders.filter(o => o.status === "Completed").length}</span>
// // //           <span>🕓 Pending: {orders.filter(o => o.status === "Pending").length}</span>
// // //           <span>❌ Cancelled: {orders.filter(o => o.status === "Cancelled").length}</span>
// // //         </div>
// // //       </div>

// // //       {orders.length === 0 ? (
// // //         <p className="no-orders">No orders placed yet.</p>
// // //       ) : (
// // //         <div className="orders-grid">
// // //           {orders.map((order) => (
// // //             <motion.div
// // //               key={order._id}
// // //               className={`order-card ${order.status?.toLowerCase() || "pending"}`}
// // //               initial={{ opacity: 0, y: 10 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               transition={{ duration: 0.4 }}
// // //             >
// // //               <div className="order-status-tag">
// // //                 {order.status || "Pending"}
// // //               </div>

// // //               {/* Order Header */}
// // //               <div className="order-header">
// // //                 <h3>Order #{order._id?.slice(-6)}</h3>
// // //                 <p className="order-username">
// // //                   👤 {user?.name || user?.email || "User"}
// // //                 </p>
// // //               </div>

// // //               {/* Meta Info */}
// // //               <div className="order-meta">
// // //                 <p className="order-date">
// // //                   📅 {new Date(order.createdAt).toLocaleString()}
// // //                 </p>
// // //               </div>

// // //               {/* Order Items */}
// // //               <div className="order-body">
// // //                 <h4>🛍️ Ordered Items</h4>
// // //                 <ul>
// // //                   {order.items?.map((item, i) => (
// // //                     <li key={i}>
// // //                       <span className="item-name">{item.name}</span>
// // //                       <span className="item-qty">× {item.quantity}</span>
// // //                       <span className="item-price">
// // //                         ₹{item.price * item.quantity}
// // //                       </span>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               </div>

// // //               {/* Total */}
// // //               <div className="order-footer">
// // //                 <h4>
// // //                   Total Amount:{" "}
// // //                   <span className="order-total">
// // //                     ₹{order.totalPrice || order.total}
// // //                   </span>
// // //                 </h4>
// // //               </div>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Orders;











// // import { useEffect, useState, useContext } from "react";
// // import { motion } from "framer-motion";
// // import api from "../utils/api";
// // import { AuthContext } from "../context/AuthContext";
// // import { io } from "socket.io-client";
// // import "../styles/Orders.css";

// // function Orders() {
// //   const [orders, setOrders] = useState([]);
// //   const [filter, setFilter] = useState("All");
// //   const { user } = useContext(AuthContext);

// //   // ✅ Fetch orders
// //   useEffect(() => {
// //     if (!user) return;

// //     const fetchOrders = async () => {
// //       try {
// //         const res = await api.get("/orders/myorders");
// //         setOrders(res.data);
// //         localStorage.setItem(`orders_${user._id}`, JSON.stringify(res.data));
// //       } catch (err) {
// //         console.error("Backend error, fallback:", err);
// //         const saved =
// //           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
// //         setOrders(saved);
// //       }
// //     };

// //     fetchOrders();

// //     // 🔌 Real-time tracking
// //     const socket = io("http://localhost:5000");
// //     socket.emit("joinRoom", user._id);

// //     socket.on("orderUpdated", (updatedOrder) => {
// //       if (
// //         updatedOrder.user &&
// //         (updatedOrder.user._id === user._id || updatedOrder.user === user._id)
// //       ) {
// //         setOrders((prev) =>
// //           prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// //         );
// //       }
// //     });

// //     return () => {
// //       socket.emit("leaveRoom", user._id);
// //       socket.disconnect();
// //     };
// //   }, [user]);

// //   // ✅ Filter Orders
// //   const filteredOrders =
// //     filter === "All" ? orders : orders.filter((o) => o.status === filter);

// //   // ✅ Summary Analytics
// //   const totalSpent = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
// //   const totalCompleted = orders.filter((o) => o.status === "Delivered").length;

// //   return (
// //     <div className="orders-container">
// //       {/* 🧩 Header */}
// //       <motion.div
// //         className="orders-header"
// //         initial={{ opacity: 0, y: -15 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.4 }}
// //       >
// //         <h2>📦 My Orders</h2>
// //         <div className="header-actions">
// //           <select
// //             className="filter-select"
// //             value={filter}
// //             onChange={(e) => setFilter(e.target.value)}
// //           >
// //             <option value="All">All</option>
// //             <option value="Pending">Pending</option>
// //             <option value="Preparing">Preparing</option>
// //             <option value="On the Way">On the Way</option>
// //             <option value="Delivered">Delivered</option>
// //             <option value="Cancelled">Cancelled</option>
// //           </select>
// //         </div>
// //       </motion.div>

// //       {/* 📊 Summary */}
// //       <motion.div
// //         className="orders-summary"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 0.3 }}
// //       >
// //         <div className="summary-card">✅ Completed: {totalCompleted}</div>
// //         <div className="summary-card">💰 Total Spent: ₹{totalSpent}</div>
// //         <div className="summary-card">
// //           🕓 Active Orders: {orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length}
// //         </div>
// //       </motion.div>

// //       {/* 📦 Orders List */}
// //       {filteredOrders.length === 0 ? (
// //         <motion.p
// //           className="no-orders"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //         >
// //           🍽️ No {filter.toLowerCase()} orders found.
// //         </motion.p>
// //       ) : (
// //         <div className="orders-grid">
// //           {filteredOrders.map((order) => (
// //             <motion.div
// //               key={order._id}
// //               className={`order-card ${order.status?.toLowerCase().replace(/\s/g, "-")}`}
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               whileHover={{ scale: 1.02 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               {/* Status Tag */}
// //               <div className={`order-status-tag ${order.status?.toLowerCase()}`}>
// //                 {order.status || "Pending"}
// //               </div>

// //               {/* Header Info */}
// //               <div className="order-header">
// //                 <h3>Order #{order._id?.slice(-6)}</h3>
// //                 <p className="order-date">
// //                   📅 {new Date(order.createdAt).toLocaleString()}
// //                 </p>
// //               </div>

// //               {/* Restaurant Info */}
// //               {order.restaurant && (
// //                 <div className="restaurant-info">
// //                   <img
// //                     src={order.restaurant.logo || "/images/default-restaurant.png"}
// //                     alt="Restaurant Logo"
// //                     className="restaurant-logo"
// //                   />
// //                   <p className="restaurant-name">{order.restaurant.name}</p>
// //                 </div>
// //               )}

// //               {/* Items */}
// //               <div className="order-body">
// //                 <h4>🛍️ Ordered Items</h4>
// //                 <ul>
// //                   {order.items?.map((item, i) => (
// //                     <li key={i} className="order-item">
// //                       <div className="item-left">
// //                         <img
// //                           src={item.image || "/images/default-food.png"}
// //                           alt={item.name}
// //                           className="item-thumb"
// //                         />
// //                         <span>{item.name}</span>
// //                       </div>
// //                       <div className="item-right">
// //                         <span>× {item.quantity}</span>
// //                         <span>₹{item.price * item.quantity}</span>
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>

// //               {/* Total + Actions */}
// //               <div className="order-footer">
// //                 <h4>
// //                   Total: <span className="order-total">₹{order.totalPrice || order.total}</span>
// //                 </h4>
// //                 <div className="order-actions">
// //                   <button className="btn reorder">🔁 Reorder</button>
// //                   <button className="btn rate">⭐ Rate</button>
// //                   <button className="btn invoice">💸 Invoice</button>
// //                   {order.status === "Pending" && (
// //                     <button className="btn cancel">❌ Cancel</button>
// //                   )}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Orders;









// import { useEffect, useState, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import "../styles/Orders.css";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const { user } = useContext(AuthContext);
//   const { addToCart, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   // ⭐ Modals
//   const [showRateModal, setShowRateModal] = useState(false);
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [invoiceData, setInvoiceData] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");

//   useEffect(() => {
//     if (!user) return;

//     const fetchOrders = async () => {
//       try {
//         const res = await api.get("/orders/myorders");
//         setOrders(res.data);
//         localStorage.setItem(`orders_${user._id}`, JSON.stringify(res.data));
//       } catch (err) {
//         console.error("Backend error, fallback:", err);
//         const saved =
//           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
//         setOrders(saved);
//       }
//     };

//     fetchOrders();

//     const socket = io("http://localhost:5000");
//     socket.emit("joinRoom", user._id);

//     socket.on("orderUpdated", (updatedOrder) => {
//       if (
//         updatedOrder.user &&
//         (updatedOrder.user._id === user._id || updatedOrder.user === user._id)
//       ) {
//         setOrders((prev) =>
//           prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
//         );
//       }
//     });

//     return () => {
//       socket.emit("leaveRoom", user._id);
//       socket.disconnect();
//     };
//   }, [user]);

//   // 🛒 Reorder
//   const handleReorder = (order) => {
//     if (!order || !order.items?.length) return alert("No items to reorder.");
//     if (!order.restaurant?._id)
//       return alert("Missing restaurant info for this order.");

//     const confirmReorder = window.confirm(
//       `Reorder items from ${order.restaurant.name}?`
//     );
//     if (!confirmReorder) return;

//     clearCart();

//     order.items.forEach((item) => {
//       addToCart(
//         {
//           _id: item._id,
//           name: item.name,
//           price: item.price,
//           image: item.image,
//         },
//         order.restaurant._id
//       );
//     });

//     alert("✅ Items added to cart!");
//     navigate("/cart");
//   };

//   // ⭐ Open Rating Modal
//   const openRateModal = (order) => {
//     setSelectedOrder(order);
//     setShowRateModal(true);
//     setRating(order.rating || 0);
//     setReview(order.review || "");
//   };

//   // ⭐ Submit Rating
//   const submitRating = async () => {
//     if (!selectedOrder) return;
//     if (rating === 0) return alert("Please select a rating first!");

//     try {
//       await api.post(`/orders/${selectedOrder._id}/rate`, { rating, review });

//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === selectedOrder._id ? { ...o, rating, review } : o
//         )
//       );
//       alert("⭐ Thanks for your feedback!");
//     } catch (err) {
//       console.error("Error submitting rating:", err);
//       alert("Error saving rating. Try again later.");
//     }

//     setShowRateModal(false);
//     setSelectedOrder(null);
//     setRating(0);
//     setReview("");
//   };

//   // 💸 Invoice Modal
//   const openInvoiceModal = async (orderId) => {
//     try {
//       const res = await api.get(`/orders/${orderId}/invoice`);
//       setInvoiceData(res.data);
//       setShowInvoiceModal(true);
//     } catch (err) {
//       console.error("Invoice fetch error:", err);
//       alert("Failed to load invoice.");
//     }
//   };

//   const filteredOrders =
//     filter === "All" ? orders : orders.filter((o) => o.status === filter);

//   const totalSpent = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
//   const totalCompleted = orders.filter((o) => o.status === "Delivered").length;

//   return (
//     <div className="orders-container">
//       {/* Header */}
//       <motion.div
//         className="orders-header"
//         initial={{ opacity: 0, y: -15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <h2>📦 My Orders</h2>
//         <div className="header-actions">
//           <select
//             className="filter-select"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="Pending">Pending</option>
//             <option value="Preparing">Preparing</option>
//             <option value="On the Way">On the Way</option>
//             <option value="Delivered">Delivered</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </div>
//       </motion.div>

//       {/* Summary */}
//       <motion.div
//         className="orders-summary"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         <div className="summary-card">✅ Completed: {totalCompleted}</div>
//         <div className="summary-card">💰 Total Spent: ₹{totalSpent}</div>
//         <div className="summary-card">
//           🕓 Active Orders:{" "}
//           {
//             orders.filter(
//               (o) => o.status !== "Delivered" && o.status !== "Cancelled"
//             ).length
//           }
//         </div>
//       </motion.div>

//       {/* Orders */}
//       {filteredOrders.length === 0 ? (
//         <motion.p className="no-orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           🍽️ No {filter.toLowerCase()} orders found.
//         </motion.p>
//       ) : (
//         <div className="orders-grid">
//           {filteredOrders.map((order) => (
//             <motion.div
//               key={order._id}
//               className={`order-card ${order.status?.toLowerCase()?.replace(/\s/g, "-")}`}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className={`order-status-tag ${order.status?.toLowerCase()}`}>
//                 {order.status || "Pending"}
//               </div>

//               <div className="order-header">
//                 <h3>Order #{order._id?.slice(-6)}</h3>
//                 <p className="order-date">
//                   📅 {new Date(order.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               {order.restaurant && (
//                 <div className="restaurant-info">
//                   <img
//                     src={order.restaurant.logo || "/images/default-restaurant.png"}
//                     alt="Restaurant Logo"
//                     className="restaurant-logo"
//                   />
//                   <p className="restaurant-name">{order.restaurant.name}</p>
//                 </div>
//               )}

//               <div className="order-body">
//                 <h4>🛍️ Ordered Items</h4>
//                 <ul>
//                   {order.items?.map((item, i) => (
//                     <li key={i} className="order-item">
//                       <div className="item-left">
//                         <img
//                           src={item.image || "/images/default-food.png"}
//                           alt={item.name}
//                           className="item-thumb"
//                         />
//                         <span>{item.name}</span>
//                       </div>
//                       <div className="item-right">
//                         <span>× {item.quantity}</span>
//                         <span>₹{item.price * item.quantity}</span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="order-footer">
//                 <h4>
//                   Total: <span className="order-total">₹{order.totalPrice || order.total}</span>
//                 </h4>
//                 <div className="order-actions">
//                   <button className="btn reorder" onClick={() => handleReorder(order)}>
//                     🔁 Reorder
//                   </button>
//                   <button className="btn rate" onClick={() => openRateModal(order)}>
//                     ⭐ Rate
//                   </button>
//                   <button className="btn invoice" onClick={() => openInvoiceModal(order._id)}>
//                     💸 Invoice
//                   </button>
//                   {order.status === "Pending" && (
//                     <button className="btn cancel">❌ Cancel</button>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {/* ⭐ Rating Modal */}
//       <AnimatePresence>
//         {showRateModal && (
//           <motion.div
//             className="modal-backdrop"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="rate-modal"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.8 }}
//               transition={{ duration: 0.2 }}
//             >
//               <h3>Rate Your Order</h3>
//               <div className="stars">
//                 {[1, 2, 3, 4, 5].map((s) => (
//                   <span
//                     key={s}
//                     onClick={() => setRating(s)}
//                     className={s <= rating ? "filled" : ""}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <textarea
//                 value={review}
//                 onChange={(e) => setReview(e.target.value)}
//                 placeholder="Write your feedback..."
//               />
//               <div className="modal-actions">
//                 <button onClick={submitRating} className="btn confirm">
//                   Submit
//                 </button>
//                 <button
//                   onClick={() => setShowRateModal(false)}
//                   className="btn cancel"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 💸 Invoice Modal */}
//       <AnimatePresence>
//         {showInvoiceModal && invoiceData && (
//           <motion.div
//             className="invoice-modal-backdrop"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="invoice-modal"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               transition={{ duration: 0.2 }}
//             >
//               <h3>🧾 Invoice</h3>

//               <div className="invoice-details">
//                 <p><b>User:</b> {user?.name || "N/A"}</p>
//               </div>

//               <div className="invoice-center">
//                 <h4>{invoiceData.restaurant?.name}</h4>
//                 <p>Order ID: {invoiceData.orderId}</p>
//               </div>

//               <p className="invoice-date">
//                 Date: {new Date(invoiceData.date).toLocaleString()}
//               </p>

//               <hr />

//               <div className="invoice-items">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Item</th>
//                       <th>Qty</th>
//                       <th>Price</th>
//                       <th>Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {invoiceData.items.map((i, idx) => (
//                       <tr key={idx}>
//                         <td>{i.name}</td>
//                         <td>{i.quantity}</td>
//                         <td>₹{i.price}</td>
//                         <td>₹{i.total}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <h4 className="invoice-total">Total Amount: ₹{invoiceData.totalPrice}</h4>

//               <div className="invoice-modal-actions">
//                 <button onClick={() => setShowInvoiceModal(false)} className="btn-close">
//                   Close
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default Orders;








import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const { user } = useContext(AuthContext);
  const { addToCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Modals
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Live timer
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/myorders");
        setOrders(res.data);
        localStorage.setItem(`orders_${user._id}`, JSON.stringify(res.data));
      } catch (err) {
        console.error("Backend error, fallback:", err);
        const saved =
          JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
        setOrders(saved);
      }
    };

    fetchOrders();

    // Real-time updates via socket
    const socket = io("http://localhost:5000");
    socket.emit("joinRoom", user._id);

    socket.on("orderUpdated", (updatedOrder) => {
      if (
        updatedOrder.user &&
        (updatedOrder.user._id === user._id || updatedOrder.user === user._id)
      ) {
        setOrders((prev) =>
          prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
        );
      }
    });

    return () => {
      socket.emit("leaveRoom", user._id);
      socket.disconnect();
    };
  }, [user]);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = {};
      orders.forEach((o) => {
        if (o.status === "Pending") {
          const diff =
            2 * 60 * 1000 - (Date.now() - new Date(o.createdAt).getTime());
          newTimes[o._id] = diff > 0 ? diff : 0;
        }
      });
      setTimeLeft(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  const formatTime = (ms) => {
    if (!ms || ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const canCancel = (order) => {
    if (order.status !== "Pending") return false;
    const diff =
      2 * 60 * 1000 - (Date.now() - new Date(order.createdAt).getTime());
    return diff > 0;
  };

  // 🛒 Reorder Modal
  const openReorderModal = (order) => {
    setSelectedOrder(order);
    setShowReorderModal(true);
  };

  const confirmReorder = (order) => {
    if (!order || !order.items?.length) return;
    clearCart();
    order.items.forEach((item) => {
      addToCart(
        {
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
        },
        order.restaurant._id
      );
    });
    setShowReorderModal(false);
    navigate("/cart");
  };

  // ❌ Cancel Order
  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "Cancelled" } : o
        )
      );
      setShowCancelModal(false);
    } catch (err) {
      console.error("Cancel order error:", err);
      alert("Failed to cancel order. Try again later.");
    }
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="orders-container">
      {/* Header */}
      <div className="orders-header">
        <h2>📦 My Orders</h2>
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Grid */}
      <div className="orders-grid">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">No orders yet 😋</p>
        ) : (
          filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              className={`order-card ${order.status?.toLowerCase()}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className={`order-status-tag ${order.status?.toLowerCase()}`}
              >
                {order.status}
              </span>

              <div className="order-header">
                <h3>Order #{order._id.slice(-6)}</h3>
                <p className="order-date">
                  📅 {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="restaurant-info">
                <img
                  src={
                    order.restaurant?.logo || "/images/default-restaurant.png"
                  }
                  alt="Restaurant"
                  className="restaurant-logo"
                />
                <p className="restaurant-name">{order.restaurant?.name}</p>
              </div>

              <div className="order-footer">
                <h4>
                  Total:{" "}
                  <span className="order-total">
                    ₹{order.totalPrice || order.total}
                  </span>
                </h4>
                <div className="order-actions">
                  <button
                    className="btn reorder"
                    onClick={() => openReorderModal(order)}
                  >
                    🔁 Reorder
                  </button>

                  <button
                    className="btn invoice"
                    onClick={() => navigate(`/invoice/${order._id}`)}
                  >
                    💸 Invoice
                  </button>

                  {canCancel(order) && (
                    <div className="cancel-with-timer">
                      <button
                        className="btn cancel"
                        onClick={() => openCancelModal(order)}
                      >
                        ❌ Cancel
                      </button>
                      <span className="cancel-timer">
                        ⏳ {formatTime(timeLeft[order._id])}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && selectedOrder && (
          <motion.div
            className="confirm-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="confirm-modal"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3>❌ Cancel Order</h3>
              <p>
                Are you sure you want to cancel order #
                {selectedOrder._id?.slice(-6)}?
              </p>
              <div className="confirm-actions">
                <button
                  className="btn confirm"
                  onClick={() => confirmCancelOrder(selectedOrder._id)}
                >
                  Confirm
                </button>
                <button
                  className="btn cancel"
                  onClick={() => setShowCancelModal(false)}
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reorder Modal */}
      <AnimatePresence>
        {showReorderModal && selectedOrder && (
          <motion.div
            className="confirm-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="confirm-modal"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3>🛒 Reorder Items</h3>
              <p>
                Reorder from{" "}
                <strong>{selectedOrder.restaurant?.name}</strong>?
              </p>
              <div className="confirm-actions">
                <button
                  className="btn confirm"
                  onClick={() => confirmReorder(selectedOrder)}
                >
                  Confirm
                </button>
                <button
                  className="btn cancel"
                  onClick={() => setShowReorderModal(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Orders;
