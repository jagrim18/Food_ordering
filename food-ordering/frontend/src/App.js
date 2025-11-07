// // // import React from "react";
// // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // // // 🔹 Layout Components
// // // import Navbar from "./components/Navbar";
// // // import Footer from "./components/Footer";

// // // // 🔹 User Pages
// // // import Welcome from "./pages/Welcome";
// // // import Login from "./pages/Login";
// // // import Register from "./pages/Register";
// // // import RestaurantList from "./pages/RestaurantList";
// // // import Menu from "./pages/Menu";
// // // import Cart from "./pages/Cart";
// // // import Orders from "./pages/Orders";
// // // import Profile from "./pages/Profile";

// // // // 🔹 Admin Pages
// // // import AdminDashboard from "./pages/AdminDashboard";
// // // import AdminOrders from "./pages/AdminOrders";
// // // import AdminLogin from "./pages/AdminLogin";
// // // import AdminRegister from "./pages/AdminRegister";
// // // import AdminRoute from "./routes/AdminRoute";

// // // // 🔹 Restaurant Pages
// // // import RestaurantOrders from "./pages/RestaurantOrders";
// // // import RestaurantLogin from "./pages/RestaurantLogin";
// // // import RestaurantRegister from "./pages/RestaurantRegister";
// // // import RestaurantRoute from "./routes/RestaurantRoute";
// // // import RestaurantDashboard from "./pages/RestaurantDashboard";

// // // // 🔹 Context Providers
// // // import { AuthProvider } from "./context/AuthContext";
// // // import { CartProvider } from "./context/CartContext";

// // // function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <CartProvider>
// // //         <Router>
// // //           <div className="flex flex-col min-h-screen bg-gray-50">
// // //             {/* 🔸 Global Navbar */}
// // //             <Navbar />

// // //             {/* 🔸 Main Content Area */}
// // //             <main className="flex-grow">
// // //               <Routes>
// // //                 {/* 👤 User Authentication */}
// // //                 <Route path="/" element={<Welcome />} />
// // //                 <Route path="/login" element={<Login />} />
// // //                 <Route path="/register" element={<Register />} />

// // //                 {/* 🍔 User Pages */}
// // //                 <Route path="/restaurants" element={<RestaurantList />} />
// // //                 <Route path="/menu/:restaurantId" element={<Menu />} />
// // //                 <Route path="/cart" element={<Cart />} />
// // //                 <Route path="/orders" element={<Orders />} />
// // //                 <Route path="/profile" element={<Profile />} />

// // //                 {/* 🛠️ Admin Routes */}
// // //                 <Route path="/admin/login" element={<AdminLogin />} />
// // //                 <Route path="/admin/register" element={<AdminRegister />} />
// // //                 <Route
// // //                   path="/admin/dashboard"
// // //                   element={
// // //                     <AdminRoute>
// // //                       <AdminDashboard />
// // //                     </AdminRoute>
// // //                   }
// // //                 />
// // //                 <Route
// // //                   path="/admin/orders"
// // //                   element={
// // //                     <AdminRoute>
// // //                       <AdminOrders />
// // //                     </AdminRoute>
// // //                   }
// // //                 />

// // //                 {/* 🍴 Restaurant Routes */}
// // //                 <Route path="/restaurant/login" element={<RestaurantLogin />} />
// // //                 <Route path="/restaurant/register" element={<RestaurantRegister />} />
// // //                 <Route
// // //                   path="/restaurant/dashboard"
// // //                   element={
// // //                     <RestaurantRoute>
// // //                       <RestaurantDashboard />
// // //                     </RestaurantRoute>
// // //                   }
// // //                 />
// // //                 <Route
// // //                   path="/restaurant/orders"
// // //                   element={
// // //                     <RestaurantRoute>
// // //                       <RestaurantOrders />
// // //                     </RestaurantRoute>
// // //                   }
// // //                 />
// // //               </Routes>
// // //             </main>

// // //             {/* 🔸 Global Footer */}
// // //             <Footer />
// // //           </div>
// // //         </Router>
// // //       </CartProvider>
// // //     </AuthProvider>
// // //   );
// // // }

// // // export default App;








// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // // 🔹 Layout Components
// // import Navbar from "./components/Navbar";
// // import Footer from "./components/Footer";

// // // 🔹 User Pages
// // import Welcome from "./pages/Welcome";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import RestaurantList from "./pages/RestaurantList";
// // import Menu from "./pages/Menu";
// // import Cart from "./pages/Cart";
// // import Orders from "./pages/Orders";
// // import Profile from "./pages/Profile";

// // // 🔹 Admin Pages
// // import AdminDashboard from "./pages/AdminDashboard";
// // import AdminOrders from "./pages/AdminOrders";
// // import AdminLogin from "./pages/AdminLogin";
// // import AdminRegister from "./pages/AdminRegister";
// // import AdminRoute from "./routes/AdminRoute";

// // // 🔹 Restaurant Pages
// // import RestaurantOrders from "./pages/RestaurantOrders";
// // import RestaurantLogin from "./pages/RestaurantLogin";
// // import RestaurantRegister from "./pages/RestaurantRegister";
// // import RestaurantRoute from "./routes/RestaurantRoute";
// // import RestaurantDashboard from "./pages/RestaurantDashboard";
// // import RestaurantMenu from "./pages/RestaurantMenu"; // ✅ New Page

// // // 🔹 Context Providers
// // import { AuthProvider } from "./context/AuthContext";
// // import { CartProvider } from "./context/CartContext";

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <CartProvider>
// //         <Router>
// //           <div className="flex flex-col min-h-screen bg-gray-50">
// //             {/* 🔸 Global Navbar */}
// //             <Navbar />

// //             {/* 🔸 Main Content Area */}
// //             <main className="flex-grow">
// //               <Routes>
// //                 {/* 👤 User Authentication */}
// //                 <Route path="/" element={<Welcome />} />
// //                 <Route path="/login" element={<Login />} />
// //                 <Route path="/register" element={<Register />} />

// //                 {/* 🍔 User Pages */}
// //                 <Route path="/restaurants" element={<RestaurantList />} />
// //                 <Route path="/menu/:restaurantId" element={<Menu />} />
// //                 <Route path="/cart" element={<Cart />} />
// //                 <Route path="/orders" element={<Orders />} />
// //                 <Route path="/profile" element={<Profile />} />

// //                 {/* 🛠️ Admin Routes */}
// //                 <Route path="/admin/login" element={<AdminLogin />} />
// //                 <Route path="/admin/register" element={<AdminRegister />} />
// //                 <Route
// //                   path="/admin/dashboard"
// //                   element={
// //                     <AdminRoute>
// //                       <AdminDashboard />
// //                     </AdminRoute>
// //                   }
// //                 />
// //                 <Route
// //                   path="/admin/orders"
// //                   element={
// //                     <AdminRoute>
// //                       <AdminOrders />
// //                     </AdminRoute>
// //                   }
// //                 />

// //                 {/* 🍴 Restaurant Routes */}
// //                 <Route path="/restaurant/login" element={<RestaurantLogin />} />
// //                 <Route path="/restaurant/register" element={<RestaurantRegister />} />
// //                 <Route
// //                   path="/restaurant/dashboard"
// //                   element={
// //                     <RestaurantRoute>
// //                       <RestaurantDashboard />
// //                     </RestaurantRoute>
// //                   }
// //                 />
// //                 <Route
// //                   path="/restaurant/orders"
// //                   element={
// //                     <RestaurantRoute>
// //                       <RestaurantOrders />
// //                     </RestaurantRoute>
// //                   }
// //                 />
// //                 <Route
// //                   path="/restaurant/menu"
// //                   element={
// //                     <RestaurantRoute>
// //                       <RestaurantMenu /> {/* ✅ NEW PAGE ADDED */}
// //                     </RestaurantRoute>
// //                   }
// //                 />
// //               </Routes>
// //             </main>

// //             {/* 🔸 Global Footer */}
// //             <Footer />
// //           </div>
// //         </Router>
// //       </CartProvider>
// //     </AuthProvider>
// //   );
// // }

// // export default App;










// // frontend/src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // 🔹 Layout Components
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// // 🔹 User Pages
// import Welcome from "./pages/Welcome";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import RestaurantList from "./pages/RestaurantList";
// import Menu from "./pages/Menu";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import Profile from "./pages/Profile";

// // 🔹 Admin Pages
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminOrders from "./pages/AdminOrders";
// import AdminLogin from "./pages/AdminLogin";
// import AdminRegister from "./pages/AdminRegister";
// import AdminRoute from "./routes/AdminRoute";

// // 🔹 Restaurant Pages
// import RestaurantOrders from "./pages/RestaurantOrders";
// import RestaurantLogin from "./pages/RestaurantLogin";
// import RestaurantRegister from "./pages/RestaurantRegister";
// import RestaurantRoute from "./routes/RestaurantRoute";
// import RestaurantDashboard from "./pages/RestaurantDashboard";
// import RestaurantMenu from "./pages/RestaurantMenu"; // ✅ Menu page for restaurant

// // 🔹 Context Providers
// import { AuthProvider } from "./context/AuthContext";
// import { CartProvider } from "./context/CartContext";


// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Router>
//           <div className="flex flex-col min-h-screen bg-gray-50">
//             {/* 🔸 Global Navbar */}
//             <Navbar />

//             {/* 🔸 Main Content Area */}
//             <main className="flex-grow">
//               <Routes>
//                 {/* 👤 User Authentication */}
//                 <Route path="/" element={<Welcome />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />

//                 {/* 🍔 User Pages */}
//                 <Route path="/restaurants" element={<RestaurantList />} />
//                 <Route path="/menu/:restaurantId" element={<Menu />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/orders" element={<Orders />} />
//                 <Route path="/profile" element={<Profile />} />

//                 {/* 🛠️ Admin Routes */}
//                 <Route path="/admin/login" element={<AdminLogin />} />
//                 <Route path="/admin/register" element={<AdminRegister />} />
//                 <Route
//                   path="/admin/dashboard"
//                   element={
//                     <AdminRoute>
//                       <AdminDashboard />
//                     </AdminRoute>
//                   }
//                 />
//                 <Route
//                   path="/admin/orders"
//                   element={
//                     <AdminRoute>
//                       <AdminOrders />
//                     </AdminRoute>
//                   }
//                 />

//                 {/* 🍴 Restaurant Routes */}
//                 <Route path="/restaurant/login" element={<RestaurantLogin />} />
//                 <Route path="/restaurant/register" element={<RestaurantRegister />} />

//                 <Route
//                   path="/restaurant/dashboard"
//                   element={
//                     <RestaurantRoute>
//                       <RestaurantDashboard />
//                     </RestaurantRoute>
//                   }
//                 />

//                 <Route
//                   path="/restaurant/orders"
//                   element={
//                     <RestaurantRoute>
//                       <RestaurantOrders />
//                     </RestaurantRoute>
//                   }
//                 />

//                 <Route
//                   path="/restaurant/menu"
//                   element={
//                     <RestaurantRoute>
//                       <RestaurantMenu /> {/* ✅ Restaurant menu management */}
//                     </RestaurantRoute>
//                   }
//                 />
//               </Routes>
//             </main>

//             {/* 🔸 Global Footer */}
//             <Footer />
//           </div>
//         </Router>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;





// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 🔹 User Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantList from "./pages/RestaurantList";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart"; // ✅ used both as drawer and fallback route
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

// 🔹 Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
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
import RestaurantMenu from "./pages/RestaurantMenu";

// 🔹 Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CartDrawerProvider } from "./context/CartDrawerContext";

// ✅ Import Cart Drawer Context
import { useContext } from "react";
import { CartDrawerContext } from "./context/CartDrawerContext";

function AppContent() {
  const { isCartOpen, closeCart } = useContext(CartDrawerContext);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 🔸 Global Navbar */}
      <Navbar />

      {/* 🔸 Main Content Area */}
      <main className="flex-grow">
        <Routes>
          {/* 👤 User Authentication */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🍔 User Pages */}
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/menu/:restaurantId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} /> {/* fallback full page */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />

          {/* 🛠️ Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
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

          <Route
            path="/restaurant/menu"
            element={
              <RestaurantRoute>
                <RestaurantMenu />
              </RestaurantRoute>
            }
          />
        </Routes>
      </main>

      {/* 🔸 Global Footer */}
      <Footer />

      {/* 🛒 Global Cart Drawer mounted once */}
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartDrawerProvider>
          <Router>
            <AppContent />
          </Router>
        </CartDrawerProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
