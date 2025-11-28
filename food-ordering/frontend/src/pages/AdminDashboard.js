// // src/pages/AdminDashboard.js
// import { useContext, useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import api from "../utils/api";
// import { io } from "socket.io-client";
// import "../styles/AdminDashboard.css";
// import Chart from "chart.js/auto";

// const API_BASE =
//   process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// /* =======================================================
//    Universal Image Resolver
// ======================================================= */
// const getRestaurantImage = (outlet) => {
//   if (!outlet) return "/images/default-restaurant.png";

//   const img =
//     outlet.image ||
//     outlet.profileImage ||
//     outlet.profilePic ||
//     (outlet.galleryImages && outlet.galleryImages[0]);

//   if (!img) return "/images/default-restaurant.png";

//   if (img.startsWith("http")) return img;

//   return `${API_BASE}${img.startsWith("/") ? img : "/" + img}`;
// };

// function AdminDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({});
//   const [outlets, setOutlets] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);

//   const [monthlyRevenue, setMonthlyRevenue] = useState([]);
//   const [dailyRevenue, setDailyRevenue] = useState([]);

//   const [thisMonth, setThisMonth] = useState(0);
//   const [lastMonth, setLastMonth] = useState(0);
//   const [growth, setGrowth] = useState(0);

//   const [toast, setToast] = useState({ show: false, message: "", id: null });
//   const toastTimerRef = useRef(null);
//   const socketRef = useRef(null);

//   // Chart refs
//   const monthlyChartRef = useRef(null);
//   const monthlyChartInst = useRef(null);
//   const dailyChartRef = useRef(null);
//   const dailyChartInst = useRef(null);

//   const showToast = useCallback((message, ms = 2500) => {
//     if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

//     const id = Date.now();
//     setToast({ show: true, message, id });

//     toastTimerRef.current = setTimeout(() => {
//       setToast((t) => (t.id === id ? { ...t, show: false } : t));
//       toastTimerRef.current = null;
//     }, ms);
//   }, []);

//   // MONTHLY
//   const fetchMonthlyRevenue = useCallback(async () => {
//     try {
//       const res = await api.get("/admin/revenue/monthly");
//       const months = res.data?.months || [];
//       setMonthlyRevenue(months);

//       if (months.length > 0) {
//         const last = months[months.length - 1];
//         const prev = months[months.length - 2];

//         setThisMonth(last.totalRevenue || 0);
//         setLastMonth(prev ? prev.totalRevenue : 0);

//         if (prev && prev.totalRevenue) {
//           const percent =
//             ((last.totalRevenue - prev.totalRevenue) / prev.totalRevenue) *
//             100;
//           setGrowth(percent.toFixed(1));
//         } else {
//           setGrowth(0);
//         }
//       } else {
//         setThisMonth(0);
//         setLastMonth(0);
//         setGrowth(0);
//       }
//     } catch (err) {
//       console.log("Error fetching monthly revenue:", err);
//       showToast("⚠ Failed to load revenue data");
//     }
//   }, [showToast]);

//   // DAILY
//   const fetchDailyRevenue = useCallback(async (days = 30) => {
//     try {
//       const res = await api.get(`/admin/revenue/daily?days=${days}`);
//       const daysData = res.data?.days || [];
//       setDailyRevenue(daysData);
//     } catch (err) {
//       console.error("Error fetching daily revenue:", err);
//       showToast("⚠ Failed to load daily revenue");
//     }
//   }, [showToast]);

//   const fetchDashboardData = useCallback(async () => {
//     try {
//       const [statsRes, outletsRes, ordersRes] = await Promise.all([
//         api.get("/admin/dashboard"),
//         api.get("/admin/outlets"),
//         api.get("/admin/recent-orders"),
//       ]);

//       setStats(statsRes.data || {});
//       setOutlets(outletsRes.data?.performance || []);
//       setRecentOrders(ordersRes.data?.orders || []);
//     } catch (err) {
//       showToast("⚠ Failed to load dashboard data");
//     }
//   }, [showToast]);

//   // Render monthly chart
//   const renderMonthlyChart = useCallback(() => {
//     if (!monthlyChartRef.current) return;
//     if (monthlyChartInst.current) {
//       try { monthlyChartInst.current.destroy(); } catch(e) {}
//       monthlyChartInst.current = null;
//     }
//     if (!monthlyRevenue || monthlyRevenue.length === 0) return;

//     const labels = monthlyRevenue.map((m) =>
//       typeof m.month === "string" && m.month.includes("-")
//         ? new Date(`${m.month}-01`).toLocaleString(undefined, { month: "short", year: "numeric" })
//         : m.month
//     );
//     const data = monthlyRevenue.map((m) => m.totalRevenue || 0);

//     const ctx = monthlyChartRef.current.getContext("2d");
//     monthlyChartInst.current = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels,
//         datasets: [
//           {
//             label: "Monthly Revenue (₹)",
//             data,
//             fill: true,
//             tension: 0.25,
//             borderWidth: 2,
//             pointRadius: 3,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           tooltip: {
//             callbacks: {
//               label(ctx) {
//                 const v = ctx.parsed.y ?? 0;
//                 return `₹${Number(v).toLocaleString()}`;
//               },
//             },
//           },
//         },
//         scales: {
//           y: {
//             ticks: {
//               callback(value) {
//                 if (value >= 1000000) return `₹${value / 1000000}M`;
//                 if (value >= 1000) return `₹${value / 1000}k`;
//                 return `₹${value}`;
//               },
//             },
//           },
//         },
//       },
//     });
//   }, [monthlyRevenue]);

//   // Render daily chart
//   const renderDailyChart = useCallback(() => {
//     if (!dailyChartRef.current) return;
//     if (dailyChartInst.current) {
//       try { dailyChartInst.current.destroy(); } catch(e) {}
//       dailyChartInst.current = null;
//     }
//     if (!dailyRevenue || dailyRevenue.length === 0) return;

//     const labels = dailyRevenue.map((d) =>
//       new Date(d.day).toLocaleString(undefined, { month: "short", day: "numeric" })
//     );
//     const data = dailyRevenue.map((d) => d.totalRevenue || 0);

//     const ctx = dailyChartRef.current.getContext("2d");
//     dailyChartInst.current = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels,
//         datasets: [
//           {
//             label: "Daily Revenue (₹)",
//             data,
//             barPercentage: 0.8,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           tooltip: {
//             callbacks: {
//               label(ctx) {
//                 const v = ctx.parsed.y ?? 0;
//                 return `₹${Number(v).toLocaleString()}`;
//               },
//             },
//           },
//         },
//         scales: {
//           y: {
//             ticks: {
//               callback(value) {
//                 if (value >= 1000000) return `₹${value / 1000000}M`;
//                 if (value >= 1000) return `₹${value / 1000}k`;
//                 return `₹${value}`;
//               },
//             },
//           },
//         },
//       },
//     });
//   }, [dailyRevenue]);

//   useEffect(() => { renderMonthlyChart(); }, [monthlyRevenue, renderMonthlyChart]);
//   useEffect(() => { renderDailyChart(); }, [dailyRevenue, renderDailyChart]);

//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       navigate("/admin/login");
//       return;
//     }

//     fetchDashboardData();
//     fetchMonthlyRevenue();
//     fetchDailyRevenue(30);

//     try {
//       const serverUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
//       const socket = io(serverUrl, { transports: ["websocket"] });
//       socketRef.current = socket;
//       socket.emit("joinRoom", "admin-room");

//       socket.on("adminOrderUpdate", (payload) => {
//         fetchDashboardData();
//         fetchMonthlyRevenue();
//         fetchDailyRevenue(30);

//         if (payload?.type === "newOrder") showToast("🛎️ New order received");
//         else if (payload?.type === "statusChange") showToast("🔁 Order status updated");
//         else if (payload?.type === "cancelled") showToast("⚠ Order cancelled");
//         else showToast("🔔 Dashboard updated");
//       });
//     } catch (err) {
//       console.error("Socket error:", err);
//     }

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.emit("leaveRoom", "admin-room");
//         socketRef.current.disconnect();
//         socketRef.current = null;
//       }
//       if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
//       if (monthlyChartInst.current) { try { monthlyChartInst.current.destroy(); } catch(e) {} monthlyChartInst.current = null; }
//       if (dailyChartInst.current) { try { dailyChartInst.current.destroy(); } catch(e) {} dailyChartInst.current = null; }
//     };
//   }, [user, navigate, fetchDashboardData, fetchMonthlyRevenue, fetchDailyRevenue, showToast]);

//   const downloadExcel = () => {
//     let backend = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";
//     backend = backend.replace(/\/$/, "");
//     if (backend.endsWith("/api")) backend = backend.slice(0, -4);
//     const finalURL = `${backend}/api/admin/revenue/excel`;
//     window.open(finalURL, "_blank");
//   };

//   const handleLogout = () => {
//     logout?.();
//     localStorage.removeItem("admin");
//     navigate("/");
//   };

//   return (
//     <div className="admin-dashboard">
//       <main className="admin-content-container">
//         <h1 className="dashboard-title">Admin Dashboard</h1>
//         <p className="dashboard-subtitle">Monitor all campus food outlets and orders</p>

//         {/* Stats grid */}
//         <div className="stats-grid">
//           <div className="stat-card green">
//             <div>
//               <h4>This Month Revenue</h4>
//               <p className="stat-value">₹{thisMonth.toLocaleString()}</p>
//               <p className="stat-change">{growth >= 0 ? "+" : ""}{growth}% from last month</p>
//             </div>
//             <span className="stat-icon">📅</span>
//           </div>

//           <div className="stat-card blue">
//             <div>
//               <h4>Last Month Revenue</h4>
//               <p className="stat-value">₹{lastMonth.toLocaleString()}</p>
//               <p className="stat-change">Comparison available</p>
//             </div>
//             <span className="stat-icon">📊</span>
//           </div>

//           <div className="stat-card purple">
//             <div>
//               <h4>Total Orders</h4>
//               <p className="stat-value">{stats.totalOrders || 0}</p>
//               <p className="stat-change">+15% from yesterday</p>
//             </div>
//             <span className="stat-icon">🧾</span>
//           </div>

//           <div className="stat-card orange">
//             <div>
//               <h4>Active Users</h4>
//               <p className="stat-value">{stats.totalUsers || 0}</p>
//               <p className="stat-change">+180 this month</p>
//             </div>
//             <span className="stat-icon">👥</span>
//           </div>
//         </div>

//         {/* Revenue charts */}
//         <div className="grid-two">
//           <div className="revenue-trend">
//             <h3>Daily Revenue (last 30 days)</h3>
//             <div className="revenue-chart-box" style={{ height: 240 }}>
//               <canvas ref={dailyChartRef} />
//             </div>

//             <h3 style={{ marginTop: 20 }}>Monthly Revenue</h3>
//             <div className="revenue-chart-box" style={{ height: 240 }}>
//               <canvas ref={monthlyChartRef} />
//             </div>
//           </div>

//           <div className="outlet-performance">
//             <h3>Outlet Performance</h3>
//             <ul className="outlet-list">
//               {outlets.length > 0 ? (
//                 outlets.map((outlet, i) => (
//                   <li key={i}>
//                     <div className="outlet-rank">{i + 1}</div>
//                     <img src={getRestaurantImage(outlet)} alt={outlet.name} />
//                     <div className="outlet-info">
//                       <h4>{outlet.name}</h4>
//                       <p>{outlet.orders} orders</p>
//                     </div>
//                     <span className={`badge ${outlet.isOpen ? "open" : "closed"}`}>
//   {outlet.isOpen ? "Open" : "Closed"}
// </span>
//                     <span className="amount">₹{Number(outlet.revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//                   </li>
//                 ))
//               ) : (
//                 <p className="no-data">No outlet data yet</p>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Monthly revenue table */}
//         <div className="monthly-revenue-box">
//           <h3>Monthly Revenue Report</h3>
//           <button className="excel-btn" onClick={downloadExcel}>📥 Download Excel</button>
//           <table className="monthly-table">
//             <thead>
//               <tr><th>Month</th><th>Total Revenue</th><th>Total Orders</th></tr>
//             </thead>
//             <tbody>
//               {monthlyRevenue.length > 0 ? (
//                 monthlyRevenue.map((m) => (
//                   <tr key={m.month}>
//                     <td>{m.month}</td>
//                     <td>₹{m.totalRevenue.toLocaleString()}</td>
//                     <td>{m.totalOrders}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr><td colSpan="3">No revenue data yet</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Recent Orders */}
//         <div className="recent-orders">
//           <h3>Recent Orders</h3>
//           <table>
//             <thead>
//               <tr><th>Order ID</th><th>Outlet</th><th>Customer</th><th>Items</th><th>Status</th><th>Time</th><th>Amount</th></tr>
//             </thead>
//             <tbody>
//               {recentOrders.length > 0 ? (
//                 recentOrders.map((order) => (
//                   <tr key={order._id}>
//                     <td>#{order.orderNumber}</td>
//                     <td>{order.restaurant?.restaurantName}</td>
//                     <td>{order.user?.name}</td>
//                     <td>{order.items.length}</td>
//                     <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
//                     <td>{new Date(order.createdAt).toLocaleTimeString()}</td>
//                     <td>₹{order.totalPrice.toLocaleString()}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr><td colSpan="7" className="no-data">No recent orders</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>

//       {toast.show && <div className="toast">{toast.message}</div>}
//     </div>
//   );
// }

// export default AdminDashboard;




// src/pages/AdminDashboard.js
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { io } from "socket.io-client";
import "../styles/AdminDashboard.css";
import Chart from "chart.js/auto";

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
  const [dailyRevenue, setDailyRevenue] = useState([]);

  const [thisMonth, setThisMonth] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);
  const [growth, setGrowth] = useState(0);

  const [toast, setToast] = useState({ show: false, message: "", id: null });
  const toastTimerRef = useRef(null);
  const socketRef = useRef(null);

  // Chart refs
  const monthlyChartRef = useRef(null);
  const monthlyChartInst = useRef(null);
  const dailyChartRef = useRef(null);
  const dailyChartInst = useRef(null);

  const showToast = useCallback((message, ms = 2500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

    const id = Date.now();
    setToast({ show: true, message, id });

    toastTimerRef.current = setTimeout(() => {
      setToast((t) => (t.id === id ? { ...t, show: false } : t));
      toastTimerRef.current = null;
    }, ms);
  }, []);

  // MONTHLY
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
      showToast("⚠ Failed to load revenue data");
    }
  }, [showToast]);

  // DAILY
  const fetchDailyRevenue = useCallback(async (days = 30) => {
    try {
      const res = await api.get(`/admin/revenue/daily?days=${days}`);
      const daysData = res.data?.days || [];
      setDailyRevenue(daysData);
    } catch (err) {
      showToast("⚠ Failed to load daily revenue");
    }
  }, [showToast]);

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

  /* =======================================================
       DAILY LINE CHART (UPDATED)
  ======================================================= */
  const renderDailyChart = useCallback(() => {
    if (!dailyChartRef.current) return;

    if (dailyChartInst.current) {
      try { dailyChartInst.current.destroy(); } catch (e) {}
      dailyChartInst.current = null;
    }

    if (!dailyRevenue || dailyRevenue.length === 0) return;

    const labels = dailyRevenue.map((d) =>
      new Date(d.day).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
      })
    );

    const data = dailyRevenue.map((d) => d.totalRevenue || 0);

    const ctx = dailyChartRef.current.getContext("2d");

    dailyChartInst.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Daily Revenue (₹)",
            data,
            borderWidth: 2,
            tension: 0.3, // smooth curve
            fill: true,   // area fill
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label(ctx) {
                const v = ctx.parsed.y ?? 0;
                return `₹${Number(v).toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback(value) {
                if (value >= 1000000) return `₹${value / 1000000}M`;
                if (value >= 1000) return `₹${value / 1000}k`;
                return `₹${value}`;
              },
            },
          },
        },
      },
    });
  }, [dailyRevenue]);

  /* =======================================================
       MONTHLY CHART
  ======================================================= */
  const renderMonthlyChart = useCallback(() => {
    if (!monthlyChartRef.current) return;

    if (monthlyChartInst.current) {
      try { monthlyChartInst.current.destroy(); } catch (e) {}
      monthlyChartInst.current = null;
    }

    if (!monthlyRevenue || monthlyRevenue.length === 0) return;

    const labels = monthlyRevenue.map((m) =>
      typeof m.month === "string" && m.month.includes("-")
        ? new Date(`${m.month}-01`).toLocaleString(undefined, {
            month: "short",
            year: "numeric",
          })
        : m.month
    );

    const data = monthlyRevenue.map((m) => m.totalRevenue || 0);

    const ctx = monthlyChartRef.current.getContext("2d");

    monthlyChartInst.current = new Chart(ctx, {
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
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label(ctx) {
                const v = ctx.parsed.y ?? 0;
                return `₹${Number(v).toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback(value) {
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

  /* =======================================================
       HOOKS
  ======================================================= */
  useEffect(() => { renderMonthlyChart(); }, [monthlyRevenue, renderMonthlyChart]);
  useEffect(() => { renderDailyChart(); }, [dailyRevenue, renderDailyChart]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    fetchDashboardData();
    fetchMonthlyRevenue();
    fetchDailyRevenue(30);

    try {
      const serverUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const socket = io(serverUrl, { transports: ["websocket"] });
      socketRef.current = socket;
      socket.emit("joinRoom", "admin-room");

      socket.on("adminOrderUpdate", (payload) => {
        fetchDashboardData();
        fetchMonthlyRevenue();
        fetchDailyRevenue(30);

        if (payload?.type === "newOrder") showToast("🛎️ New order received");
        else if (payload?.type === "statusChange") showToast("🔁 Order status updated");
        else if (payload?.type === "cancelled") showToast("⚠ Order cancelled");
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
      if (monthlyChartInst.current) { try { monthlyChartInst.current.destroy(); } catch (e) {} monthlyChartInst.current = null; }
      if (dailyChartInst.current) { try { dailyChartInst.current.destroy(); } catch (e) {} dailyChartInst.current = null; }
    };
  }, [
    user,
    navigate,
    fetchDashboardData,
    fetchMonthlyRevenue,
    fetchDailyRevenue,
    showToast,
  ]);

  const downloadExcel = () => {
    let backend = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";
    backend = backend.replace(/\/$/, "");
    if (backend.endsWith("/api")) backend = backend.slice(0, -4);
    const finalURL = `${backend}/api/admin/revenue/excel`;
    window.open(finalURL, "_blank");
  };

  const handleLogout = () => {
    logout?.();
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <main className="admin-content-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Monitor all campus food outlets and orders</p>

        {/* Stats grid */}
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

        {/* Revenue charts */}
        <div className="grid-two">
          <div className="revenue-trend">
            <h3>Daily Revenue (last 30 days)</h3>
            <div className="revenue-chart-box" style={{ height: 240 }}>
              <canvas ref={dailyChartRef} />
            </div>

            <h3 style={{ marginTop: 20 }}>Monthly Revenue</h3>
            <div className="revenue-chart-box" style={{ height: 240 }}>
              <canvas ref={monthlyChartRef} />
            </div>
          </div>

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
                    <span
                      className={`badge ${
                        outlet.isOpen ? "open" : "closed"
                      }`}
                    >
                      {outlet.isOpen ? "Open" : "Closed"}
                    </span>
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
        </div>

        {/* Monthly revenue table */}
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
                      <span
                        className={`status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
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
