import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { CartContext } from "../context/CartContext";
import "../styles/Menu.css";
import "../styles/RestaurantList.css"; 
import Cart from "./Cart";

function Menu() {
  const { restaurantId } = useParams();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");

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

  const categories = [...new Set(menuItems.map((i) => i.category))];

  const filtered = menuItems
    .filter((item) => {
      if (vegFilter === "veg" && !item.isVeg) return false;
      if (vegFilter === "nonveg" && item.isVeg) return false;
      if (!item.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "priceLow") return a.price - b.price;
      if (sortOption === "priceHigh") return b.price - a.price;
      if (sortOption === "nameAZ") return a.name.localeCompare(b.name);
      if (sortOption === "nameZA") return b.name.localeCompare(a.name);
      return 0;
    });

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
    <div className="menu-page fade-in">
      {/* HEADER */}
      <div className="menu-header">
        <h2 className="restaurant-name">{restaurant?.name || "Restaurant"}</h2>
        <p className="restaurant-sub">
          {restaurant?.cuisineType || restaurant?.description || "Delicious meals"}
        </p>
      </div>

      {/* FILTERS */}
      <div className="filters-container" style={{ marginTop: "-10px" }}>
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-select"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price (Low → High)</option>
          <option value="priceHigh">Price (High → Low)</option>
          <option value="nameAZ">Name (A → Z)</option>
          <option value="nameZA">Name (Z → A)</option>
        </select>

        <div className="veg-toggle">
          <button
            className={`veg-btn ${vegFilter === "all" ? "active" : ""}`}
            onClick={() => setVegFilter("all")}
          >
            All
          </button>
          <button
            className={`veg-btn ${vegFilter === "veg" ? "active" : ""}`}
            onClick={() => setVegFilter("veg")}
          >
            Veg
          </button>
          <button
            className={`veg-btn ${vegFilter === "nonveg" ? "active" : ""}`}
            onClick={() => setVegFilter("nonveg")}
          >
            Non-Veg
          </button>
        </div>
      </div>

      <h3 className="menu-title">Menu</h3>

      {/* ⭐ GROUPED MENU SECTIONS */}
      {categories.map((cat) => {
        const itemsInCat = filtered.filter((item) => item.category === cat);
        if (itemsInCat.length === 0) return null;

        return (
          <div key={cat} className="menu-category-section">
            <h2 className="menu-category-title">{cat}</h2>

            <div className="menu-grid">
              {itemsInCat.map((item) => {
                const qty = getQty(item._id);

                return (
                  <div key={item._id} className="menu-card">
                    <div className="menu-img-wrapper">
                      <img src={getImageUrl(item.image)} alt={item.name} loading="lazy" />
                      <span className="menu-tag">{item.category}</span>

                      <span
                        className={`veg-dot ${item.isVeg ? "veg" : "nonveg"}`}
                        title={item.isVeg ? "Veg" : "Non-Veg"}
                      ></span>

                      {qty > 0 && <span className="menu-in-cart">{qty} in cart</span>}
                    </div>

                    <div className="menu-content">
                      <div className="menu-name-price">
                        <h3 className="item-name">{item.name}</h3>
                        <span className="item-price">₹{item.price.toFixed(2)}</span>
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
          </div>
        );
      })}

      {/* CART SUMMARY */}
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
