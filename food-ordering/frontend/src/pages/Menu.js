// // // // import React, { useEffect, useState } from "react";
// // // // import { useParams } from "react-router-dom";
// // // // import api from "../utils/api";
// // // // import "../styles/Menu.css";

// // // // function Menu() {
// // // //   const { restaurantId } = useParams();
// // // //   const [menuItems, setMenuItems] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");

// // // //   useEffect(() => {
// // // //     const fetchMenu = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         setError("");

// // // //         console.log("Fetching menu for restaurant:", restaurantId);

// // // //         // ✅ Correct endpoint (NO duplicate /api)
// // // //         const res = await api.get(`/menu/${restaurantId}`);

// // // //         console.log("✅ Menu data fetched:", res.data);

// // // //         if (res.data.success && Array.isArray(res.data.data)) {
// // // //           setMenuItems(res.data.data);
// // // //         } else {
// // // //           setError("No menu data found for this restaurant.");
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("❌ Error fetching menu:", err);
// // // //         setError("Failed to fetch menu items. Please try again later.");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     if (restaurantId) fetchMenu();
// // // //   }, [restaurantId]);

// // // //   return (
// // // //     <div className="menu-page">
// // // //       <h1 className="menu-title">🍽️ Menu</h1>

// // // //       {loading ? (
// // // //         <p className="menu-loading">Loading menu...</p>
// // // //       ) : error ? (
// // // //         <p className="menu-error">{error}</p>
// // // //       ) : menuItems.length === 0 ? (
// // // //         <p className="menu-empty">No items available for this restaurant.</p>
// // // //       ) : (
// // // //         <div className="menu-grid">
// // // //           {menuItems.map((item) => (
// // // //             <div className="menu-card" key={item._id}>
// // // //               <img
// // // //                 src={item.image || "/images/default-food.jpg"}
// // // //                 alt={item.name}
// // // //                 className="menu-image"
// // // //               />
// // // //               <div className="menu-details">
// // // //                 <h3>{item.name}</h3>
// // // //                 <p className="menu-category">Category: {item.category}</p>
// // // //                 <p className="menu-desc">{item.description}</p>
// // // //                 {item.ingredients && (
// // // //                   <p className="menu-ingredients">
// // // //                     <strong>Ingredients:</strong> {item.ingredients}
// // // //                   </p>
// // // //                 )}
// // // //                 <p className="menu-price">₹{item.price}</p>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default Menu;










// // // import React, { useEffect, useState, useContext } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import api from "../utils/api";
// // // import { CartContext } from "../context/CartContext"; // ✅ import context
// // // import "../styles/Menu.css";

// // // function Menu() {
// // //   const { restaurantId } = useParams();
// // //   const navigate = useNavigate();

// // //   // ✅ Access cart functions globally
// // //   const { cart, addToCart } = useContext(CartContext);

// // //   const [menuItems, setMenuItems] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [filterCategory, setFilterCategory] = useState("All");
// // //   const [sortBy, setSortBy] = useState("");

// // //   useEffect(() => {
// // //     const fetchMenu = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError("");

// // //         console.log("Fetching menu for restaurant:", restaurantId);

// // //         const res = await api.get(`/menu/${restaurantId}`);

// // //         if (res.data.success && Array.isArray(res.data.data)) {
// // //           setMenuItems(res.data.data);
// // //         } else {
// // //           setError("No menu data found for this restaurant.");
// // //         }
// // //       } catch (err) {
// // //         console.error("❌ Error fetching menu:", err);
// // //         setError("Failed to fetch menu items. Please try again later.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     if (restaurantId) fetchMenu();
// // //   }, [restaurantId]);

// // //   // ✅ Navigate to Cart Page
// // //   const handleGoToCart = () => {
// // //     navigate("/cart");
// // //   };

// // //   // ✅ Search, Filter, Sort
// // //   const filteredItems = menuItems
// // //     .filter((item) =>
// // //       item.name.toLowerCase().includes(searchTerm.toLowerCase())
// // //     )
// // //     .filter((item) =>
// // //       filterCategory === "All" ? true : item.category === filterCategory
// // //     )
// // //     .sort((a, b) => {
// // //       if (sortBy === "price-low") return a.price - b.price;
// // //       if (sortBy === "price-high") return b.price - a.price;
// // //       return 0;
// // //     });

// // //   const categories = ["All", ...new Set(menuItems.map((i) => i.category))];

// // //   return (
// // //     <div className="menu-page">
// // //       <h1 className="menu-title">🍽️ Our Menu</h1>

// // //       {/* 🔍 Search + Filter + Sort Controls */}
// // //       <div className="menu-controls">
// // //         <input
// // //           type="text"
// // //           placeholder="Search dishes..."
// // //           className="menu-search"
// // //           value={searchTerm}
// // //           onChange={(e) => setSearchTerm(e.target.value)}
// // //         />

// // //         <select
// // //           className="menu-filter"
// // //           value={filterCategory}
// // //           onChange={(e) => setFilterCategory(e.target.value)}
// // //         >
// // //           {categories.map((cat) => (
// // //             <option key={cat} value={cat}>
// // //               {cat}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         <select
// // //           className="menu-sort"
// // //           value={sortBy}
// // //           onChange={(e) => setSortBy(e.target.value)}
// // //         >
// // //           <option value="">Sort by</option>
// // //           <option value="price-low">Price: Low to High</option>
// // //           <option value="price-high">Price: High to Low</option>
// // //         </select>
// // //       </div>

// // //       {loading ? (
// // //         <p className="menu-loading">Loading menu...</p>
// // //       ) : error ? (
// // //         <p className="menu-error">{error}</p>
// // //       ) : filteredItems.length === 0 ? (
// // //         <p className="menu-empty">No dishes match your search.</p>
// // //       ) : (
// // //         <div className="menu-grid">
// // //           {filteredItems.map((item) => (
// // //             <div className="menu-card" key={item._id}>
// // //               <img
// // //                 src={item.image || "/images/default-food.jpg"}
// // //                 alt={item.name}
// // //                 className="menu-image"
// // //               />
// // //               <div className="menu-details">
// // //                 <h3>{item.name}</h3>
// // //                 <p className="menu-category">🥗 {item.category}</p>
// // //                 <p className="menu-desc">{item.description}</p>
// // //                 {item.ingredients && (
// // //                   <p className="menu-ingredients">
// // //                     <strong>Ingredients:</strong> {item.ingredients}
// // //                   </p>
// // //                 )}
// // //                 <div className="menu-bottom">
// // //                   <span className="menu-price">₹{item.price}</span>
// // //                   <button
// // //                     className="menu-add-btn"
// // //                     onClick={() => addToCart(item, restaurantId)} // ✅ Use global cart
// // //                   >
// // //                     Add to Cart 🛒
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* 🛒 Floating Cart Summary */}
// // //       {cart.length > 0 && (
// // //         <div className="menu-cart-summary">
// // //           <p>
// // //             🛍️ {cart.length} item(s) | ₹
// // //             {cart.reduce(
// // //               (acc, i) => acc + i.item.price * i.quantity,
// // //               0
// // //             )}
// // //           </p>
// // //           <button className="menu-cart-btn" onClick={handleGoToCart}>
// // //             Go to Cart
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default Menu;







// // import React, { useEffect, useState, useContext } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import api from "../utils/api";
// // import { CartContext } from "../context/CartContext"; // ✅ import context
// // import "../styles/Menu.css";

// // function Menu() {
// //   const { restaurantId } = useParams();
// //   const navigate = useNavigate();

// //   // ✅ Access cart functions globally
// //   const { cart, addToCart } = useContext(CartContext);

// //   const [menuItems, setMenuItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [filterCategory, setFilterCategory] = useState("All");
// //   const [sortBy, setSortBy] = useState("");

// //   useEffect(() => {
// //     const fetchMenu = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         console.log("Fetching menu for restaurant:", restaurantId);

// //         const res = await api.get(`/menu/${restaurantId}`);

// //         if (res.data.success && Array.isArray(res.data.data)) {
// //           // ✅ Filter out unavailable items right after fetching
// //           const availableItems = res.data.data.filter((item) => item.available !== false);
// //           setMenuItems(availableItems);
// //         } else {
// //           setError("No menu data found for this restaurant.");
// //         }
// //       } catch (err) {
// //         console.error("❌ Error fetching menu:", err);
// //         setError("Failed to fetch menu items. Please try again later.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (restaurantId) fetchMenu();
// //   }, [restaurantId]);

// //   // ✅ Navigate to Cart Page
// //   const handleGoToCart = () => {
// //     navigate("/cart");
// //   };

// //   // ✅ Search, Filter, Sort (after filtering unavailable ones)
// //   const filteredItems = menuItems
// //     .filter((item) =>
// //       item.name.toLowerCase().includes(searchTerm.toLowerCase())
// //     )
// //     .filter((item) =>
// //       filterCategory === "All" ? true : item.category === filterCategory
// //     )
// //     .sort((a, b) => {
// //       if (sortBy === "price-low") return a.price - b.price;
// //       if (sortBy === "price-high") return b.price - a.price;
// //       return 0;
// //     });

// //   const categories = ["All", ...new Set(menuItems.map((i) => i.category))];

// //   return (
// //     <div className="menu-page">
// //       <h1 className="menu-title">🍽️ Our Menu</h1>

// //       {/* 🔍 Search + Filter + Sort Controls */}
// //       <div className="menu-controls">
// //         <input
// //           type="text"
// //           placeholder="Search dishes..."
// //           className="menu-search"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />

// //         <select
// //           className="menu-filter"
// //           value={filterCategory}
// //           onChange={(e) => setFilterCategory(e.target.value)}
// //         >
// //           {categories.map((cat) => (
// //             <option key={cat} value={cat}>
// //               {cat}
// //             </option>
// //           ))}
// //         </select>

// //         <select
// //           className="menu-sort"
// //           value={sortBy}
// //           onChange={(e) => setSortBy(e.target.value)}
// //         >
// //           <option value="">Sort by</option>
// //           <option value="price-low">Price: Low to High</option>
// //           <option value="price-high">Price: High to Low</option>
// //         </select>
// //       </div>

// //       {loading ? (
// //         <p className="menu-loading">Loading menu...</p>
// //       ) : error ? (
// //         <p className="menu-error">{error}</p>
// //       ) : filteredItems.length === 0 ? (
// //         <p className="menu-empty">No dishes match your search.</p>
// //       ) : (
// //         <div className="menu-grid">
// //           {filteredItems.map((item) => (
// //             <div className="menu-card" key={item._id}>
// //               <img
// //                 src={item.image || "/images/default-food.jpg"}
// //                 alt={item.name}
// //                 className="menu-image"
// //               />
// //               <div className="menu-details">
// //                 <h3>{item.name}</h3>
// //                 <p className="menu-category">🥗 {item.category}</p>
// //                 <p className="menu-desc">{item.description}</p>
// //                 {item.ingredients && (
// //                   <p className="menu-ingredients">
// //                     <strong>Ingredients:</strong> {item.ingredients}
// //                   </p>
// //                 )}
// //                 <div className="menu-bottom">
// //                   <span className="menu-price">₹{item.price}</span>
// //                   <button
// //                     className="menu-add-btn"
// //                     onClick={() => addToCart(item, restaurantId)} // ✅ Use global cart
// //                   >
// //                     Add to Cart 🛒
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* 🛒 Floating Cart Summary */}
// //       {cart.length > 0 && (
// //         <div className="menu-cart-summary">
// //           <p>
// //             🛍️ {cart.length} item(s) | ₹
// //             {cart.reduce(
// //               (acc, i) => acc + i.item.price * i.quantity,
// //               0
// //             )}
// //           </p>
// //           <button className="menu-cart-btn" onClick={handleGoToCart}>
// //             Go to Cart
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Menu;















// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import { CartContext } from "../context/CartContext";
// import "../styles/Menu.css";

// function Menu() {
//   const { restaurantId } = useParams();
//   const navigate = useNavigate();
//   const { cart, addToCart, removeFromCart } = useContext(CartContext);

//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filterCategory, setFilterCategory] = useState("All");

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const res = await api.get(`/menu/${restaurantId}`);
//         if (res.data.success && Array.isArray(res.data.data)) {
//           const available = res.data.data.filter((i) => i.available !== false);
//           setMenuItems(available);
//         } else setError("No menu data found for this restaurant.");
//       } catch (err) {
//         console.error("Error fetching menu:", err);
//         setError("Failed to fetch menu items. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (restaurantId) fetchMenu();
//   }, [restaurantId]);

//   const handleGoToCart = () => navigate("/cart");

//   const categories = ["All", ...new Set(menuItems.map((i) => i.category))];

//   const filtered =
//     filterCategory === "All"
//       ? menuItems
//       : menuItems.filter((i) => i.category === filterCategory);

//   const getQty = (id) => {
//     const found = cart.find((c) => c.item._id === id);
//     return found ? found.quantity : 0;
//   };

//   return (
//     <div className="menu-page">
//       <div className="menu-header">
//         <h2 className="restaurant-name">Campus Café</h2>
//         <p className="restaurant-sub">Coffee, pastries, and light meals</p>
//       </div>

//       <h3 className="menu-title">Menu</h3>

//       <div className="menu-tabs">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             className={`menu-tab ${filterCategory === cat ? "active" : ""}`}
//             onClick={() => setFilterCategory(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <p className="menu-loading">Loading menu...</p>
//       ) : error ? (
//         <p className="menu-error">{error}</p>
//       ) : filtered.length === 0 ? (
//         <p className="menu-empty">No items found.</p>
//       ) : (
//         <div className="menu-grid">
//           {filtered.map((item) => {
//             const qty = getQty(item._id);
//             return (
//               <div key={item._id} className="menu-card">
//                 {/* === Image === */}
//                 <div className="menu-img-wrapper">
//                   <img
//                     src={item.image || "https://placehold.co/400x250?text=Food"}
//                     alt={item.name}
//                   />
//                   <span className="menu-tag">{item.category}</span>
//                   {qty > 0 && (
//                     <span className="menu-in-cart">{qty} in cart</span>
//                   )}
//                 </div>

//                 {/* === Info === */}
//                 <div className="menu-content">
//                   <div className="menu-row">
//                     <h3>{item.name}</h3>
//                     <span>${item.price.toFixed(2)}</span>
//                   </div>
//                   <p>{item.description}</p>

//                   {qty > 0 ? (
//                     <div className="qty-controller">
//                       <button onClick={() => removeFromCart(item._id)}>−</button>
//                       <span>{qty}</span>
//                       <button onClick={() => addToCart(item, restaurantId)}>
//                         +
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       className="add-btn"
//                       onClick={() => addToCart(item, restaurantId)}
//                     >
//                       + Add to Cart
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {cart.length > 0 && (
//         <div className="menu-cart-summary">
//           <p>
//             🛍️ {cart.length} item(s) | $
//             {cart
//               .reduce((acc, i) => acc + i.item.price * i.quantity, 0)
//               .toFixed(2)}
//           </p>
//           <button onClick={handleGoToCart}>Go to Cart</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Menu;










import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { CartContext } from "../context/CartContext";
import "../styles/Menu.css";
import Cart from "./Cart"; // ✅ import the same sliding cart

function Menu() {
  const { restaurantId } = useParams();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ control drawer visibility

  const BASE_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const getImageUrl = (path) => {
    if (!path) return "https://placehold.co/400x250?text=Food";
    if (path.startsWith("http")) return path;
    let cleanPath = path
      .replace(/\\/g, "/")
      .replace(/^public\//, "")
      .replace(/^\/+/, "");
    if (!cleanPath.startsWith("uploads/"))
      cleanPath = cleanPath.startsWith("/uploads")
        ? cleanPath.slice(1)
        : `uploads/${cleanPath}`;
    return `${BASE_URL}/${cleanPath}`;
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/menu/${restaurantId}`);
        if (res.data.success && Array.isArray(res.data.data)) {
          const available = res.data.data.filter((i) => i.available !== false);
          setMenuItems(available);
        } else {
          setError("No menu data found for this restaurant.");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setError("Failed to fetch menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (restaurantId) fetchMenu();
  }, [restaurantId]);

  const categories = ["All", ...new Set(menuItems.map((i) => i.category))];

  const filtered =
    filterCategory === "All"
      ? menuItems
      : menuItems.filter((i) => i.category === filterCategory);

  const getQty = (id) => {
    const found = cart.find((c) => c.item._id === id);
    return found ? found.quantity : 0;
  };

  const subtotal = cart.reduce(
    (acc, i) => acc + (i.item?.price || 0) * (i.quantity || 1),
    0
  );

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2 className="restaurant-name">Campus Café</h2>
        <p className="restaurant-sub">Coffee, pastries, and light meals</p>
      </div>

      <h3 className="menu-title">Menu</h3>

      <div className="menu-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`menu-tab ${filterCategory === cat ? "active" : ""}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="menu-loading">Loading menu...</p>
      ) : error ? (
        <p className="menu-error">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="menu-empty">No items found.</p>
      ) : (
        <div className="menu-grid">
          {filtered.map((item) => {
            const qty = getQty(item._id);
            return (
              <div key={item._id} className="menu-card">
                <div className="menu-img-wrapper">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    loading="lazy"
                  />
                  <span className="menu-tag">{item.category}</span>
                  {qty > 0 && <span className="menu-in-cart">{qty} in cart</span>}
                </div>

                <div className="menu-content">
                  <div className="menu-row">
                    <h3>{item.name}</h3>
                    <span>₹{item.price.toFixed(2)}</span>
                  </div>
                  <p>{item.description}</p>

                  {qty > 0 ? (
                    <div className="qty-controller">
                      <button onClick={() => removeFromCart(item._id)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => addToCart(item, restaurantId)}>+</button>
                    </div>
                  ) : (
                    <button
                      className="add-btn"
                      onClick={() => addToCart(item, restaurantId)}
                    >
                      + Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Floating Cart Summary Bar */}
      {cart.length > 0 && (
        <div className="menu-cart-summary">
          <p>
            🛍️ {cart.length} item(s) | ₹{subtotal.toFixed(2)}
          </p>
          <button onClick={() => setIsCartOpen(true)}>Go to Cart</button>
        </div>
      )}

      {/* ✅ Include Sliding Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
        }}
      />
    </div>
  );
}

export default Menu;
