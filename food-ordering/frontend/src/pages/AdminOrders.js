import React, { useEffect, useState } from "react";
import api from "../utils/api"; 
import "../styles/AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all orders (Admin only)
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Could not fetch orders");
      setLoading(false);
    }
  };

  // ✅ Update order status (Admin only)
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // refresh orders after update
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-orders-container">
      <h2>📦 All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "15px", width: "100%" }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name}</td>
                <td>{order.user?.email}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.name} x {item.qty}
                    </div>
                  ))}
                </td>
                <td>₹{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
