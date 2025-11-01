// // frontend/src/pages/Orders.js
// import { useEffect, useState, useContext } from "react";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
// import { io } from "socket.io-client";
// import "../styles/Orders.css";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     if (!user) return;

//     const fetchOrders = async () => {
//       try {
//         const res = await api.get("/orders/myorders");
//         setOrders(res.data);
//         localStorage.setItem(`orders_${user._id}`, JSON.stringify(res.data));
//       } catch (err) {
//         console.error("Backend error, fallback:", err);
//         const savedOrders =
//           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
//         setOrders(savedOrders);
//       }
//     };

//     fetchOrders();

//     // 🔌 Real-time updates
//     const socket = io("http://localhost:5000");
//     socket.emit("joinRoom", user._id);
//     console.log("📡 Joined room:", user._id);

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

//   return (
//     <div className="orders-container">
//       <h2>📦 My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="no-orders">No orders placed yet.</p>
//       ) : (
//         <div className="orders-grid">
//           {orders.map((order) => (
//             <div key={order._id} className="order-card">
//               {/* 🧾 Order Header */}
//               <div className="order-header">
//                 <h3>Order #{order._id?.slice(-6)}</h3>
//                 <p className="order-username">
//                   👤 {user?.name || user?.email || "User"}
//                 </p>
//               </div>

//               {/* 🏷️ Status + Date */}
//               <div className="order-meta">
//                 <span
//                   className={`order-status ${
//                     order.status?.toLowerCase() || "pending"
//                   }`}
//                 >
//                   {order.status || "Pending"}
//                 </span>
//                 <p className="order-date">
//                   📅 {new Date(order.createdAt).toLocaleString()}
//                 </p>
//               </div>

//               {/* 🍱 Order Items */}
//               <div className="order-body">
//                 <h4>🛍️ Ordered Items</h4>
//                 <ul>
//                   {order.items?.map((item, i) => (
//                     <li key={i}>
//                       <span className="item-name">{item.name}</span>
//                       <span className="item-qty">× {item.quantity}</span>
//                       <span className="item-price">
//                         ₹{item.price * item.quantity}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* 💰 Total */}
//               <div className="order-footer">
//                 <h4>
//                   Total Amount:{" "}
//                   <span className="order-total">
//                     ₹{order.totalPrice || order.total}
//                   </span>
//                 </h4>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;












// frontend/src/pages/Orders.js
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/myorders");
        setOrders(res.data);
        localStorage.setItem(`orders_${user._id}`, JSON.stringify(res.data));
      } catch (err) {
        console.error("Backend error, fallback:", err);
        const savedOrders =
          JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
        setOrders(savedOrders);
      }
    };

    fetchOrders();

    // 🔌 Real-time updates
    const socket = io("http://localhost:5000");
    socket.emit("joinRoom", user._id);
    console.log("📡 Joined room:", user._id);

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

  return (
    <div className="orders-container">
      <div className="header-bar">
        <h2>📦 My Orders</h2>
        <div className="orders-summary">
          <span>✅ Completed: {orders.filter(o => o.status === "Completed").length}</span>
          <span>🕓 Pending: {orders.filter(o => o.status === "Pending").length}</span>
          <span>❌ Cancelled: {orders.filter(o => o.status === "Cancelled").length}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              className={`order-card ${order.status?.toLowerCase() || "pending"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="order-status-tag">
                {order.status || "Pending"}
              </div>

              {/* Order Header */}
              <div className="order-header">
                <h3>Order #{order._id?.slice(-6)}</h3>
                <p className="order-username">
                  👤 {user?.name || user?.email || "User"}
                </p>
              </div>

              {/* Meta Info */}
              <div className="order-meta">
                <p className="order-date">
                  📅 {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Order Items */}
              <div className="order-body">
                <h4>🛍️ Ordered Items</h4>
                <ul>
                  {order.items?.map((item, i) => (
                    <li key={i}>
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">× {item.quantity}</span>
                      <span className="item-price">
                        ₹{item.price * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total */}
              <div className="order-footer">
                <h4>
                  Total Amount:{" "}
                  <span className="order-total">
                    ₹{order.totalPrice || order.total}
                  </span>
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
