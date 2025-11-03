// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import api from "../utils/api";
// // import "../styles/Menu.css";

// // function Menu() {
// //   const { restaurantId } = useParams();
// //   const [menuItems, setMenuItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchMenu = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         console.log("Fetching menu for restaurant:", restaurantId);

// //         // ✅ Correct endpoint (NO duplicate /api)
// //         const res = await api.get(`/menu/${restaurantId}`);

// //         console.log("✅ Menu data fetched:", res.data);

// //         if (res.data.success && Array.isArray(res.data.data)) {
// //           setMenuItems(res.data.data);
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

// //   return (
// //     <div className="menu-page">
// //       <h1 className="menu-title">🍽️ Menu</h1>

// //       {loading ? (
// //         <p className="menu-loading">Loading menu...</p>
// //       ) : error ? (
// //         <p className="menu-error">{error}</p>
// //       ) : menuItems.length === 0 ? (
// //         <p className="menu-empty">No items available for this restaurant.</p>
// //       ) : (
// //         <div className="menu-grid">
// //           {menuItems.map((item) => (
// //             <div className="menu-card" key={item._id}>
// //               <img
// //                 src={item.image || "/images/default-food.jpg"}
// //                 alt={item.name}
// //                 className="menu-image"
// //               />
// //               <div className="menu-details">
// //                 <h3>{item.name}</h3>
// //                 <p className="menu-category">Category: {item.category}</p>
// //                 <p className="menu-desc">{item.description}</p>
// //                 {item.ingredients && (
// //                   <p className="menu-ingredients">
// //                     <strong>Ingredients:</strong> {item.ingredients}
// //                   </p>
// //                 )}
// //                 <p className="menu-price">₹{item.price}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Menu;










// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import { CartContext } from "../context/CartContext"; // ✅ import context
// import "../styles/Menu.css";

// function Menu() {
//   const { restaurantId } = useParams();
//   const navigate = useNavigate();

//   // ✅ Access cart functions globally
//   const { cart, addToCart } = useContext(CartContext);

//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("");

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         console.log("Fetching menu for restaurant:", restaurantId);

//         const res = await api.get(`/menu/${restaurantId}`);

//         if (res.data.success && Array.isArray(res.data.data)) {
//           setMenuItems(res.data.data);
//         } else {
//           setError("No menu data found for this restaurant.");
//         }
//       } catch (err) {
//         console.error("❌ Error fetching menu:", err);
//         setError("Failed to fetch menu items. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (restaurantId) fetchMenu();
//   }, [restaurantId]);

//   // ✅ Navigate to Cart Page
//   const handleGoToCart = () => {
//     navigate("/cart");
//   };

//   // ✅ Search, Filter, Sort
//   const filteredItems = menuItems
//     .filter((item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((item) =>
//       filterCategory === "All" ? true : item.category === filterCategory
//     )
//     .sort((a, b) => {
//       if (sortBy === "price-low") return a.price - b.price;
//       if (sortBy === "price-high") return b.price - a.price;
//       return 0;
//     });

//   const categories = ["All", ...new Set(menuItems.map((i) => i.category))];

//   return (
//     <div className="menu-page">
//       <h1 className="menu-title">🍽️ Our Menu</h1>

//       {/* 🔍 Search + Filter + Sort Controls */}
//       <div className="menu-controls">
//         <input
//           type="text"
//           placeholder="Search dishes..."
//           className="menu-search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select
//           className="menu-filter"
//           value={filterCategory}
//           onChange={(e) => setFilterCategory(e.target.value)}
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>

//         <select
//           className="menu-sort"
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//         >
//           <option value="">Sort by</option>
//           <option value="price-low">Price: Low to High</option>
//           <option value="price-high">Price: High to Low</option>
//         </select>
//       </div>

//       {loading ? (
//         <p className="menu-loading">Loading menu...</p>
//       ) : error ? (
//         <p className="menu-error">{error}</p>
//       ) : filteredItems.length === 0 ? (
//         <p className="menu-empty">No dishes match your search.</p>
//       ) : (
//         <div className="menu-grid">
//           {filteredItems.map((item) => (
//             <div className="menu-card" key={item._id}>
//               <img
//                 src={item.image || "/images/default-food.jpg"}
//                 alt={item.name}
//                 className="menu-image"
//               />
//               <div className="menu-details">
//                 <h3>{item.name}</h3>
//                 <p className="menu-category">🥗 {item.category}</p>
//                 <p className="menu-desc">{item.description}</p>
//                 {item.ingredients && (
//                   <p className="menu-ingredients">
//                     <strong>Ingredients:</strong> {item.ingredients}
//                   </p>
//                 )}
//                 <div className="menu-bottom">
//                   <span className="menu-price">₹{item.price}</span>
//                   <button
//                     className="menu-add-btn"
//                     onClick={() => addToCart(item, restaurantId)} // ✅ Use global cart
//                   >
//                     Add to Cart 🛒
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* 🛒 Floating Cart Summary */}
//       {cart.length > 0 && (
//         <div className="menu-cart-summary">
//           <p>
//             🛍️ {cart.length} item(s) | ₹
//             {cart.reduce(
//               (acc, i) => acc + i.item.price * i.quantity,
//               0
//             )}
//           </p>
//           <button className="menu-cart-btn" onClick={handleGoToCart}>
//             Go to Cart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Menu;







import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { CartContext } from "../context/CartContext"; // ✅ import context
import "../styles/Menu.css";

function Menu() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  // ✅ Access cart functions globally
  const { cart, addToCart } = useContext(CartContext);

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching menu for restaurant:", restaurantId);

        const res = await api.get(`/menu/${restaurantId}`);

        if (res.data.success && Array.isArray(res.data.data)) {
          // ✅ Filter out unavailable items right after fetching
          const availableItems = res.data.data.filter((item) => item.available !== false);
          setMenuItems(availableItems);
        } else {
          setError("No menu data found for this restaurant.");
        }
      } catch (err) {
        console.error("❌ Error fetching menu:", err);
        setError("Failed to fetch menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) fetchMenu();
  }, [restaurantId]);

  // ✅ Navigate to Cart Page
  const handleGoToCart = () => {
    navigate("/cart");
  };

  // ✅ Search, Filter, Sort (after filtering unavailable ones)
  const filteredItems = menuItems
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      filterCategory === "All" ? true : item.category === filterCategory
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const categories = ["All", ...new Set(menuItems.map((i) => i.category))];

  return (
    <div className="menu-page">
      <h1 className="menu-title">🍽️ Our Menu</h1>

      {/* 🔍 Search + Filter + Sort Controls */}
      <div className="menu-controls">
        <input
          type="text"
          placeholder="Search dishes..."
          className="menu-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="menu-filter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="menu-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {loading ? (
        <p className="menu-loading">Loading menu...</p>
      ) : error ? (
        <p className="menu-error">{error}</p>
      ) : filteredItems.length === 0 ? (
        <p className="menu-empty">No dishes match your search.</p>
      ) : (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div className="menu-card" key={item._id}>
              <img
                src={item.image || "/images/default-food.jpg"}
                alt={item.name}
                className="menu-image"
              />
              <div className="menu-details">
                <h3>{item.name}</h3>
                <p className="menu-category">🥗 {item.category}</p>
                <p className="menu-desc">{item.description}</p>
                {item.ingredients && (
                  <p className="menu-ingredients">
                    <strong>Ingredients:</strong> {item.ingredients}
                  </p>
                )}
                <div className="menu-bottom">
                  <span className="menu-price">₹{item.price}</span>
                  <button
                    className="menu-add-btn"
                    onClick={() => addToCart(item, restaurantId)} // ✅ Use global cart
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🛒 Floating Cart Summary */}
      {cart.length > 0 && (
        <div className="menu-cart-summary">
          <p>
            🛍️ {cart.length} item(s) | ₹
            {cart.reduce(
              (acc, i) => acc + i.item.price * i.quantity,
              0
            )}
          </p>
          <button className="menu-cart-btn" onClick={handleGoToCart}>
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
