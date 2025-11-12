// // import React, { useEffect, useState, useContext } from "react";
// // import { useParams } from "react-router-dom";
// // import api from "../utils/api";
// // import { CartContext } from "../context/CartContext";
// // import "../styles/Menu.css";
// // import Cart from "./Cart"; // ✅ import the same sliding cart

// // function Menu() {
// //   const { restaurantId } = useParams();
// //   const { cart, addToCart, removeFromCart } = useContext(CartContext);

// //   const [menuItems, setMenuItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [filterCategory, setFilterCategory] = useState("All");
// //   const [isCartOpen, setIsCartOpen] = useState(false); // ✅ control drawer visibility

// //   const BASE_URL =
// //     process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

// //   const getImageUrl = (path) => {
// //     if (!path) return "https://placehold.co/400x250?text=Food";
// //     if (path.startsWith("http")) return path;
// //     let cleanPath = path
// //       .replace(/\\/g, "/")
// //       .replace(/^public\//, "")
// //       .replace(/^\/+/, "");
// //     if (!cleanPath.startsWith("uploads/"))
// //       cleanPath = cleanPath.startsWith("/uploads")
// //         ? cleanPath.slice(1)
// //         : `uploads/${cleanPath}`;
// //     return `${BASE_URL}/${cleanPath}`;
// //   };

// //   useEffect(() => {
// //     const fetchMenu = async () => {
// //       try {
// //         const res = await api.get(`/menu/${restaurantId}`);
// //         if (res.data.success && Array.isArray(res.data.data)) {
// //           const available = res.data.data.filter((i) => i.available !== false);
// //           setMenuItems(available);
// //         } else {
// //           setError("No menu data found for this restaurant.");
// //         }
// //       } catch (err) {
// //         console.error("Error fetching menu:", err);
// //         setError("Failed to fetch menu items. Please try again later.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     if (restaurantId) fetchMenu();
// //   }, [restaurantId]);

// //   const categories = ["All", ...new Set(menuItems.map((i) => i.category))];

// //   const filtered =
// //     filterCategory === "All"
// //       ? menuItems
// //       : menuItems.filter((i) => i.category === filterCategory);

// //   const getQty = (id) => {
// //     const found = cart.find((c) => c.item._id === id);
// //     return found ? found.quantity : 0;
// //   };

// //   const subtotal = cart.reduce(
// //     (acc, i) => acc + (i.item?.price || 0) * (i.quantity || 1),
// //     0
// //   );

// //   return (
// //     <div className="menu-page">
// //       <div className="menu-header">
// //         <h2 className="restaurant-name">Campus Café</h2>
// //         <p className="restaurant-sub">Coffee, pastries, and light meals</p>
// //       </div>

// //       <h3 className="menu-title">Menu</h3>

// //       <div className="menu-tabs">
// //         {categories.map((cat) => (
// //           <button
// //             key={cat}
// //             className={`menu-tab ${filterCategory === cat ? "active" : ""}`}
// //             onClick={() => setFilterCategory(cat)}
// //           >
// //             {cat}
// //           </button>
// //         ))}
// //       </div>

// //       {loading ? (
// //         <p className="menu-loading">Loading menu...</p>
// //       ) : error ? (
// //         <p className="menu-error">{error}</p>
// //       ) : filtered.length === 0 ? (
// //         <p className="menu-empty">No items found.</p>
// //       ) : (
// //         <div className="menu-grid">
// //           {filtered.map((item) => {
// //             const qty = getQty(item._id);
// //             return (
// //               <div key={item._id} className="menu-card">
// //                 <div className="menu-img-wrapper">
// //                   <img
// //                     src={getImageUrl(item.image)}
// //                     alt={item.name}
// //                     loading="lazy"
// //                   />
// //                   <span className="menu-tag">{item.category}</span>
// //                   {qty > 0 && <span className="menu-in-cart">{qty} in cart</span>}
// //                 </div>

// //                 <div className="menu-content">
// //                   <div className="menu-row">
// //                     <h3>{item.name}</h3>
// //                     <span>₹{item.price.toFixed(2)}</span>
// //                   </div>
// //                   <p>{item.description}</p>

// //                   {qty > 0 ? (
// //                     <div className="qty-controller">
// //                       <button onClick={() => removeFromCart(item._id)}>−</button>
// //                       <span>{qty}</span>
// //                       <button onClick={() => addToCart(item, restaurantId)}>+</button>
// //                     </div>
// //                   ) : (
// //                     <button
// //                       className="add-btn"
// //                       onClick={() => addToCart(item, restaurantId)}
// //                     >
// //                       + Add to Cart
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       )}

// //       {/* ✅ Floating Cart Summary Bar */}
// //       {cart.length > 0 && (
// //         <div className="menu-cart-summary">
// //           <p>
// //             🛍️ {cart.length} item(s) | ₹{subtotal.toFixed(2)}
// //           </p>
// //           <button onClick={() => setIsCartOpen(true)}>Go to Cart</button>
// //         </div>
// //       )}

// //       {/* ✅ Include Sliding Cart Drawer */}
// //       <Cart
// //         isOpen={isCartOpen}
// //         onClose={() => setIsCartOpen(false)}
// //         onCheckout={() => {
// //           setIsCartOpen(false);
// //         }}
// //       />
// //     </div>
// //   );
// // }

// // export default Menu;




// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import api from "../utils/api";
// import { CartContext } from "../context/CartContext";
// import "../styles/Menu.css";
// import Cart from "./Cart"; // ✅ same sliding cart

// function Menu() {
//   const { restaurantId } = useParams();
//   const { cart, addToCart, removeFromCart } = useContext(CartContext);

//   const [menuItems, setMenuItems] = useState([]);
//   const [restaurant, setRestaurant] = useState(null); // ✅ store restaurant details
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const BASE_URL =
//     process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   // ✅ Format image path safely
//   const getImageUrl = (path) => {
//     if (!path) return "https://placehold.co/400x250?text=Food";
//     if (path.startsWith("http")) return path;
//     let cleanPath = path
//       .replace(/\\/g, "/")
//       .replace(/^public\//, "")
//       .replace(/^\/+/, "");
//     if (!cleanPath.startsWith("uploads/"))
//       cleanPath = cleanPath.startsWith("/uploads")
//         ? cleanPath.slice(1)
//         : `uploads/${cleanPath}`;
//     return `${BASE_URL}/${cleanPath}`;
//   };

//   /* ============================================================
//      🧾 Fetch Restaurant Info
//   ============================================================ */
//   useEffect(() => {
//     const fetchRestaurant = async () => {
//       try {
//         const res = await api.get(`/restaurants/${restaurantId}`);
//         setRestaurant(res.data);
//       } catch (err) {
//         console.error("Error fetching restaurant info:", err);
//       }
//     };
//     if (restaurantId) fetchRestaurant();
//   }, [restaurantId]);

//   /* ============================================================
//      🍴 Fetch Menu
//   ============================================================ */
//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const res = await api.get(`/menu/${restaurantId}`);
//         if (res.data.success && Array.isArray(res.data.data)) {
//           const available = res.data.data.filter((i) => i.available !== false);
//           setMenuItems(available);
//         } else {
//           setError("No menu data found for this restaurant.");
//         }
//       } catch (err) {
//         console.error("Error fetching menu:", err);
//         setError("Failed to fetch menu items. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (restaurantId) fetchMenu();
//   }, [restaurantId]);

//   /* ============================================================
//      🧠 Filtering and Cart Utilities
//   ============================================================ */
//   const categories = ["All", ...new Set(menuItems.map((i) => i.category))];
//   const filtered =
//     filterCategory === "All"
//       ? menuItems
//       : menuItems.filter((i) => i.category === filterCategory);

//   const getQty = (id) => {
//     const found = cart.find((c) => c.item._id === id);
//     return found ? found.quantity : 0;
//   };

//   const subtotal = cart.reduce(
//     (acc, i) => acc + (i.item?.price || 0) * (i.quantity || 1),
//     0
//   );

//   /* ============================================================
//      🧾 Render
//   ============================================================ */
//   return (
//     <div className="menu-page">
//       {/* === Restaurant Header === */}
//       <div className="menu-header">
//         <h2 className="restaurant-name">
//           {restaurant ? restaurant.name : "Loading..."}
//         </h2>
//         <p className="restaurant-sub">
//           {restaurant
//             ? restaurant.cuisineType || restaurant.description || "Menu"
//             : ""}
//         </p>
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
//                 <div className="menu-img-wrapper">
//                   <img
//                     src={getImageUrl(item.image)}
//                     alt={item.name}
//                     loading="lazy"
//                   />
//                   <span className="menu-tag">{item.category}</span>
//                   {qty > 0 && (
//                     <span className="menu-in-cart">{qty} in cart</span>
//                   )}
//                 </div>

//                 <div className="menu-content">
//                   <div className="menu-row">
//                     <h3>{item.name}</h3>
//                     <span>₹{item.price.toFixed(2)}</span>
//                   </div>
//                   <p>{item.description}</p>

//                   {qty > 0 ? (
//                     <div className="qty-controller">
//                       <button onClick={() => removeFromCart(item._id)}>−</button>
//                       <span>{qty}</span>
//                       <button onClick={() => addToCart(item, restaurantId)}>+</button>
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

//       {/* ✅ Floating Cart Summary Bar */}
//       {cart.length > 0 && (
//         <div className="menu-cart-summary">
//           <p>
//             🛍️ {cart.length} item(s) | ₹{subtotal.toFixed(2)}
//           </p>
//           <button onClick={() => setIsCartOpen(true)}>Go to Cart</button>
//         </div>
//       )}

//       {/* ✅ Sliding Cart Drawer */}
//       <Cart
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         onCheckout={() => setIsCartOpen(false)}
//       />
//     </div>
//   );
// }

// export default Menu;



import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { CartContext } from "../context/CartContext";
import "../styles/Menu.css";
import Cart from "./Cart";

function Menu() {
  const { restaurantId } = useParams();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const getImageUrl = (path) => {
    if (!path) return "https://placehold.co/400x250?text=Food";
    if (path.startsWith("http")) return path;
    let cleanPath = path.replace(/\\/g, "/").replace(/^public\//, "").replace(/^\/+/, "");
    if (!cleanPath.startsWith("uploads/"))
      cleanPath = cleanPath.startsWith("/uploads")
        ? cleanPath.slice(1)
        : `uploads/${cleanPath}`;
    return `${BASE_URL}/${cleanPath}`;
  };

  // ✅ Fetch both restaurant + menu together
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/restaurantitems/full/${restaurantId}`);
        if (res.data.success) {
          setRestaurant(res.data.restaurant);
          setMenuItems(res.data.menu || []);
        } else {
          setError("Restaurant not found");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Failed to load restaurant");
      } finally {
        setLoading(false);
      }
    };
    if (restaurantId) fetchData();
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

  if (loading)
    return (
      <div className="menu-page">
        <h2 className="restaurant-name">Loading...</h2>
      </div>
    );

  if (error)
    return (
      <div className="menu-page">
        <h2 className="restaurant-name">{error}</h2>
      </div>
    );

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2 className="restaurant-name">{restaurant?.name || "Restaurant"}</h2>
        <p className="restaurant-sub">
          {restaurant?.cuisineType || restaurant?.description || "Delicious meals"}
        </p>
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

      {filtered.length === 0 ? (
        <p className="menu-empty">No items found.</p>
      ) : (
        <div className="menu-grid">
          {filtered.map((item) => {
            const qty = getQty(item._id);
            return (
              <div key={item._id} className="menu-card">
                <div className="menu-img-wrapper">
                  <img src={getImageUrl(item.image)} alt={item.name} loading="lazy" />
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

      {cart.length > 0 && (
        <div className="menu-cart-summary">
          <p>🛍️ {cart.length} item(s) | ₹{subtotal.toFixed(2)}</p>
          <button onClick={() => setIsCartOpen(true)}>Go to Cart</button>
        </div>
      )}

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Menu;
