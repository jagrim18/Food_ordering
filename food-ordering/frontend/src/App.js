import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Layout
import Navbar from "./components/Navbar";

// 🔹 User Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantList from "./pages/RestaurantList";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

// 🔹 Admin Pages
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminRoute from "./routes/AdminRoute";

// 🔹 Restaurant Pages
import RestaurantOrders from "./pages/RestaurantOrders";
import RestaurantLogin from "./pages/RestaurantLogin";
import RestaurantRegister from "./pages/RestaurantRegister";
import RestaurantRoute from "./routes/RestaurantRoute";
import RestaurantDashboard from "./pages/RestaurantDashboard";

// 🔹 Context
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* 👤 User Authentication */}
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🍔 User Pages */}
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:restaurantId" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            {/* 🛠️ Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />

            {/* 🍴 Restaurant Routes */}
            <Route path="/restaurant/login" element={<RestaurantLogin />} />
            <Route path="/restaurant/register" element={<RestaurantRegister />} />
            <Route
              path="/restaurant/dashboard"
              element={
                <RestaurantRoute>
                  <RestaurantDashboard />
                </RestaurantRoute>
              }
            />
            <Route
              path="/restaurant/orders"
              element={
                <RestaurantRoute>
                  <RestaurantOrders />
                </RestaurantRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
