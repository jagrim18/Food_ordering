// // // import React, { useEffect, useState } from "react";
// // // import api from "../utils/api";
// // // import "../styles/RestaurantOrders.css"; // ✅ import CSS

// // // function RestaurantOrders() {
// // //   const [orders, setOrders] = useState([]);

// // //   useEffect(() => {
// // //     fetchOrders();
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
// // //       await api.put(`/orders/${orderId}/status`, { status: nextStatus });
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
// // //               <strong>Total:</strong> ₹{order.totalPrice}
// // //             </p>

// // //             <div className="order-footer">
// // //               <span className={`status-badge status-${order.status.toLowerCase()}`}>
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
// //     fetchOrders();

// //     // ✅ Setup socket listener
// //     const socket = io("http://localhost:5000");

// //     socket.on("orderPlaced", (newOrder) => {
// //       setOrders((prev) => [newOrder, ...prev]);
// //     });

// //     socket.on("orderUpdated", (updatedOrder) => {
// //       setOrders((prev) =>
// //         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// //       );
// //     });

// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, []);

// //   const fetchOrders = async () => {
// //     try {
// //       const res = await api.get("/orders/restaurant");
// //       setOrders(res.data);
// //     } catch (err) {
// //       console.error("Error fetching orders", err);
// //     }
// //   };

// //   const stages = ["Pending", "Preparing", "Ready", "Delivered"];

// //   const updateStatus = async (orderId, currentStatus) => {
// //     const currentIndex = stages.indexOf(currentStatus);
// //     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

// //     const nextStatus = stages[currentIndex + 1];

// //     try {
// //       await api.put(`/orders/${orderId}/status`, { status: nextStatus });
// //     } catch (err) {
// //       console.error("Error updating order status", err);
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
// //               <strong>Total:</strong> ₹{order.total}
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

//   useEffect(() => {
//     fetchOrders();

//     // ✅ Setup socket listener
//     const socket = io("http://localhost:5000");

//     socket.on("orderPlaced", (newOrder) => {
//       setOrders((prev) => [newOrder, ...prev]);
//     });

//     socket.on("orderUpdated", (updatedOrder) => {
//       setOrders((prev) =>
//         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
//       );
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/orders/restaurant");
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching orders", err);
//     }
//   };

//   const stages = ["Pending", "Preparing", "Ready", "Delivered"];

//   const updateStatus = async (orderId, currentStatus) => {
//     const currentIndex = stages.indexOf(currentStatus);
//     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

//     const nextStatus = stages[currentIndex + 1];

//     try {
//       // ✅ Get restaurant token from localStorage
//       const restaurant = JSON.parse(localStorage.getItem("restaurant"));
//       const token = restaurant?.token;

//       await api.put(
//         `/orders/${orderId}/status`,
//         { status: nextStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ send token
//           },
//         }
//       );

//       // ✅ Update state immediately for smooth UI
//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === orderId ? { ...o, status: nextStatus } : o
//         )
//       );
//     } catch (err) {
//       console.error("Error updating order status", err);
//     }
//   };

//   return (
//     <div className="orders-page">
//       <h2 className="orders-title">📦 Incoming Orders</h2>

//       <div className="orders-grid">
//         {orders.map((order) => (
//           <div key={order._id} className="order-card">
//             <p>
//               <strong>User:</strong> {order.user?.name || "Unknown"}
//             </p>
//             <p>
//               <strong>Items:</strong>{" "}
//               {order.items
//                 .map((item) => `${item.name} x${item.quantity}`)
//                 .join(", ")}
//             </p>
//             <p>
//               <strong>Total:</strong> ₹{order.total}
//             </p>

//             <div className="order-footer">
//               <span
//                 className={`status-badge status-${order.status.toLowerCase()}`}
//               >
//                 {order.status}
//               </span>

//               {order.status !== "Delivered" && (
//                 <button
//                   onClick={() => updateStatus(order._id, order.status)}
//                   className="next-btn"
//                 >
//                   Next ➡
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RestaurantOrders;














// import React, { useEffect, useState } from "react";
// import api from "../utils/api";
// import { io } from "socket.io-client";
// import "../styles/RestaurantOrders.css";

// function RestaurantOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();

//     // ✅ Setup socket listener
//     const socket = io("http://localhost:5000");

//     socket.on("orderPlaced", (newOrder) => {
//       setOrders((prev) => [newOrder, ...prev]);
//     });

//     socket.on("orderUpdated", (updatedOrder) => {
//       setOrders((prev) =>
//         prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
//       );
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // ✅ Fetch orders with restaurant token
//   const fetchOrders = async () => {
//     try {
//       const restaurant = JSON.parse(localStorage.getItem("restaurant"));
//       const token = restaurant?.token;

//       const res = await api.get("/orders/restaurant", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching orders", err.response?.data || err.message);
//     }
//   };

//   const stages = ["Pending", "Preparing", "Ready", "Delivered"];

//   const updateStatus = async (orderId, currentStatus) => {
//     const currentIndex = stages.indexOf(currentStatus);
//     if (currentIndex === -1 || currentIndex === stages.length - 1) return;

//     const nextStatus = stages[currentIndex + 1];

//     try {
//       const restaurant = JSON.parse(localStorage.getItem("restaurant"));
//       const token = restaurant?.token;

//       await api.put(
//         `/orders/${orderId}/status`,
//         { status: nextStatus },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // ✅ Optimistic UI update
//       setOrders((prev) =>
//         prev.map((o) =>
//           o._id === orderId ? { ...o, status: nextStatus } : o
//         )
//       );
//     } catch (err) {
//       console.error("Error updating order status", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="orders-page">
//       <h2 className="orders-title">📦 Incoming Orders</h2>

//       <div className="orders-grid">
//         {orders.map((order) => (
//           <div key={order._id} className="order-card">
//             <p>
//               <strong>User:</strong> {order.user?.name || "Unknown"}
//             </p>
//             <p>
//               <strong>Items:</strong>{" "}
//               {order.items
//                 .map((item) => `${item.name} x${item.quantity}`)
//                 .join(", ")}
//             </p>
//             <p>
//               <strong>Total:</strong> ₹{order.totalPrice}
//             </p>

//             <div className="order-footer">
//               <span
//                 className={`status-badge status-${order.status.toLowerCase()}`}
//               >
//                 {order.status}
//               </span>

//               {order.status !== "Delivered" && (
//                 <button
//                   onClick={() => updateStatus(order._id, order.status)}
//                   className="next-btn"
//                 >
//                   Next ➡
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
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

  useEffect(() => {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    if (!restaurant) return;

    const token = restaurant.token;
    const restaurantId = restaurant._id;

    fetchOrders(token);

    // ✅ Setup socket listener
    const socket = io("http://localhost:5000");

    // ✅ Join restaurant room
    if (restaurantId) {
      socket.emit("joinRoom", restaurantId);
      console.log("📡 Joined room:", restaurantId);
    }

    socket.on("orderPlaced", (newOrder) => {
      console.log("🆕 New order received via socket:", newOrder);
      setOrders((prev) => [newOrder, ...prev]);
    });

    socket.on("orderUpdated", (updatedOrder) => {
      console.log("🔄 Order updated via socket:", updatedOrder);
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.emit("leaveRoom", restaurantId);
      socket.disconnect();
    };
  }, []);

  // ✅ Fetch orders with restaurant token
  const fetchOrders = async (token) => {
    try {
      const res = await api.get("/orders/restaurant", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err.response?.data || err.message);
    }
  };

  const stages = ["Pending", "Preparing", "Ready", "Delivered"];

  // ✅ Update order status
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Optimistic UI update
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: nextStatus } : o
        )
      );
    } catch (err) {
      console.error("Error updating order status", err.response?.data || err.message);
    }
  };

  return (
    <div className="orders-page">
      <h2 className="orders-title">📦 Incoming Orders</h2>

      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <p>
              <strong>User:</strong> {order.user?.name || "Unknown"}
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

            <div className="order-footer">
              <span
                className={`status-badge status-${order.status.toLowerCase()}`}
              >
                {order.status}
              </span>

              {order.status !== "Delivered" && (
                <button
                  onClick={() => updateStatus(order._id, order.status)}
                  className="next-btn"
                >
                  Next ➡
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantOrders;
