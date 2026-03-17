// frontend/src/pages/RestaurantDashboard.jsx
import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "../styles/RestaurantDashboard.css";

function RestaurantDashboard() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [avgPrep, setAvgPrep] = useState(0);
  const [activeTab, setActiveTab] = useState("active");

  // Export states
  const [exportRange, setExportRange] = useState("today"); // 'today','week','month','custom'
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [exporting, setExporting] = useState(false);

  // Load restaurant from authUser
  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (!stored) {
      navigate("/restaurant/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (parsed.role !== "restaurant") {
        navigate("/restaurant/login");
        return;
      }
      setRestaurant(parsed);
      fetchOrders();
      if (parsed._id) fetchAvgPrep(parsed._id);
    } catch (err) {
      console.error("Invalid restaurant data:", err);
      navigate("/restaurant/login");
    }
  }, [navigate]);

  // Fetch avg prep time
  const fetchAvgPrep = useCallback(async (restId) => {
    try {
      const res = await api.get(`/orders/avg-prep-time/${restId}`);
      setAvgPrep(res.data?.avgPrepTime ?? 0);
    } catch (err) {
      console.error("Failed to fetch avg prep:", err?.response?.data || err.message);
    }
  }, []);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/orders/restaurant");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch orders:", err?.response?.data || err.message);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Socket.io realtime
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    if (restaurant?._id) {
      socket.emit("joinRoom", restaurant._id);
    }

    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
      if (updatedOrder.status?.toLowerCase() === "delivered") {
        fetchAvgPrep(restaurant._id);
      }
    });

    socket.on("orderPlaced", (newOrder) => {
      if (!newOrder) return;
      const targetRestId =
        typeof newOrder.restaurant === "object"
          ? newOrder.restaurant._id
          : newOrder.restaurant;

      if (targetRestId === restaurant?._id) {
        setOrders((prev) => [newOrder, ...prev]);
      }
    });

    socket.on("adminOrderUpdate", (payload) => {
      if (!payload) return;

      if (payload.type === "newOrder" && payload.order) {
        const targetRest =
          payload.order.restaurant?._id || payload.order.restaurant;
        if (targetRest === restaurant?._id)
          setOrders((prev) => [payload.order, ...prev]);
      }

      if (payload.type === "statusChange" && payload.order) {
        setOrders((prev) =>
          prev.map((o) => (o._id === payload.order._id ? payload.order : o))
        );
      }
    });

    return () => {
      if (restaurant?._id) socket.emit("leaveRoom", restaurant._id);
      socket.disconnect();
    };
  }, [restaurant, fetchAvgPrep]);

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
      if (status.toLowerCase() === "delivered" && restaurant?._id) {
        fetchAvgPrep(restaurant._id);
      }
    } catch (err) {
      console.error("Update failed:", err?.response?.data || err.message);
    }
  };

  // Helpers
  const padOrderNumber = (num) =>
    num === undefined || num === null ? "#" : String(num).padStart(2, "0");

  const getOrderDisplayNumber = (order) =>
    order.orderNumber
      ? padOrderNumber(order.orderNumber)
      : `#${order._id?.slice(-6)}`;

  const getNextStatus = (current) => {
    const map = {
      pending: "Accepted",
      accepted: "Preparing",
      preparing: "Delivered",
    };
    return map[current?.toLowerCase()] || null;
  };

  const getButtonText = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "Accept Order";
    if (s === "accepted") return "Start Preparing";
    if (s === "preparing") return "Complete Order";
    return "";
  };

  // Sort
  const sortedOrders = [...orders].sort((a, b) => {
    const orderFlow = ["pending", "accepted", "preparing", "delivered", "cancelled"];
    return (
      orderFlow.indexOf(a.status.toLowerCase()) -
      orderFlow.indexOf(b.status.toLowerCase())
    );
  });

  // 🔥 FILTERED LISTS
  const activeOrdersList = sortedOrders.filter((o) =>
    ["pending", "accepted", "preparing"].includes(o.status?.toLowerCase())
  );

  const pastOrdersList = sortedOrders.filter((o) =>
    ["delivered", "cancelled"].includes(o.status?.toLowerCase())
  );

  const displayOrders =
    activeTab === "active" ? activeOrdersList : pastOrdersList;

  // Stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status?.toLowerCase() === "pending"
  ).length;
  const totalRevenue = orders
    .filter((o) => o.status?.toLowerCase() === "delivered")
    .reduce((sum, o) => sum + (o.total || o.totalPrice || 0), 0);

  // ---------- Export helpers ----------
  const computeRange = () => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    if (exportRange === "today") {
      const d = now.toISOString().slice(0,10);
      return { start: d, end: d };
    }
    if (exportRange === "yesterday") {
      const y = new Date(Date.now() - 86400000);
      const d = y.toISOString().slice(0,10);
      return { start: d, end: d };
    }
    if (exportRange === "week") {
      // last 7 days including today
      const end = new Date(now);
      const start = new Date(now);
      start.setUTCDate(start.getUTCDate() - 6);
      return { start: start.toISOString().slice(0,10), end: end.toISOString().slice(0,10) };
    }
    if (exportRange === "month") {
      const end = new Date(now);
      const start = new Date(now);
      start.setUTCDate(start.getUTCDate() - 29);
      return { start: start.toISOString().slice(0,10), end: end.toISOString().slice(0,10) };
    }
    if (exportRange === "custom") {
      if (!customStart || !customEnd) return null;
      return { start: customStart, end: customEnd };
    }
    return null;
  };

  const handleExport = async () => {
  try {
    setExporting(true);
    const range = computeRange();
    if (!range) {
      alert("Please select date range (custom start & end if using custom).");
      setExporting(false);
      return;
    }

    const params = `?start=${range.start}&end=${range.end}`;
    const res = await api.get(`/restaurants/export-excel${params}`);

    if (res.data && res.data.filePath) {
      // FIX: Build correct base URL and remove /api
      let base = process.env.REACT_APP_API_URL || "";

      // Remove trailing slash
      base = base.replace(/\/+$/, "");

      // Remove /api at the end
      base = base.replace(/\/api$/, "");

      // Construct final URL
      const downloadUrl = base + res.data.filePath;

      // Open Excel in new tab
      window.open(downloadUrl, "_blank");
    } 
    else if (res.data && res.data.url) {
      window.open(res.data.url, "_blank");
    } 
    else {
      alert("Report generated but could not obtain download URL.");
    }
  } catch (err) {
    console.error("Export failed:", err?.response?.data || err.message);
    alert("Export failed. See console for details.");
  } finally {
    setExporting(false);
  }
};

  return (
    <div
      className="restaurant-dashboard"
      data-theme={localStorage.getItem("theme") || "light"}
    >
      <header className="dashboard-top">
        <h1 className="dashboard-title">
          {restaurant ? `${restaurant.name} Dashboard` : "Restaurant Dashboard"}
        </h1>
        <p className="dashboard-subtext">
          Manage your orders and view analytics
        </p>
      </header>

      {/* EXPORT UI */}
      <div className="export-panel" style={{ display: "flex", gap: "0.75rem", alignItems: "center", margin: "1rem 0" }}>
        <label style={{ fontWeight: 600 }}>Export:</label>

        <select value={exportRange} onChange={(e) => setExportRange(e.target.value)}>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
          <option value="custom">Custom range</option>
        </select>

        {exportRange === "custom" && (
          <>
            <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} />
            <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} />
          </>
        )}

        <button onClick={handleExport} disabled={exporting} style={{ padding: "0.5rem 0.9rem" }}>
          {exporting ? "Exporting..." : "Download Excel"}
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="stats-cards">
        <div className="stat-card green">
          <h3 className="stat-title">Today's Revenue</h3>
          <p className="stat-value">₹{totalRevenue.toFixed(2)}</p>
          <span className="stat-sub">Compared to yesterday</span>
        </div>

        <div className="stat-card blue">
          <h3 className="stat-title">Total Orders</h3>
          <p className="stat-value">{totalOrders}</p>
          <span className="stat-sub">All-time</span>
        </div>

        <div className="stat-card yellow">
          <h3 className="stat-title">Pending Orders</h3>
          <p className="stat-value">{pendingOrders}</p>
          <span className="stat-sub">Awaiting confirmation</span>
        </div>

        <div className="stat-card purple">
          <h3 className="stat-title">Avg. Prep Time</h3>
          <p className="stat-value">{avgPrep} min</p>
          <span className="stat-sub">Based on last 100 delivered orders</span>
        </div>
      </div>

      {/* 🟩 FILTER TABS */}
      <div className="orders-tabs">
        <button
          className={`tab-btn ${activeTab === "active" ? "active" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active Orders ({activeOrdersList.length})
        </button>

        <button
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Orders ({pastOrdersList.length})
        </button>
      </div>

      {/* ORDERS LIST */}
      <div className="orders-list">
        {loading ? (
          <p className="no-orders">Loading orders...</p>
        ) : error ? (
          <p className="no-orders">{error}</p>
        ) : displayOrders.length === 0 ? (
          <p className="no-orders">
            {activeTab === "active"
              ? "No active orders."
              : "No past orders yet."}
          </p>
        ) : (
          displayOrders.map((order) => (
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
                    ₹{(order.totalPrice || order.total || 0).toFixed(2)}
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
                <p className="customer-name">{order.user?.name || "Unknown"}</p>
                <p className="customer-email">{order.user?.email || "No email"}</p>
              </div>

              <ul className="order-items">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>₹{item.price}</span>
                  </li>
                ))}
              </ul>

              {activeTab === "active" && (
                <div className="order-actions">
                  {["pending", "accepted", "preparing"].includes(
                    order.status?.toLowerCase()
                  ) && (
                    <button
                      className="accept-btn"
                      onClick={() => {
                        const next = getNextStatus(order.status);
                        if (next) updateOrderStatus(order._id, next);
                      }}
                    >
                      {getButtonText(order.status)}
                    </button>
                  )}

                  {order.status?.toLowerCase() === "pending" && (
                    <button
                      className="decline-btn"
                      onClick={() => updateOrderStatus(order._id, "Cancelled")}
                    >
                      Decline
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RestaurantDashboard;
