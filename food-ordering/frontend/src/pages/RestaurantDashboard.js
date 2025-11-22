// import { useState, useEffect } from "react";
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
//   const [avgPrep, setAvgPrep] = useState(0); // Added

//   /* LOAD RESTAURANT + FETCH ORDERS + FETCH AVG PREP TIME */
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

//       if (parsed?._id) {
//         fetchAvgPrep(parsed._id); // Added
//       }
//     } catch (err) {
//       console.error("Invalid restaurant data:", err);
//       navigate("/restaurant/login");
//     }
//   }, [navigate]);

//   /* FETCH AVG PREP TIME */
//   const fetchAvgPrep = async (restId) => {
//     try {
//       const res = await api.get(`/orders/avg-prep-time/${restId}`);
//       setAvgPrep(res.data.avgPrepTime || 0);
//     } catch (err) {
//       console.error("Failed to fetch avg prep time:", err);
//     }
//   };

//   /* FETCH ORDERS */
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await api.get("/orders/restaurant");
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//       setError("Failed to load orders. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* SOCKET.IO REALTIME */
//   useEffect(() => {
//     const socket = io("http://localhost:5000");
//     if (restaurant?._id) socket.emit("joinRoom", restaurant._id);

//     socket.on("orderUpdated", (updatedOrder) => {
//       setOrders((prev) =>
//         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
//       );

//       if (updatedOrder.status === "Delivered") {
//         fetchAvgPrep(restaurant._id); // Update avg prep
//       }
//     });

//     socket.on("newOrder", (newOrder) => {
//       if (newOrder.restaurant === restaurant?._id) {
//         setOrders((prev) => [newOrder, ...prev]);
//       }
//     });

//     return () => {
//       if (restaurant?._id) socket.emit("leaveRoom", restaurant._id);
//       socket.disconnect();
//     };
//   }, [restaurant]);

//   /* UPDATE ORDER STATUS */
//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       await api.put(`/orders/${orderId}/status`, { status });
//       fetchOrders();

//       if (status === "delivered" && restaurant?._id) {
//         fetchAvgPrep(restaurant._id);
//       }
//     } catch (err) {
//       console.error("Status update failed:", err);
//     }
//   };

//   /* TABS */
//   const tabs = ["Pending", "Accepted", "Preparing", "Delivered"];

//   const filteredOrders = orders
//     .filter((o) => {
//       const s = o.status?.toLowerCase();
//       if (activeTab === "Pending") return s === "pending";
//       if (activeTab === "Accepted") return s === "accepted";
//       if (activeTab === "Preparing") return s === "preparing";
//       if (activeTab === "Delivered") return s === "delivered";
//       return false;
//     })
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//   /* STATS */
//   const totalOrders = orders.length;
//   const pendingOrders = orders.filter((o) => o.status?.toLowerCase() === "pending")
//     .length;

//   const totalRevenue = orders
//     .filter((o) => o.status?.toLowerCase() === "delivered")
//     .reduce((sum, o) => sum + (o.total || o.totalPrice || 0), 0);

//   /* HELPERS */
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
//     const s = status.toLowerCase();
//     if (s === "pending") return "Accept Order";
//     if (s === "accepted") return "Start Preparing";
//     if (s === "preparing") return "Complete Order";
//     return "";
//   };

//   /* UI */
//   return (
//     <div className="restaurant-dashboard">
//       <header className="dashboard-top">
//         <h1 className="dashboard-title">
//           {restaurant ? restaurant.name + " Dashboard" : "Restaurant Dashboard"}
//         </h1>
//         <p className="dashboard-subtext">Manage your orders and view analytics</p>
//       </header>

//       {/* STATS CARDS */}
//       <div className="stats-cards">
//         <div className="stat-card green">
//           <h3 className="stat-title">Today&apos;s Revenue</h3>
//           <p className="stat-value">₹{totalRevenue.toFixed(2)}</p>
//           <span className="stat-sub">Compared to yesterday</span>
//         </div>

//         <div className="stat-card blue">
//           <h3 className="stat-title">Total Orders</h3>
//           <p className="stat-value">{totalOrders}</p>
//           <span className="stat-sub">All-time</span>
//         </div>

//         <div className="stat-card yellow">
//           <h3 className="stat-title">Pending Orders</h3>
//           <p className="stat-value">{pendingOrders}</p>
//           <span className="stat-sub">Awaiting confirmation</span>
//         </div>

//         {/* UPDATED AVG PREP TIME CARD */}
//         <div className="stat-card purple">
//           <h3 className="stat-title">Avg. Prep Time</h3>
//           <p className="stat-value">{avgPrep} min</p>
//           <span className="stat-sub">Based on last 100 delivered orders</span>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="order-tabs">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`tab-btn ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab} (
//             {orders.filter((o) => o.status?.toLowerCase() === tab.toLowerCase())
//               .length}
//             )
//           </button>
//         ))}
//       </div>

//       {/* ORDERS LIST */}
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
//                   <span className={`status-badge ${order.status?.toLowerCase()}`}>
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
//                 <p className="customer-name">{order.user?.name || "Unknown"}</p>
//                 <p className="customer-email">{order.user?.email || "No email"}</p>
//               </div>

//               <ul className="order-items">
//                 {order.items.map((item, idx) => (
//                   <li key={idx}>
//                     {item.quantity} x {item.name}
//                     <span>₹{item.price}</span>
//                   </li>
//                 ))}
//               </ul>

//               <p className="pickup-time">Pickup in approximately 15 minutes</p>

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
//                     {getButtonText(order.status)}
//                   </button>
//                 )}

//                 {order.status?.toLowerCase() === "pending" && (
//                   <button
//                     className="decline-btn"
//                     onClick={() =>
//                       updateOrderStatus(order._id, "declined")
//                     }
//                   >
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






// src/pages/AdminDashboard.js (or wherever your file lives)
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { io } from "socket.io-client";
import "../styles/AdminDashboard.css";
import Chart from "chart.js/auto"; // Chart.js auto bundle

const API_BASE =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

/* =======================================================
   Universal Image Resolver
======================================================= */
const getRestaurantImage = (outlet) => {
  if (!outlet) return "/images/default-restaurant.png";

  const img =
    outlet.image ||
    outlet.profileImage ||
    outlet.profilePic ||
    (outlet.galleryImages && outlet.galleryImages[0]);

  if (!img) return "/images/default-restaurant.png";

  if (img.startsWith("http")) return img;

  return `${API_BASE}${img.startsWith("/") ? img : "/" + img}`;
};

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [outlets, setOutlets] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [thisMonth, setThisMonth] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [growth, setGrowth] = useState(0);

  const [toast, setToast] = useState({ show: false, message: "", id: null });
  const toastTimerRef = useRef(null);
  const socketRef = useRef(null);

  // Chart refs
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  /* ===========================================
     Toast Handler
  ============================================ */
  const showToast = useCallback((message, ms = 2500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

    const id = Date.now();
    setToast({ show: true, message, id });

    toastTimerRef.current = setTimeout(() => {
      setToast((t) => (t.id === id ? { ...t, show: false } : t));
      toastTimerRef.current = null;
    }, ms);
  }, []);

  /* ===========================================
     Monthly Revenue Loader
  ============================================ */
  const fetchMonthlyRevenue = useCallback(async () => {
    try {
      const res = await api.get("/admin/revenue/monthly");
      const months = res.data?.months || [];
      setMonthlyRevenue(months);

      if (months.length > 0) {
        const last = months[months.length - 1];
        const prev = months[months.length - 2];

        setThisMonth(last.totalRevenue || 0);
        setLastMonth(prev ? prev.totalRevenue : 0);

        if (prev && prev.totalRevenue) {
          const percent =
            ((last.totalRevenue - prev.totalRevenue) / prev.totalRevenue) *
            100;
          setGrowth(percent.toFixed(1));
        } else {
          setGrowth(0);
        }
      } else {
        setThisMonth(0);
        setLastMonth(0);
        setGrowth(0);
      }
    } catch (err) {
      console.log("Error fetching monthly revenue:", err);
      showToast("⚠ Failed to load revenue data");
    }
  }, [showToast]);

  /* ===========================================
     Dashboard Data Loader
  ============================================ */
  const fetchDashboardData = useCallback(async () => {
    try {
      const [statsRes, outletsRes, ordersRes] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/outlets"),
        api.get("/admin/recent-orders"),
      ]);

      setStats(statsRes.data || {});
      setOutlets(outletsRes.data?.performance || []);
      setRecentOrders(ordersRes.data?.orders || []);
    } catch (err) {
      showToast("⚠ Failed to load dashboard data");
    }
  }, [showToast]);

  /* ===========================================
     Render Revenue Chart (Chart.js)
  ============================================ */
  const renderRevenueChart = useCallback(() => {
    // guard
    if (!chartRef.current) return;

    // Destroy any previous instance
    if (chartInstanceRef.current) {
      try {
        chartInstanceRef.current.destroy();
      } catch (e) {
        // ignore
      }
      chartInstanceRef.current = null;
    }

    if (!monthlyRevenue || monthlyRevenue.length === 0) {
      // Nothing to show — leave an empty canvas
      return;
    }

    const labels = monthlyRevenue.map((m) =>
      // If stored as "2025-02" convert to "Feb 2025" for nicer label
      typeof m.month === "string" && m.month.includes("-")
        ? new Date(`${m.month}-01`).toLocaleString(undefined, {
            month: "short",
            year: "numeric",
          })
        : m.month
    );
    const data = monthlyRevenue.map((m) => m.totalRevenue || 0);

    const ctx = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Monthly Revenue (₹)",
            data,
            fill: true,
            tension: 0.25,
            borderWidth: 2,
            pointRadius: 3,
            // don't set colors here — pick CSS-friendly defaults, Chart.js will use default palette
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label(context) {
                const value = context.parsed.y ?? 0;
                return `₹${Number(value).toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 0,
              autoSkip: true,
            },
          },
          y: {
            ticks: {
              callback(value) {
                // format short
                if (value >= 1000000) return `₹${value / 1000000}M`;
                if (value >= 1000) return `₹${value / 1000}k`;
                return `₹${value}`;
              },
            },
          },
        },
      },
    });
  }, [monthlyRevenue]);

  /* ===========================================
     Main Effect: load data + socket setup
  ============================================ */
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    fetchDashboardData();
    fetchMonthlyRevenue();

    try {
      const serverUrl =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const socket = io(serverUrl, { transports: ["websocket"] });

      socketRef.current = socket;
      socket.emit("joinRoom", "admin-room");

      socket.on("adminOrderUpdate", (payload) => {
        // re-fetch relevant data
        fetchDashboardData();
        fetchMonthlyRevenue();

        if (payload?.type === "newOrder") showToast("🛎️ New order received");
        else if (payload?.type === "statusChange")
          showToast("🔁 Order status updated");
        else if (payload?.type === "cancelled")
          showToast("⚠ Order cancelled");
        else showToast("🔔 Dashboard updated");
      });
    } catch (err) {
      console.error("Socket error:", err);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveRoom", "admin-room");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      // destroy chart on unmount
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
        } catch (e) {
          // ignore
        }
        chartInstanceRef.current = null;
      }
    };
  }, [user, navigate, fetchDashboardData, fetchMonthlyRevenue, showToast]);

  /* Re-render chart whenever monthlyRevenue changes */
  useEffect(() => {
    renderRevenueChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyRevenue]);

  /* ===========================================
     Excel Download
  ============================================ */
  const downloadExcel = () => {
    let backend =
      process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

    backend = backend.replace(/\/$/, "");
    if (backend.endsWith("/api")) backend = backend.slice(0, -4);

    const finalURL = `${backend}/api/admin/revenue/excel`;
    window.open(finalURL, "_blank");
  };

  /* ===========================================
     Logout Handler
  ============================================ */
  const handleLogout = () => {
    logout?.();
    localStorage.removeItem("admin");
    navigate("/");
  };

  /* ===========================================
     UI
  ============================================ */
  return (
    <div className="admin-dashboard">
      <main className="admin-content-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">
          Monitor all campus food outlets and orders
        </p>

        {/* Revenue Stats */}
        <div className="stats-grid">
          <div className="stat-card green">
            <div>
              <h4>This Month Revenue</h4>
              <p className="stat-value">₹{thisMonth.toLocaleString()}</p>
              <p className="stat-change">
                {growth >= 0 ? "+" : ""}
                {growth}% from last month
              </p>
            </div>
            <span className="stat-icon">📅</span>
          </div>

          <div className="stat-card blue">
            <div>
              <h4>Last Month Revenue</h4>
              <p className="stat-value">₹{lastMonth.toLocaleString()}</p>
              <p className="stat-change">Comparison available</p>
            </div>
            <span className="stat-icon">📊</span>
          </div>

          <div className="stat-card purple">
            <div>
              <h4>Total Orders</h4>
              <p className="stat-value">{stats.totalOrders || 0}</p>
              <p className="stat-change">+15% from yesterday</p>
            </div>
            <span className="stat-icon">🧾</span>
          </div>

          <div className="stat-card orange">
            <div>
              <h4>Active Users</h4>
              <p className="stat-value">{stats.totalUsers || 0}</p>
              <p className="stat-change">+180 this month</p>
            </div>
            <span className="stat-icon">👥</span>
          </div>
        </div>

        {/* Monthly Revenue Table */}
        <div className="monthly-revenue-box">
          <h3>Monthly Revenue Report</h3>

          <button className="excel-btn" onClick={downloadExcel}>
            📥 Download Excel
          </button>

          <table className="monthly-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Total Revenue</th>
                <th>Total Orders</th>
              </tr>
            </thead>
            <tbody>
              {monthlyRevenue.length > 0 ? (
                monthlyRevenue.map((m) => (
                  <tr key={m.month}>
                    <td>{m.month}</td>
                    <td>₹{m.totalRevenue.toLocaleString()}</td>
                    <td>{m.totalOrders}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No revenue data yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Outlet Performance */}
        <div className="grid-two">
          <div className="outlet-performance">
            <h3>Outlet Performance</h3>
            <ul className="outlet-list">
              {outlets.length > 0 ? (
                outlets.map((outlet, i) => (
                  <li key={i}>
                    <div className="outlet-rank">{i + 1}</div>

                    <img src={getRestaurantImage(outlet)} alt={outlet.name} />

                    <div className="outlet-info">
                      <h4>{outlet.name}</h4>
                      <p>{outlet.orders} orders</p>
                    </div>

                    <span className="badge open">Open</span>

                    <span className="amount">
                      ₹
                      {Number(outlet.revenue || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </li>
                ))
              ) : (
                <p className="no-data">No outlet data yet</p>
              )}
            </ul>
          </div>

          <div className="revenue-trend">
            <h3>Revenue Trend</h3>

            {/* Chart container */}
            <div className="revenue-chart-box" style={{ height: 240 }}>
              <canvas ref={chartRef} />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Outlet</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Status</th>
                <th>Time</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order.orderNumber}</td>
                    <td>{order.restaurant?.restaurantName}</td>
                    <td>{order.user?.name}</td>
                    <td>{order.items.length}</td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
                    <td>₹{order.totalPrice.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No recent orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {toast.show && <div className="toast">{toast.message}</div>}
    </div>
  );
}

export default AdminDashboard;
