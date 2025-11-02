// // // // // import React, { useEffect, useState } from "react";
// // // // // import api from "../utils/api";
// // // // // import "../styles/RestaurantOrders.css"; // ✅ import CSS

// // // // // function RestaurantOrders() {
// // // // //   const [orders, setOrders] = useState([]);

// // // // //   useEffect(() => {
// // // // //     fetchOrders();
// // // // //   }, []);

// // // // //   const fetchOrders = async () => {
// // // // //     try {
// // // // //       const res = await api.get("/orders/restaurant");
// // // // //       setOrders(res.data);
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching orders", err);
// // // // //     }
// // // // //   };

// // // // //   const stages = ["Pending", "Preparing", "Ready", "Delivered"];

// // // // //   const updateStatus = async (orderId, currentStatus) => {
// // // // //     const currentIndex = stages.indexOf(currentStatus);
// // // // //     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

// // // // //     const nextStatus = stages[currentIndex + 1];

// // // // //     try {
// // // // //       await api.put(`/orders/${orderId}/status`, { status: nextStatus });
// // // // //       setOrders((prev) =>
// // // // //         prev.map((o) =>
// // // // //           o._id === orderId ? { ...o, status: nextStatus } : o
// // // // //         )
// // // // //       );
// // // // //     } catch (err) {
// // // // //       console.error("Error updating order status", err);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="orders-page">
// // // // //       <h2 className="orders-title">📦 Incoming Orders</h2>

// // // // //       <div className="orders-grid">
// // // // //         {orders.map((order) => (
// // // // //           <div key={order._id} className="order-card">
// // // // //             <p>
// // // // //               <strong>User:</strong> {order.user?.name || "Unknown"}
// // // // //             </p>
// // // // //             <p>
// // // // //               <strong>Items:</strong>{" "}
// // // // //               {order.items
// // // // //                 .map((item) => `${item.name} x${item.quantity}`)
// // // // //                 .join(", ")}
// // // // //             </p>
// // // // //             <p>
// // // // //               <strong>Total:</strong> ₹{order.totalPrice}
// // // // //             </p>

// // // // //             <div className="order-footer">
// // // // //               <span className={`status-badge status-${order.status.toLowerCase()}`}>
// // // // //                 {order.status}
// // // // //               </span>

// // // // //               {order.status !== "Delivered" && (
// // // // //                 <button
// // // // //                   onClick={() => updateStatus(order._id, order.status)}
// // // // //                   className="next-btn"
// // // // //                 >
// // // // //                   Next ➡
// // // // //                 </button>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default RestaurantOrders;







// // // // import React, { useEffect, useState } from "react";
// // // // import api from "../utils/api";
// // // // import { io } from "socket.io-client";
// // // // import "../styles/RestaurantOrders.css";

// // // // function RestaurantOrders() {
// // // //   const [orders, setOrders] = useState([]);

// // // //   useEffect(() => {
// // // //     fetchOrders();

// // // //     // ✅ Setup socket listener
// // // //     const socket = io("http://localhost:5000");

// // // //     socket.on("orderPlaced", (newOrder) => {
// // // //       setOrders((prev) => [newOrder, ...prev]);
// // // //     });

// // // //     socket.on("orderUpdated", (updatedOrder) => {
// // // //       setOrders((prev) =>
// // // //         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// // // //       );
// // // //     });

// // // //     return () => {
// // // //       socket.disconnect();
// // // //     };
// // // //   }, []);

// // // //   const fetchOrders = async () => {
// // // //     try {
// // // //       const res = await api.get("/orders/restaurant");
// // // //       setOrders(res.data);
// // // //     } catch (err) {
// // // //       console.error("Error fetching orders", err);
// // // //     }
// // // //   };

// // // //   const stages = ["Pending", "Preparing", "Ready", "Delivered"];

// // // //   const updateStatus = async (orderId, currentStatus) => {
// // // //     const currentIndex = stages.indexOf(currentStatus);
// // // //     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

// // // //     const nextStatus = stages[currentIndex + 1];

// // // //     try {
// // // //       await api.put(`/orders/${orderId}/status`, { status: nextStatus });
// // // //     } catch (err) {
// // // //       console.error("Error updating order status", err);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="orders-page">
// // // //       <h2 className="orders-title">📦 Incoming Orders</h2>

// // // //       <div className="orders-grid">
// // // //         {orders.map((order) => (
// // // //           <div key={order._id} className="order-card">
// // // //             <p>
// // // //               <strong>User:</strong> {order.user?.name || "Unknown"}
// // // //             </p>
// // // //             <p>
// // // //               <strong>Items:</strong>{" "}
// // // //               {order.items
// // // //                 .map((item) => `${item.name} x${item.quantity}`)
// // // //                 .join(", ")}
// // // //             </p>
// // // //             <p>
// // // //               <strong>Total:</strong> ₹{order.total}
// // // //             </p>

// // // //             <div className="order-footer">
// // // //               <span
// // // //                 className={`status-badge status-${order.status.toLowerCase()}`}
// // // //               >
// // // //                 {order.status}
// // // //               </span>

// // // //               {order.status !== "Delivered" && (
// // // //                 <button
// // // //                   onClick={() => updateStatus(order._id, order.status)}
// // // //                   className="next-btn"
// // // //                 >
// // // //                   Next ➡
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default RestaurantOrders;













// // // import React, { useEffect, useState } from "react";
// // // import api from "../utils/api";
// // // import { io } from "socket.io-client";
// // // import "../styles/RestaurantOrders.css";

// // // function RestaurantOrders() {
// // //   const [orders, setOrders] = useState([]);

// // //   useEffect(() => {
// // //     fetchOrders();

// // //     // ✅ Setup socket listener
// // //     const socket = io("http://localhost:5000");

// // //     socket.on("orderPlaced", (newOrder) => {
// // //       setOrders((prev) => [newOrder, ...prev]);
// // //     });

// // //     socket.on("orderUpdated", (updatedOrder) => {
// // //       setOrders((prev) =>
// // //         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// // //       );
// // //     });

// // //     return () => {
// // //       socket.disconnect();
// // //     };
// // //   }, []);

// // //   const fetchOrders = async () => {
// // //     try {
// // //       const res = await api.get("/orders/restaurant");
// // //       setOrders(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching orders", err);
// // //     }
// // //   };

// // //   const stages = ["Pending", "Preparing", "Ready", "Delivered"];

// // //   const updateStatus = async (orderId, currentStatus) => {
// // //     const currentIndex = stages.indexOf(currentStatus);
// // //     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

// // //     const nextStatus = stages[currentIndex + 1];

// // //     try {
// // //       // ✅ Get restaurant token from localStorage
// // //       const restaurant = JSON.parse(localStorage.getItem("restaurant"));
// // //       const token = restaurant?.token;

// // //       await api.put(
// // //         `/orders/${orderId}/status`,
// // //         { status: nextStatus },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`, // ✅ send token
// // //           },
// // //         }
// // //       );

// // //       // ✅ Update state immediately for smooth UI
// // //       setOrders((prev) =>
// // //         prev.map((o) =>
// // //           o._id === orderId ? { ...o, status: nextStatus } : o
// // //         )
// // //       );
// // //     } catch (err) {
// // //       console.error("Error updating order status", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="orders-page">
// // //       <h2 className="orders-title">📦 Incoming Orders</h2>

// // //       <div className="orders-grid">
// // //         {orders.map((order) => (
// // //           <div key={order._id} className="order-card">
// // //             <p>
// // //               <strong>User:</strong> {order.user?.name || "Unknown"}
// // //             </p>
// // //             <p>
// // //               <strong>Items:</strong>{" "}
// // //               {order.items
// // //                 .map((item) => `${item.name} x${item.quantity}`)
// // //                 .join(", ")}
// // //             </p>
// // //             <p>
// // //               <strong>Total:</strong> ₹{order.total}
// // //             </p>

// // //             <div className="order-footer">
// // //               <span
// // //                 className={`status-badge status-${order.status.toLowerCase()}`}
// // //               >
// // //                 {order.status}
// // //               </span>

// // //               {order.status !== "Delivered" && (
// // //                 <button
// // //                   onClick={() => updateStatus(order._id, order.status)}
// // //                   className="next-btn"
// // //                 >
// // //                   Next ➡
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default RestaurantOrders;














// // // import React, { useEffect, useState } from "react";
// // // import api from "../utils/api";
// // // import { io } from "socket.io-client";
// // // import "../styles/RestaurantOrders.css";

// // // function RestaurantOrders() {
// // //   const [orders, setOrders] = useState([]);

// // //   useEffect(() => {
// // //     fetchOrders();

// // //     // ✅ Setup socket listener
// // //     const socket = io("http://localhost:5000");

// // //     socket.on("orderPlaced", (newOrder) => {
// // //       setOrders((prev) => [newOrder, ...prev]);
// // //     });

// // //     socket.on("orderUpdated", (updatedOrder) => {
// // //       setOrders((prev) =>
// // //         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// // //       );
// // //     });

// // //     return () => {
// // //       socket.disconnect();
// // //     };
// // //   }, []);

// // //   // ✅ Fetch orders with restaurant token
// // //   const fetchOrders = async () => {
// // //     try {
// // //       const restaurant = JSON.parse(localStorage.getItem("restaurant"));
// // //       const token = restaurant?.token;

// // //       const res = await api.get("/orders/restaurant", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setOrders(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching orders", err.response?.data || err.message);
// // //     }
// // //   };

// // //   const stages = ["Pending", "Preparing", "Ready", "Delivered"];

// // //   const updateStatus = async (orderId, currentStatus) => {
// // //     const currentIndex = stages.indexOf(currentStatus);
// // //     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

// // //     const nextStatus = stages[currentIndex + 1];

// // //     try {
// // //       const restaurant = JSON.parse(localStorage.getItem("restaurant"));
// // //       const token = restaurant?.token;

// // //       await api.put(
// // //         `/orders/${orderId}/status`,
// // //         { status: nextStatus },
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );

// // //       // ✅ Optimistic UI update
// // //       setOrders((prev) =>
// // //         prev.map((o) =>
// // //           o._id === orderId ? { ...o, status: nextStatus } : o
// // //         )
// // //       );
// // //     } catch (err) {
// // //       console.error("Error updating order status", err.response?.data || err.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="orders-page">
// // //       <h2 className="orders-title">📦 Incoming Orders</h2>

// // //       <div className="orders-grid">
// // //         {orders.map((order) => (
// // //           <div key={order._id} className="order-card">
// // //             <p>
// // //               <strong>User:</strong> {order.user?.name || "Unknown"}
// // //             </p>
// // //             <p>
// // //               <strong>Items:</strong>{" "}
// // //               {order.items
// // //                 .map((item) => `${item.name} x${item.quantity}`)
// // //                 .join(", ")}
// // //             </p>
// // //             <p>
// // //               <strong>Total:</strong> ₹{order.totalPrice}
// // //             </p>

// // //             <div className="order-footer">
// // //               <span
// // //                 className={`status-badge status-${order.status.toLowerCase()}`}
// // //               >
// // //                 {order.status}
// // //               </span>

// // //               {order.status !== "Delivered" && (
// // //                 <button
// // //                   onClick={() => updateStatus(order._id, order.status)}
// // //                   className="next-btn"
// // //                 >
// // //                   Next ➡
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default RestaurantOrders;











// // import React, { useEffect, useState } from "react";
// // import api from "../utils/api";
// // import { io } from "socket.io-client";
// // import "../styles/RestaurantOrders.css";

// // function RestaurantOrders() {
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     const restaurant = JSON.parse(localStorage.getItem("restaurant"));
// //     if (!restaurant) return;

// //     const token = restaurant.token;
// //     const restaurantId = restaurant._id;

// //     fetchOrders(token);

// //     // ✅ Setup socket listener
// //     const socket = io("http://localhost:5000");

// //     // ✅ Join restaurant room
// //     if (restaurantId) {
// //       socket.emit("joinRoom", restaurantId);
// //       console.log("📡 Joined room:", restaurantId);
// //     }

// //     socket.on("orderPlaced", (newOrder) => {
// //       console.log("🆕 New order received via socket:", newOrder);
// //       setOrders((prev) => [newOrder, ...prev]);
// //     });

// //     socket.on("orderUpdated", (updatedOrder) => {
// //       console.log("🔄 Order updated via socket:", updatedOrder);
// //       setOrders((prev) =>
// //         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// //       );
// //     });

// //     socket.on("disconnect", () => {
// //       console.log("❌ Socket disconnected");
// //     });

// //     return () => {
// //       socket.emit("leaveRoom", restaurantId);
// //       socket.disconnect();
// //     };
// //   }, []);

// //   // ✅ Fetch orders with restaurant token
// //   const fetchOrders = async (token) => {
// //     try {
// //       const res = await api.get("/orders/restaurant", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setOrders(res.data);
// //     } catch (err) {
// //       console.error("Error fetching orders", err.response?.data || err.message);
// //     }
// //   };

// //   const stages = ["Pending", "Preparing", "Ready", "Delivered"];

// //   // ✅ Update order status
// //   const updateStatus = async (orderId, currentStatus) => {
// //     const currentIndex = stages.indexOf(currentStatus);
// //     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

// //     const nextStatus = stages[currentIndex + 1];
// //     const restaurant = JSON.parse(localStorage.getItem("restaurant"));
// //     const token = restaurant?.token;

// //     try {
// //       await api.put(
// //         `/orders/${orderId}/status`,
// //         { status: nextStatus },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       // ✅ Optimistic UI update
// //       setOrders((prev) =>
// //         prev.map((o) =>
// //           o._id === orderId ? { ...o, status: nextStatus } : o
// //         )
// //       );
// //     } catch (err) {
// //       console.error("Error updating order status", err.response?.data || err.message);
// //     }
// //   };

// //   return (
// //     <div className="orders-page">
// //       <h2 className="orders-title">📦 Incoming Orders</h2>

// //       <div className="orders-grid">
// //         {orders.map((order) => (
// //           <div key={order._id} className="order-card">
// //             <p>
// //               <strong>User:</strong> {order.user?.name || "Unknown"}
// //             </p>
// //             <p>
// //               <strong>Items:</strong>{" "}
// //               {order.items
// //                 .map((item) => `${item.name} x${item.quantity}`)
// //                 .join(", ")}
// //             </p>
// //             <p>
// //               <strong>Total:</strong> ₹{order.totalPrice}
// //             </p>

// //             <div className="order-footer">
// //               <span
// //                 className={`status-badge status-${order.status.toLowerCase()}`}
// //               >
// //                 {order.status}
// //               </span>

// //               {order.status !== "Delivered" && (
// //                 <button
// //                   onClick={() => updateStatus(order._id, order.status)}
// //                   className="next-btn"
// //                 >
// //                   Next ➡
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default RestaurantOrders;





// import React, { useEffect, useState } from "react";
// import api from "../utils/api";
// import { io } from "socket.io-client";
// import "../styles/RestaurantOrders.css";

// function RestaurantOrders() {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 });

//   useEffect(() => {
//     const restaurant = JSON.parse(localStorage.getItem("restaurant"));
//     if (!restaurant) return;

//     const token = restaurant.token;
//     const restaurantId = restaurant._id;
//     fetchOrders(token);

//     const socket = io("http://localhost:5000");
//     if (restaurantId) socket.emit("joinRoom", restaurantId);

//     socket.on("orderPlaced", (newOrder) => {
//       setOrders((prev) => [newOrder, ...prev]);
//     });

//     socket.on("orderUpdated", (updatedOrder) => {
//       setOrders((prev) =>
//         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
//       );
//     });

//     return () => {
//       socket.emit("leaveRoom", restaurantId);
//       socket.disconnect();
//     };
//   }, []);

//   const fetchOrders = async (token) => {
//     try {
//       const res = await api.get("/orders/restaurant", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data);
//       calculateStats(res.data);
//     } catch (err) {
//       console.error("Error fetching orders", err.response?.data || err.message);
//     }
//   };

//   const calculateStats = (data) => {
//     const today = new Date().toDateString();
//     const todayOrders = data.filter(
//       (o) => new Date(o.createdAt).toDateString() === today
//     );
//     const total = todayOrders.length;
//     const pending = data.filter((o) => o.status !== "Delivered").length;
//     const revenue = todayOrders.reduce((sum, o) => sum + o.totalPrice, 0);
//     setStats({ total, pending, revenue });
//   };

//   const stages = [
//     "Pending",
//     "Accepted",
//     "Preparing",
//     "Out for Delivery",
//     "Delivered",
//   ];

//   const updateStatus = async (orderId, currentStatus) => {
//     const currentIndex = stages.indexOf(currentStatus);
//     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

//     const nextStatus = stages[currentIndex + 1];
//     const restaurant = JSON.parse(localStorage.getItem("restaurant"));
//     const token = restaurant?.token;

//     try {
//       await api.put(
//         `/orders/${orderId}/status`,
//         { status: nextStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === orderId ? { ...o, status: nextStatus } : o
//         )
//       );
//     } catch (err) {
//       console.error("Error updating order status", err.response?.data || err.message);
//     }
//   };

//   // Filter + Search
//   useEffect(() => {
//     let data = [...orders];
//     if (statusFilter !== "All") {
//       data = data.filter((o) => o.status === statusFilter);
//     }
//     if (search.trim()) {
//       const term = search.toLowerCase();
//       data = data.filter(
//         (o) =>
//           o.user?.name?.toLowerCase().includes(term) ||
//           o._id.toLowerCase().includes(term)
//       );
//     }
//     setFilteredOrders(data);
//   }, [orders, search, statusFilter]);

//   return (
//     <div className="orders-container">
//       <h2 className="page-title">🍽️ Restaurant Orders</h2>

//       {/* Revenue Summary */}
//       <div className="summary-cards">
//         <div className="summary-card">
//           <h4>Today's Orders</h4>
//           <p>{stats.total}</p>
//         </div>
//         <div className="summary-card">
//           <h4>Pending Orders</h4>
//           <p>{stats.pending}</p>
//         </div>
//         <div className="summary-card">
//           <h4>Today's Revenue</h4>
//           <p>₹{stats.revenue}</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           placeholder="🔍 Search by customer or order ID..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option>All</option>
//           <option>Accepted</option>
//           <option>Preparing</option>
//           <option>Out for Delivery</option>
//           <option>Delivered</option>
//         </select>
//       </div>

//       {/* Orders List */}
//       <div className="orders-list">
//         {filteredOrders.length === 0 ? (
//           <p className="no-orders">No orders found</p>
//         ) : (
//           filteredOrders.map((order) => (
//             <div key={order._id} className="order-card">
//               <div className="order-top">
//                 <span className="order-id">#{order._id.slice(-6)}</span>
//                 <span
//                   className={`status-badge status-${order.status
//                     .toLowerCase()
//                     .replace(/\s/g, "-")}`}
//                 >
//                   {order.status}
//                 </span>
//               </div>

//               <p>
//                 <strong>Customer:</strong> {order.user?.name || "Unknown"}
//               </p>
//               <p>
//                 <strong>Items:</strong>{" "}
//                 {order.items
//                   .map((item) => `${item.name} x${item.quantity}`)
//                   .join(", ")}
//               </p>
//               <p>
//                 <strong>Total:</strong> ₹{order.totalPrice}
//               </p>
//               <p>
//                 <strong>Date:</strong>{" "}
//                 {new Date(order.createdAt).toLocaleString()}
//               </p>

//               <div className="order-actions">
//                 {order.status !== "Delivered" && (
//                   <button
//                     onClick={() => updateStatus(order._id, order.status)}
//                     className="next-btn"
//                   >
//                     Next Stage ➡
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setSelectedOrder(order)}
//                   className="view-btn"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Modal for Order Details */}
//       {selectedOrder && (
//         <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
//           <div
//             className="modal-content"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3>🧾 Order Details</h3>
//             <p><strong>Customer:</strong> {selectedOrder.user?.name}</p>
//             <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
//             <p><strong>Phone:</strong> {selectedOrder.user?.mobile}</p>
//             <p><strong>Address:</strong> {selectedOrder.address}</p>
//             <h4>Items:</h4>
//             <ul>
//               {selectedOrder.items.map((item) => (
//                 <li key={item._id}>
//                   {item.name} x{item.quantity} — ₹{item.price * item.quantity}
//                 </li>
//               ))}
//             </ul>
//             <p><strong>Total:</strong> ₹{selectedOrder.totalPrice}</p>
//             <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
//             <p><strong>Status:</strong> {selectedOrder.status}</p>
//             <button onClick={() => setSelectedOrder(null)} className="close-btn">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RestaurantOrders;







import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { io } from "socket.io-client";
import "../styles/RestaurantOrders.css";

function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 });

  useEffect(() => {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    if (!restaurant) return;

    const token = restaurant.token;
    const restaurantId = restaurant._id;
    fetchOrders(token);

    const socket = io("http://localhost:5000");
    if (restaurantId) socket.emit("joinRoom", restaurantId);

    socket.on("orderPlaced", (newOrder) => {
      setOrders((prev) => [newOrder, ...prev]);
    });

    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    return () => {
      socket.emit("leaveRoom", restaurantId);
      socket.disconnect();
    };
  }, []);

  const fetchOrders = async (token) => {
    try {
      const res = await api.get("/orders/restaurant", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error("Error fetching orders", err.response?.data || err.message);
    }
  };

  const calculateStats = (data) => {
    const today = new Date().toDateString();
    const todayOrders = data.filter(
      (o) => new Date(o.createdAt).toDateString() === today
    );
    const total = todayOrders.length;
    const pending = data.filter((o) => o.status !== "Delivered").length;
    const revenue = todayOrders.reduce((sum, o) => sum + o.totalPrice, 0);
    setStats({ total, pending, revenue });
  };

  // ✅ Updated stages (removed "Out for Delivery")
  const stages = ["Pending", "Accepted", "Preparing", "Delivered"];

  const updateStatus = async (orderId, currentStatus) => {
    const currentIndex = stages.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === stages.length - 1) return;

    const nextStatus = stages[currentIndex + 1];
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    const token = restaurant?.token;

    try {
      await api.put(
        `/orders/${orderId}/status`,
        { status: nextStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: nextStatus } : o
        )
      );
    } catch (err) {
      console.error("Error updating order status", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    let data = [...orders];
    if (statusFilter !== "All") {
      data = data.filter((o) => o.status === statusFilter);
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      data = data.filter(
        (o) =>
          o.user?.name?.toLowerCase().includes(term) ||
          o._id.toLowerCase().includes(term)
      );
    }
    setFilteredOrders(data);
  }, [orders, search, statusFilter]);

  return (
    <div className="orders-container">
      <h2 className="page-title">🍽️ Restaurant Orders</h2>

      {/* Revenue Summary */}
      <div className="summary-cards">
        <div className="summary-card">
          <h4>Today's Orders</h4>
          <p>{stats.total}</p>
        </div>
        <div className="summary-card">
          <h4>Pending Orders</h4>
          <p>{stats.pending}</p>
        </div>
        <div className="summary-card">
          <h4>Today's Revenue</h4>
          <p>₹{stats.revenue}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by customer or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Preparing</option>
          <option>Delivered</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">No orders found</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-top">
                <span className="order-id">#{order._id.slice(-6)}</span>
                <span
                  className={`status-badge status-${order.status
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {order.status}
                </span>
              </div>

              <p>
                <strong>Customer:</strong> {order.user?.name || "Unknown"}
              </p>
              <p>
                <strong>Items:</strong>{" "}
                {order.items
                  .map((item) => `${item.name} x${item.quantity}`)
                  .join(", ")}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalPrice}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="order-actions">
                {order.status !== "Delivered" && (
                  <button
                    onClick={() => updateStatus(order._id, order.status)}
                    className="next-btn"
                  >
                    Next Stage ➡
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="view-btn"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🧾 Order Details</h3>
            <p><strong>Customer:</strong> {selectedOrder.user?.name}</p>
            <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
            <p><strong>Phone:</strong> {selectedOrder.user?.mobile}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
            <h4>Items:</h4>
            <ul>
              {selectedOrder.items.map((item) => (
                <li key={item._id}>
                  {item.name} x{item.quantity} — ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{selectedOrder.totalPrice}</p>
            <p><strong>Payment:</strong> {selectedOrder.paymentMethod}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <button onClick={() => setSelectedOrder(null)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantOrders;
