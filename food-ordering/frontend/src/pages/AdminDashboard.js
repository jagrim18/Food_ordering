// export default AdminDashboard;
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import { io } from "socket.io-client";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({});
  const [outlets, setOutlets] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const [toast, setToast] = useState({ show: false, message: "", id: null });
  const toastTimerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/login");
      return;
    }

    fetchDashboardData();

    try {
      const serverUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const socket = io(serverUrl, { transports: ["websocket"] });
      socketRef.current = socket;

      socket.emit("joinRoom", "admin-room");

      socket.on("adminOrderUpdate", (payload) => {
        fetchDashboardData();
        if (payload?.type === "newOrder") showToast("🛎️ New order received");
        else if (payload?.type === "statusChange") showToast("🔁 Order status updated");
        else if (payload?.type === "cancelled") showToast("⚠️ Order cancelled");
        else showToast("🔔 Dashboard updated");
      });

      socket.on("orderPlaced", () => {
        fetchDashboardData();
        showToast("🛎️ New order received");
      });
    } catch (err) {
      console.warn("Socket connection failed:", err);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveRoom", "admin-room");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      clearToastTimer();
    };
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, outletsRes, ordersRes] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/outlets"),
        api.get("/admin/recent-orders"),
      ]);
      setStats(statsRes.data || {});
      setOutlets(outletsRes.data?.performance || outletsRes.data || []);
      setRecentOrders(ordersRes.data?.orders || ordersRes.data || []);
    } catch (err) {
      console.error("❌ Error loading dashboard:", err);
      showToast("⚠️ Failed to load dashboard data");
    }
  };

  const handleLogout = () => {
    logout?.();
    localStorage.removeItem("admin");
    navigate("/");
  };

  const clearToastTimer = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  };

  const showToast = (message, ms = 2800) => {
    clearToastTimer();
    const id = Date.now();
    setToast({ show: true, message, id });
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => (t.id === id ? { ...t, show: false } : t));
      toastTimerRef.current = null;
    }, ms);
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <main className="admin-content-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">
          Monitor all campus food outlets and orders
        </p>

        {/* ====== STATS ====== */}
        <div className="stats-grid">
          <div className="stat-card green">
            <div>
              <h4>Total Revenue</h4>
              <p className="stat-value">
                ₹{Number(stats.totalRevenue || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="stat-change">+20.1% from last month</p>
            </div>
            <span className="stat-icon">💲</span>
          </div>

          <div className="stat-card blue">
            <div>
              <h4>Total Orders</h4>
              <p className="stat-value">{stats.totalOrders || 0}</p>
              <p className="stat-change">+15% from yesterday</p>
            </div>
            <span className="stat-icon">🧾</span>
          </div>

          <div className="stat-card purple">
            <div>
              <h4>Active Outlets</h4>
              <p className="stat-value">{stats.totalRestaurants || 0}</p>
              <p className="stat-change">Outlets currently open</p>
            </div>
            <span className="stat-icon">🏠</span>
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

        {/* ===== OUTLET PERFORMANCE ===== */}
        <div className="grid-two">
          <div className="outlet-performance">
            <h3>Outlet Performance</h3>
            <ul className="outlet-list">
              {outlets.length > 0 ? (
                outlets.map((outlet, i) => (
                  <li key={i}>
                    <div className="outlet-rank">{i + 1}</div>
                    <img
                      src={outlet.image || "/images/default-restaurant.png"}
                      alt={outlet.name}
                    />
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
            <div className="chart-placeholder">
              <p>
                📈 Revenue chart would go here
                <br />
                <span>(Use recharts library for actual implementation)</span>
              </p>
            </div>
          </div>
        </div>

        {/* ===== RECENT ORDERS ===== */}
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
                    <td>#{order.orderNumber || String(order._id).slice(-5)}</td>
                    <td>{order.restaurant?.restaurantName || order.restaurant?.name}</td>
                    <td>{order.user?.name}</td>
                    <td>{(order.items || []).length} items</td>
                    <td>
                      <span
                        className={`status ${String(order.status || "").toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleTimeString() : "--"}</td>
                    <td>
                      ₹
                      {Number(order.totalPrice || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No recent orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {toast.show && (
        <div className="toast">{toast.message}</div>
      )}
    </div>
  );
}

export default AdminDashboard;
