// // // // // import { useEffect, useState, useContext } from "react";
// // // // // import api from "../utils/api";
// // // // // import { AuthContext } from "../context/AuthContext";
// // // // // import "../styles/Orders.css";

// // // // // function Orders() {
// // // // //   const [orders, setOrders] = useState([]);
// // // // //   const { user } = useContext(AuthContext);

// // // // //   useEffect(() => {
// // // // //     const fetchOrders = async () => {
// // // // //       if (!user) return;

// // // // //       try {
// // // // //         // ✅ Fetch only this user’s orders from backend
// // // // //         const res = await api.get("/orders/myorders");
// // // // //         setOrders(res.data);
// // // // //       } catch (err) {
// // // // //         console.error("Backend error, falling back to localStorage:", err);

// // // // //         // ✅ Fallback: fetch user-specific orders from localStorage
// // // // //         const savedOrders =
// // // // //           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
// // // // //         setOrders(savedOrders);
// // // // //       }
// // // // //     };

// // // // //     fetchOrders();
// // // // //   }, [user]);

// // // // //   return (
// // // // //     <div className="orders-container">
// // // // //       <h2>📦 My Orders</h2>
// // // // //       {orders.length === 0 ? (
// // // // //         <p>No orders placed yet.</p>
// // // // //       ) : (
// // // // //         orders.map((order) => (
// // // // //           <div key={order._id || order.id} className="order-card">
// // // // //             <h3>Order #{order._id || order.id}</h3>
// // // // //             <p>
// // // // //               <strong>Status:</strong> {order.status}
// // // // //             </p>
// // // // //             <p>
// // // // //               <strong>Total:</strong> ₹{order.total}
// // // // //             </p>
// // // // //             <h4>Items:</h4>
// // // // //             <ul>
// // // // //               {order.items.map((item, i) => (
// // // // //                 <li key={i}>
// // // // //                   {item.name} × {item.quantity} = ₹
// // // // //                   {item.price * item.quantity}
// // // // //                 </li>
// // // // //               ))}
// // // // //             </ul>
// // // // //           </div>
// // // // //         ))
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Orders;







// // // // import { useEffect, useState, useContext } from "react";
// // // // import api from "../utils/api";
// // // // import { AuthContext } from "../context/AuthContext";
// // // // import { io } from "socket.io-client";
// // // // import "../styles/Orders.css";

// // // // function Orders() {
// // // //   const [orders, setOrders] = useState([]);
// // // //   const { user } = useContext(AuthContext);

// // // //   useEffect(() => {
// // // //     const fetchOrders = async () => {
// // // //       if (!user) return;
// // // //       try {
// // // //         const res = await api.get("/orders/myorders");
// // // //         setOrders(res.data);
// // // //       } catch (err) {
// // // //         console.error("Backend error, fallback:", err);
// // // //         const savedOrders =
// // // //           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
// // // //         setOrders(savedOrders);
// // // //       }
// // // //     };

// // // //     fetchOrders();

// // // //     // ✅ Setup socket listener
// // // //     const socket = io("http://localhost:5000");

// // // //     socket.on("orderUpdated", (updatedOrder) => {
// // // //       if (updatedOrder.user === user._id) {
// // // //         setOrders((prev) =>
// // // //           prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// // // //         );
// // // //       }
// // // //     });

// // // //     return () => {
// // // //       socket.disconnect();
// // // //     };
// // // //   }, [user]);

// // // //   return (
// // // //     <div className="orders-container">
// // // //       <h2>📦 My Orders</h2>
// // // //       {orders.length === 0 ? (
// // // //         <p>No orders placed yet.</p>
// // // //       ) : (
// // // //         orders.map((order) => (
// // // //           <div key={order._id} className="order-card">
// // // //             <h3>Order #{order._id}</h3>
// // // //             <p>
// // // //               <strong>Status:</strong> {order.status}
// // // //             </p>
// // // //             <p>
// // // //               <strong>Total:</strong> ₹{order.total}
// // // //             </p>
// // // //             <h4>Items:</h4>
// // // //             <ul>
// // // //               {order.items.map((item, i) => (
// // // //                 <li key={i}>
// // // //                   {item.name} × {item.quantity} = ₹
// // // //                   {item.price * item.quantity}
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           </div>
// // // //         ))
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Orders;






// // // import { useEffect, useState, useContext } from "react";
// // // import api from "../utils/api";
// // // import { AuthContext } from "../context/AuthContext";
// // // import { io } from "socket.io-client";
// // // import "../styles/Orders.css";

// // // function Orders() {
// // //   const [orders, setOrders] = useState([]);
// // //   const { user } = useContext(AuthContext);

// // //   useEffect(() => {
// // //     const fetchOrders = async () => {
// // //       if (!user) return;
// // //       try {
// // //         const res = await api.get("/orders/myorders");
// // //         setOrders(res.data);
// // //       } catch (err) {
// // //         console.error("Backend error, fallback:", err);
// // //         // ✅ fallback only if backend fails
// // //         const savedOrders =
// // //           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
// // //         setOrders(savedOrders);
// // //       }
// // //     };

// // //     fetchOrders();

// // //     // ✅ Setup socket listener
// // //     const socket = io("http://localhost:5000");

// // //     socket.on("orderUpdated", (updatedOrder) => {
// // //       if (updatedOrder.user === user._id) {
// // //         setOrders((prev) =>
// // //           prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// // //         );
// // //       }
// // //     });

// // //     return () => {
// // //       socket.disconnect();
// // //     };
// // //   }, [user]);

// // //   return (
// // //     <div className="orders-container">
// // //       <h2>📦 My Orders</h2>
// // //       {orders.length === 0 ? (
// // //         <p>No orders placed yet.</p>
// // //       ) : (
// // //         orders.map((order) => (
// // //           <div key={order._id || order.id} className="order-card">
// // //             <h3>Order #{order._id || order.id}</h3>
// // //             <p>
// // //               <strong>Status:</strong> {order.status}
// // //             </p>
// // //             <p>
// // //               <strong>Total:</strong> ₹{order.total}
// // //             </p>
// // //             <h4>Items:</h4>
// // //             <ul>
// // //               {order.items.map((item, i) => (
// // //                 <li key={item._id || `${item.name}-${i}`}>
// // //                   {item.name} × {item.quantity} = ₹
// // //                   {item.price * item.quantity}
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         ))
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Orders;





// // import { useEffect, useState, useContext } from "react";
// // import api from "../utils/api";
// // import { AuthContext } from "../context/AuthContext";
// // import { io } from "socket.io-client";
// // import "../styles/Orders.css";

// // function Orders() {
// //   const [orders, setOrders] = useState([]);
// //   const { user } = useContext(AuthContext);

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       if (!user) return;
// //       try {
// //         // ✅ Fetch logged-in user’s orders
// //         const res = await api.get("/orders/myorders");
// //         setOrders(res.data);
// //       } catch (err) {
// //         console.error("Backend error, fallback:", err);
// //         // ✅ fallback only if backend fails
// //         const savedOrders =
// //           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
// //         setOrders(savedOrders);
// //       }
// //     };

// //     fetchOrders();

// //     // ✅ Setup socket listener
// //     const socket = io("http://localhost:5000");

// //     socket.on("orderUpdated", (updatedOrder) => {
// //       if (updatedOrder.user === user._id) {
// //         setOrders((prev) =>
// //           prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
// //         );
// //       }
// //     });

// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [user]);

// //   return (
// //     <div className="orders-container">
// //       <h2>📦 My Orders</h2>
// //       {orders.length === 0 ? (
// //         <p>No orders placed yet.</p>
// //       ) : (
// //         orders.map((order) => (
// //           <div key={order._id || order.id} className="order-card">
// //             <h3>Order #{order._id || order.id}</h3>
// //             <p>
// //               <strong>Status:</strong> {order.status}
// //             </p>
// //             <p>
// //               <strong>Total:</strong> ₹{order.total}
// //             </p>
// //             <h4>Items:</h4>
// //             <ul>
// //               {order.items?.map((item, i) => (
// //                 <li key={item._id || `${item.name}-${i}`}>
// //                   {item.name} × {item.quantity} = ₹
// //                   {item.price * item.quantity}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }

// // export default Orders;




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
//         // ✅ Fetch logged-in user’s orders
//         const res = await api.get("/orders/myorders");
//         setOrders(res.data);
//       } catch (err) {
//         console.error("Backend error, fallback:", err);
//         const savedOrders =
//           JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
//         setOrders(savedOrders);
//       }
//     };

//     fetchOrders();

//     // ✅ Setup socket connection
//     const socket = io("http://localhost:5000");

//     // ✅ Join user’s private room
//     socket.emit("join", user._id);

//     // ✅ Listen for updates only for this user
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
//       socket.disconnect();
//     };
//   }, [user]);

//   return (
//     <div className="orders-container">
//       <h2>📦 My Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders placed yet.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order._id || order.id} className="order-card">
//             <h3>Order #{order._id || order.id}</h3>
//             <p>
//               <strong>Status:</strong> {order.status}
//             </p>
//             <p>
//               <strong>Total:</strong> ₹{order.totalPrice || order.total}
//             </p>
//             <h4>Items:</h4>
//             <ul>
//               {order.items?.map((item, i) => (
//                 <li key={item._id || `${item.name}-${i}`}>
//                   {item.name} × {item.quantity} = ₹
//                   {item.price * item.quantity}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Orders;







import { useEffect, useState, useContext } from "react";
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
        // ✅ Fetch logged-in user’s orders
        const res = await api.get("/orders/myorders");
        setOrders(res.data);
      } catch (err) {
        console.error("Backend error, fallback:", err);

        // ✅ fallback to localStorage
        const savedOrders =
          JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
        setOrders(savedOrders);
      }
    };

    fetchOrders();

    // ✅ Setup socket connection
    const socket = io("http://localhost:5000");

    // ✅ Join user’s private room
    socket.emit("join", user._id);

    // ✅ Listen for updates only for this user
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
      socket.disconnect();
    };
  }, [user]);

  return (
    <div className="orders-container">
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id || order.id} className="order-card">
            <h3>Order #{order._id || order.id}</h3>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalPrice || order.total}
              {/* ✅ Prefer totalPrice, fallback to total for old localStorage */}
            </p>
            <h4>Items:</h4>
            <ul>
              {order.items?.map((item, i) => (
                <li key={item._id || `${item.name}-${i}`}>
                  {item.name} × {item.quantity} = ₹
                  {item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
