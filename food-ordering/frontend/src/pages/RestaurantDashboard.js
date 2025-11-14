// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";
// import "../styles/RestaurantDashboard.css";

// function RestaurantDashboard() {
//   const navigate = useNavigate();
//   const [restaurant, setRestaurant] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [activeTab, setActiveTab] = useState("Pending");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   /* ============================================================
//      🧭 LOAD RESTAURANT INFO + FETCH ORDERS
//   ============================================================ */
//   useEffect(() => {
//     const stored = localStorage.getItem("restaurant");
//     if (!stored) {
//       navigate("/restaurant/login");
//       return;
//     }

//     try {
//       const parsed = JSON.parse(stored);
//       setRestaurant(parsed);
//       fetchOrders();
//     } catch (err) {
//       console.error("Invalid restaurant data:", err);
//       navigate("/restaurant/login");
//     }
//   }, [navigate]);

//   /* ============================================================
//      🧭 FETCH ORDERS
//   ============================================================ */
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await api.get("/orders/restaurant");
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error("❌ Failed to fetch orders:", err.response?.data || err.message);
//       setError("Failed to load orders. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ============================================================
//      🔄 SOCKET.IO — REALTIME UPDATES
//   ============================================================ */
//   useEffect(() => {
//     const socket = io("http://localhost:5000");
//     if (restaurant?._id) socket.emit("joinRoom", restaurant._id);

//     socket.on("orderUpdated", (updatedOrder) => {
//       setOrders((prev) =>
//         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
//       );
//     });

//     socket.on("newOrder", (newOrder) => {
//       if (newOrder.restaurant === restaurant._id) {
//         setOrders((prev) => [newOrder, ...prev]);
//       }
//     });

//     return () => {
//       if (restaurant?._id) socket.emit("leaveRoom", restaurant._id);
//       socket.disconnect();
//     };
//   }, [restaurant]);

//   /* ============================================================
//      🧭 UPDATE ORDER STATUS
//   ============================================================ */
//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       await api.put(`/orders/${orderId}/status`, { status });
//       fetchOrders();
//     } catch (err) {
//       console.error("Status update failed:", err);
//     }
//   };

//   /* ============================================================
//      🧭 TABS AND FILTERING
//   ============================================================ */
//   const tabs = ["Pending", "Accepted", "Preparing", "Delivered"];

//   const filteredOrders = orders
//     .filter((o) => {
//       const s = o.status?.toLowerCase();
//       return activeTab === "Pending"
//         ? s === "pending"
//         : activeTab === "Accepted"
//         ? s === "accepted"
//         : activeTab === "Preparing"
//         ? s === "preparing"
//         : activeTab === "Delivered"
//         ? s === "delivered"
//         : false;
//     })
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   /* ============================================================
//      📊 DASHBOARD STATS
//   ============================================================ */
//   const totalOrders = orders.length;
//   const pendingOrders = orders.filter(
//     (o) => o.status?.toLowerCase() === "pending"
//   ).length;

//   const totalRevenue = orders
//     .filter((o) => o.status !== "declined")
//     .reduce((sum, o) => sum + (o.total || o.totalPrice || 0), 0);

//   /* ============================================================
//      🔧 HELPERS
//   ============================================================ */
//   const getOrderDisplayNumber = (order) =>
//     order.orderNumber || `#${order._id?.slice(-6)}`;

//   const getNextStatus = (current) => {
//     const map = {
//       pending: "accepted",
//       accepted: "preparing",
//       preparing: "delivered",
//     };
//     return map[current.toLowerCase()] || null;
//   };

//   const getButtonText = (status) => {
//     switch (status.toLowerCase()) {
//       case "pending":
//         return "Accept Order";
//       case "accepted":
//         return "Start Preparing";
//       case "preparing":
//         return "Complete Order";
//       default:
//         return "";
//     }
//   };

//   /* ============================================================
//      🧭 UI RENDER
//   ============================================================ */
//   return (
//     <div className="restaurant-dashboard">
//       <header className="dashboard-top">
//         <h1 className="dashboard-title">
//           {restaurant ? `${restaurant.name} Dashboard` : "Restaurant Dashboard"}
//         </h1>
//         <p className="dashboard-subtext">
//           Manage your orders and view analytics
//         </p>
//       </header>

//       {/* === Stats Cards === */}
//       <div className="stats-cards">
//         <div className="stat-card green">
//           <div className="stat-info">
//             <h3 className="stat-title">Today's Revenue</h3>
//             <p className="stat-value">₹{totalRevenue.toFixed(2)}</p>
//             <span className="stat-sub">+12% from yesterday</span>
//           </div>
//           <div className="stat-icon">
//             <i className="fas fa-dollar-sign"></i>
//           </div>
//         </div>

//         <div className="stat-card blue">
//           <div className="stat-info">
//             <h3 className="stat-title">Total Orders</h3>
//             <p className="stat-value">{totalOrders}</p>
//             <span className="stat-sub">All-time orders</span>
//           </div>
//           <div className="stat-icon">
//             <i className="fas fa-box"></i>
//           </div>
//         </div>

//         <div className="stat-card yellow">
//           <div className="stat-info">
//             <h3 className="stat-title">Pending Orders</h3>
//             <p className="stat-value">{pendingOrders}</p>
//             <span className="stat-sub">Awaiting confirmation</span>
//           </div>
//           <div className="stat-icon">
//             <i className="fas fa-bell"></i>
//           </div>
//         </div>

//         <div className="stat-card purple">
//           <div className="stat-info">
//             <h3 className="stat-title">Avg. Prep Time</h3>
//             <p className="stat-value">18 min</p>
//             <span className="stat-sub">Today</span>
//           </div>
//           <div className="stat-icon">
//             <i className="fas fa-clock"></i>
//           </div>
//         </div>
//       </div>

//       {/* === Tabs === */}
//       <div className="order-tabs">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`tab-btn ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab} (
//             {
//               orders.filter((o) => {
//                 const s = o.status?.toLowerCase();
//                 if (tab === "Pending") return s === "pending";
//                 if (tab === "Accepted") return s === "accepted";
//                 if (tab === "Preparing") return s === "preparing";
//                 if (tab === "Delivered") return s === "delivered";
//                 return false;
//               }).length
//             }
//             )
//           </button>
//         ))}
//       </div>

//       {/* === Orders List === */}
//       <div className="orders-list">
//         {loading ? (
//           <p className="no-orders">Loading orders...</p>
//         ) : error ? (
//           <p className="no-orders">{error}</p>
//         ) : filteredOrders.length === 0 ? (
//           <p className="no-orders">No {activeTab.toLowerCase()} orders yet.</p>
//         ) : (
//           filteredOrders.map((order) => (
//             <div className="order-card" key={order._id}>
//               <div className="order-header">
//                 <h3>
//                   Order {getOrderDisplayNumber(order)}
//                   <span
//                     className={`status-badge ${order.status?.toLowerCase()}`}
//                   >
//                     {order.status}
//                   </span>
//                 </h3>
//                 <div className="order-price-time">
//                   <p className="order-total">
//                     ₹{(order.totalPrice || order.total).toFixed(2)}
//                   </p>
//                   <span className="order-time">
//                     {new Date(order.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </span>
//                 </div>
//               </div>

//               <div className="customer-info">
//                 <p className="customer-name">
//                   {order.user?.name || "Unknown User"}
//                 </p>
//                 <p className="customer-email">
//                   {order.user?.email || "No email provided"}
//                 </p>
//               </div>

//               <ul className="order-items">
//                 {order.items.map((item, idx) => (
//                   <li key={idx}>
//                     {item.quantity}× {item.name}
//                     <span>₹{item.price}</span>
//                   </li>
//                 ))}
//               </ul>

//               <p className="pickup-time">🕒 Pickup in 15 minutes</p>

//               <div className="order-actions">
//                 {["pending", "accepted", "preparing"].includes(
//                   order.status?.toLowerCase()
//                 ) && (
//                   <button
//                     className="accept-btn"
//                     onClick={() =>
//                       updateOrderStatus(order._id, getNextStatus(order.status))
//                     }
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={2}
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     {getButtonText(order.status)}
//                   </button>
//                 )}

//                 {order.status?.toLowerCase() === "pending" && (
//                   <button
//                     className="decline-btn"
//                     onClick={() => updateOrderStatus(order._id, "declined")}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={2}
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                     Decline
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default RestaurantDashboard;





































// // import React, { useState, useEffect } from "react";
// // import api from "../utils/api";
// // import { io } from "socket.io-client";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/RestaurantDashboard.css";

// // function RestaurantDashboard() {
// //   const navigate = useNavigate();
// //   const [restaurant, setRestaurant] = useState(null);
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   /* ============================================================
// //      🧭 LOAD RESTAURANT INFO + FETCH ORDERS
// //   ============================================================ */
// //   useEffect(() => {
// //     const stored = localStorage.getItem("restaurant");
// //     if (!stored) {
// //       navigate("/restaurant/login");
// //       return;
// //     }

// //     try {
// //       const parsed = JSON.parse(stored);
// //       setRestaurant(parsed);
// //       fetchOrders();
// //     } catch (err) {
// //       console.error("Invalid restaurant data:", err);
// //       navigate("/restaurant/login");
// //     }
// //   }, [navigate]);

// //   /* ============================================================
// //      🧭 FETCH ORDERS
// //   ============================================================ */
// //   const fetchOrders = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");
// //       const res = await api.get("/orders/restaurant");
// //       setOrders(res.data || []);
// //     } catch (err) {
// //       console.error("❌ Failed to fetch orders:", err.response?.data || err.message);
// //       setError("Failed to load orders. Please try again later.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ============================================================
// //      🔄 SOCKET.IO — REALTIME UPDATES
// //   ============================================================ */
// //   useEffect(() => {
// //     const socket = io("http://localhost:5000");
// //     if (restaurant?._id) socket.emit("joinRoom", restaurant._id);

// //     socket.on("orderUpdated", (updatedOrder) => {
// //       setOrders((prev) =>
// //         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// //       );
// //     });

// //     socket.on("newOrder", (newOrder) => {
// //       if (newOrder.restaurant === restaurant._id) {
// //         setOrders((prev) => [newOrder, ...prev]);
// //       }
// //     });

// //     return () => {
// //       if (restaurant?._id) socket.emit("leaveRoom", restaurant._id);
// //       socket.disconnect();
// //     };
// //   }, [restaurant]);

// //   /* ============================================================
// //      🧭 UPDATE ORDER STATUS
// //   ============================================================ */
// //   const updateOrderStatus = async (orderId, status) => {
// //     try {
// //       await api.put(`/orders/${orderId}/status`, { status });
// //       fetchOrders();
// //     } catch (err) {
// //       console.error("Status update failed:", err);
// //     }
// //   };

// //   /* ============================================================
// //      🔧 HELPERS
// //   ============================================================ */
// //   const getOrderDisplayNumber = (order) =>
// //     order.orderNumber || `#${order._id?.slice(-6)}`;

// //   const getNextStatus = (current) => {
// //     const map = {
// //       pending: "accepted",
// //       accepted: "preparing",
// //       preparing: "delivered",
// //     };
// //     return map[current.toLowerCase()] || null;
// //   };

// //   const getButtonText = (status) => {
// //     switch (status.toLowerCase()) {
// //       case "pending":
// //         return "Accept Order";
// //       case "accepted":
// //         return "Start Preparing";
// //       case "preparing":
// //         return "Complete Order";
// //       default:
// //         return "";
// //     }
// //   };

// //   /* ============================================================
// //      📊 DASHBOARD STATS
// //   ============================================================ */
// //   const totalOrders = orders.length;
// //   const pendingOrders = orders.filter(
// //     (o) => o.status?.toLowerCase() === "pending"
// //   ).length;

// //   const totalRevenue = orders
// //     .filter((o) => o.status !== "declined")
// //     .reduce((sum, o) => sum + (o.total || o.totalPrice || 0), 0);

// //   /* ============================================================
// //      🧭 UI RENDER
// //   ============================================================ */
// //   return (
// //     <div className="restaurant-dashboard">
// //       <header className="dashboard-top">
// //         <h1 className="dashboard-title">
// //           {restaurant ? `${restaurant.name} Dashboard` : "Restaurant Dashboard"}
// //         </h1>
// //         <p className="dashboard-subtext">
// //           Manage your orders and view analytics
// //         </p>
// //       </header>

// //       {/* === Stats Cards === */}
// //       <div className="stats-cards">
// //         <div className="stat-card green">
// //           <h3>Today's Revenue</h3>
// //           <p className="stat-value">₹{totalRevenue.toFixed(2)}</p>
// //           <span className="stat-sub">+12% from yesterday</span>
// //         </div>

// //         <div className="stat-card blue">
// //           <h3>Total Orders</h3>
// //           <p className="stat-value">{totalOrders}</p>
// //           <span className="stat-sub">All-time orders</span>
// //         </div>

// //         <div className="stat-card yellow">
// //           <h3>Pending Orders</h3>
// //           <p className="stat-value">{pendingOrders}</p>
// //           <span className="stat-sub">Awaiting confirmation</span>
// //         </div>

// //         <div className="stat-card purple">
// //           <h3>Avg. Prep Time</h3>
// //           <p className="stat-value">18 min</p>
// //           <span className="stat-sub">Today</span>
// //         </div>
// //       </div>

// //       {/* === All Orders (No Tabs) === */}
// //       <div className="orders-list">
// //         {loading ? (
// //           <p className="no-orders">Loading orders...</p>
// //         ) : error ? (
// //           <p className="no-orders">{error}</p>
// //         ) : orders.length === 0 ? (
// //           <p className="no-orders">No orders yet.</p>
// //         ) : (
// //           orders
// //             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
// //             .map((order) => (
// //               <div className="order-card" key={order._id}>
// //                 <div className="order-header">
// //                   <h3>
// //                     Order {getOrderDisplayNumber(order)}
// //                     <span
// //                       className={`status-badge ${order.status?.toLowerCase()}`}
// //                     >
// //                       {order.status}
// //                     </span>
// //                   </h3>
// //                   <div className="order-price-time">
// //                     <p className="order-total">
// //                       ₹{(order.totalPrice || order.total).toFixed(2)}
// //                     </p>
// //                     <span className="order-time">
// //                       {new Date(order.createdAt).toLocaleTimeString([], {
// //                         hour: "2-digit",
// //                         minute: "2-digit",
// //                       })}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="customer-info">
// //                   <p className="customer-name">
// //                     {order.user?.name || "Unknown User"}
// //                   </p>
// //                   <p className="customer-email">
// //                     {order.user?.email || "No email provided"}
// //                   </p>
// //                 </div>

// //                 <ul className="order-items">
// //                   {order.items.map((item, idx) => (
// //                     <li key={idx}>
// //                       {item.quantity}× {item.name}
// //                       <span>₹{item.price}</span>
// //                     </li>
// //                   ))}
// //                 </ul>

// //                 <p className="pickup-time">🕒 Pickup in 15 minutes</p>

// //                 <div className="order-actions">
// //                   {["pending", "accepted", "preparing"].includes(
// //                     order.status?.toLowerCase()
// //                   ) && (
// //                     <button
// //                       className="accept-btn"
// //                       onClick={() =>
// //                         updateOrderStatus(order._id, getNextStatus(order.status))
// //                       }
// //                     >
// //                       {getButtonText(order.status)}
// //                     </button>
// //                   )}

// //                   {order.status?.toLowerCase() === "pending" && (
// //                     <button
// //                       className="decline-btn"
// //                       onClick={() => updateOrderStatus(order._id, "declined")}
// //                     >
// //                       Decline
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default RestaurantDashboard;



import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "../styles/RestaurantDashboard.css";

function RestaurantDashboard() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================================================
     🧭 LOAD RESTAURANT INFO + FETCH ORDERS
  ============================================================ */
  useEffect(() => {
    const stored = localStorage.getItem("restaurant");
    if (!stored) {
      navigate("/restaurant/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setRestaurant(parsed);
      fetchOrders();
    } catch (err) {
      console.error("Invalid restaurant data:", err);
      navigate("/restaurant/login");
    }
  }, [navigate]);

  /* ============================================================
     🧭 FETCH ORDERS
  ============================================================ */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/orders/restaurant");
      setOrders(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch orders:", err.response?.data || err.message);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     🔄 SOCKET.IO — REALTIME UPDATES
  ============================================================ */
  useEffect(() => {
    const socket = io("http://localhost:5000");
    if (restaurant?._id) socket.emit("joinRoom", restaurant._id);

    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    socket.on("newOrder", (newOrder) => {
      if (newOrder.restaurant === restaurant._id) {
        setOrders((prev) => [newOrder, ...prev]);
      }
    });

    return () => {
      if (restaurant?._id) socket.emit("leaveRoom", restaurant._id);
      socket.disconnect();
    };
  }, [restaurant]);

  /* ============================================================
     🧭 UPDATE ORDER STATUS
  ============================================================ */
  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  /* ============================================================
     🧭 TABS AND FILTERING
  ============================================================ */
  const tabs = ["Pending", "Accepted", "Preparing", "Delivered"];

  const filteredOrders = orders
    .filter((o) => {
      const s = o.status?.toLowerCase();
      return activeTab === "Pending"
        ? s === "pending"
        : activeTab === "Accepted"
        ? s === "accepted"
        : activeTab === "Preparing"
        ? s === "preparing"
        : activeTab === "Delivered"
        ? s === "delivered"
        : false;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  /* ============================================================
     📊 DASHBOARD STATS
  ============================================================ */
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status?.toLowerCase() === "pending"
  ).length;

  // ⭐ UPDATED: REVENUE ONLY FROM DELIVERED ORDERS
  const totalRevenue = orders
    .filter((o) => o.status?.toLowerCase() === "delivered")
    .reduce((sum, o) => sum + (o.total || o.totalPrice || 0), 0);

  /* ============================================================
     🔧 HELPERS
  ============================================================ */
  const getOrderDisplayNumber = (order) =>
    order.orderNumber || `#${order._id?.slice(-6)}`;

  const getNextStatus = (current) => {
    const map = {
      pending: "accepted",
      accepted: "preparing",
      preparing: "delivered",
    };
    return map[current.toLowerCase()] || null;
  };

  const getButtonText = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Accept Order";
      case "accepted":
        return "Start Preparing";
      case "preparing":
        return "Complete Order";
      default:
        return "";
    }
  };

  /* ============================================================
     🧭 UI RENDER
  ============================================================ */
  return (
    <div className="restaurant-dashboard">
      <header className="dashboard-top">
        <h1 className="dashboard-title">
          {restaurant ? `${restaurant.name} Dashboard` : "Restaurant Dashboard"}
        </h1>
        <p className="dashboard-subtext">
          Manage your orders and view analytics
        </p>
      </header>

      {/* === Stats Cards === */}
      <div className="stats-cards">
        <div className="stat-card green">
          <div className="stat-info">
            <h3 className="stat-title">Today's Revenue</h3>
            <p className="stat-value">₹{totalRevenue.toFixed(2)}</p>
            <span className="stat-sub">+12% from yesterday</span>
          </div>
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
        </div>

        <div className="stat-card blue">
          <div className="stat-info">
            <h3 className="stat-title">Total Orders</h3>
            <p className="stat-value">{totalOrders}</p>
            <span className="stat-sub">All-time orders</span>
          </div>
          <div className="stat-icon">
            <i className="fas fa-box"></i>
          </div>
        </div>

        <div className="stat-card yellow">
          <div className="stat-info">
            <h3 className="stat-title">Pending Orders</h3>
            <p className="stat-value">{pendingOrders}</p>
            <span className="stat-sub">Awaiting confirmation</span>
          </div>
          <div className="stat-icon">
            <i className="fas fa-bell"></i>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-info">
            <h3 className="stat-title">Avg. Prep Time</h3>
            <p className="stat-value">18 min</p>
            <span className="stat-sub">Today</span>
          </div>
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
        </div>
      </div>

      {/* === Tabs === */}
      <div className="order-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} (
            {
              orders.filter((o) => {
                const s = o.status?.toLowerCase();
                if (tab === "Pending") return s === "pending";
                if (tab === "Accepted") return s === "accepted";
                if (tab === "Preparing") return s === "preparing";
                if (tab === "Delivered") return s === "delivered";
                return false;
              }).length
            }
            )
          </button>
        ))}
      </div>

      {/* === Orders List === */}
      <div className="orders-list">
        {loading ? (
          <p className="no-orders">Loading orders...</p>
        ) : error ? (
          <p className="no-orders">{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="no-orders">No {activeTab.toLowerCase()} orders yet.</p>
        ) : (
          filteredOrders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <h3>
                  Order {getOrderDisplayNumber(order)}
                  <span
                    className={`status-badge ${order.status?.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </h3>
                <div className="order-price-time">
                  <p className="order-total">
                    ₹{(order.totalPrice || order.total).toFixed(2)}
                  </p>
                  <span className="order-time">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="customer-info">
                <p className="customer-name">
                  {order.user?.name || "Unknown User"}
                </p>
                <p className="customer-email">
                  {order.user?.email || "No email provided"}
                </p>
              </div>

              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.quantity}× {item.name}
                    <span>₹{item.price}</span>
                  </li>
                ))}
              </ul>

              <p className="pickup-time">🕒 Pickup in 15 minutes</p>

              <div className="order-actions">
                {["pending", "accepted", "preparing"].includes(
                  order.status?.toLowerCase()
                ) && (
                  <button
                    className="accept-btn"
                    onClick={() =>
                      updateOrderStatus(order._id, getNextStatus(order.status))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {getButtonText(order.status)}
                  </button>
                )}

                {order.status?.toLowerCase() === "pending" && (
                  <button
                    className="decline-btn"
                    onClick={() => updateOrderStatus(order._id, "declined")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Decline
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RestaurantDashboard;
