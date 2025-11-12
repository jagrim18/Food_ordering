import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  // ✅ Scoped Light Theme for Orders Page
  useEffect(() => {
    document.body.classList.add("orders-light");
    return () => {
      document.body.classList.remove("orders-light");
    };
  }, []);

  // === Fetch Orders + Live Socket Updates ===
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

  // === Cancel Timer ===
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

  // === Cancel Order ===
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

  // === Invoice Modal ===
  const openInvoiceModal = async (orderId) => {
    try {
      const res = await api.get(`/orders/${orderId}/invoice`);
      setInvoiceData(res.data);
      setShowInvoiceModal(true);
    } catch (err) {
      console.error("Invoice fetch error:", err);
      alert("Failed to load invoice.");
    }
  };

  // === Tabs (Active / Past Orders) ===
  const activeOrders = orders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled"
  );
  const pastOrders = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Cancelled"
  );
  const displayedOrders = activeTab === "active" ? activeOrders : pastOrders;

  const getOrderDisplayNumber = (order) => {
    if (order.orderNumber) return order.orderNumber;
    return `#${order._id?.slice(-6)}`;
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>My Orders</h2>
        <p>Track and manage your food orders</p>
      </div>

      <div className="orders-tabs">
        <button
          className={`tab-btn ${activeTab === "active" ? "active" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active Orders ({activeOrders.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Orders ({pastOrders.length})
        </button>
      </div>

      <div className="orders-list">
        {displayedOrders.length === 0 ? (
          <p className="no-orders">
            No {activeTab === "active" ? "active" : "past"} orders found.
          </p>
        ) : (
          displayedOrders.map((order) => (
            <motion.div
              key={order._id}
              className="order-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="order-header">
                <div className="order-id">
                  <h3>Order {getOrderDisplayNumber(order)}</h3>
                  <span
                    className={`status-pill ${order.status
                      ?.toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-total">
                  Total: ₹{order.totalPrice || order.total}
                </div>
              </div>

              <div className="order-info">
                <span>📍 {order.restaurant?.name}</span>
                <span>📅 {new Date(order.createdAt).toLocaleString()}</span>
              </div>

              <div className="order-items">
                {order.items?.map((item, idx) => (
                  <div key={idx}>
                    {item.quantity}× {item.name}
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="left-actions">
                  <button
                    className="view-btn"
                    onClick={() => openInvoiceModal(order._id)}
                  >
                    View Details
                  </button>
                  {canCancel(order) && (
                    <button
                      className="cancel-btn"
                      onClick={() => openCancelModal(order)}
                    >
                      Cancel Order
                    </button>
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
          <motion.div className="confirm-modal-backdrop">
            <motion.div className="confirm-modal">
              <h3>❌ Cancel Order</h3>
              <p>
                Are you sure you want to cancel{" "}
                {getOrderDisplayNumber(selectedOrder)}?
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

      {/* Invoice Modal */}
      <AnimatePresence>
        {showInvoiceModal && invoiceData && (
          <motion.div
            className="invoice-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="invoice-popup"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="popup-header">
                <h3>Order {invoiceData.orderNumber}</h3>
                <span
                  className={`status-tag ${invoiceData.status?.toLowerCase()}`}
                >
                  {invoiceData.status}
                </span>
              </div>
              <p className="popup-sub">
                📍 {invoiceData.restaurant?.name}
                <br />
                📅 {new Date(invoiceData.date).toLocaleString()}
              </p>
              <table className="popup-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((i, idx) => (
                    <tr key={idx}>
                      <td>{i.name}</td>
                      <td>{i.quantity}</td>
                      <td>₹{i.price}</td>
                      <td>₹{i.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="popup-total">
                <h4>Total: ₹{invoiceData.totalPrice}</h4>
              </div>
              <div className="popup-actions">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="popup-close-btn"
                >
                  Close
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
