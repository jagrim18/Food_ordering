// // frontend/src/pages/RestaurantList.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import "../styles/RestaurantList.css";

// function RestaurantList() {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const res = await api.get("/restaurants");
//         setRestaurants(res.data || []);
//       } catch (err) {
//         console.error("❌ Error fetching restaurants:", err);
//         setError("Failed to load restaurants. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRestaurants();
//   }, []);

//   // ✅ Universal Image URL Resolver
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://placehold.co/400x250?text=Restaurant";

//     // Full external URL (e.g., Cloudinary or external CDN)
//     if (imagePath.startsWith("http")) return imagePath;

//     // Normalize slashes and clean prefix
//     imagePath = imagePath.replace(/\\/g, "/").replace(/\/+/g, "/");
//     imagePath = imagePath.replace(/^public\//, "").replace(/^\/+/, "");

//     // Ensure path begins with /uploads
//     if (!imagePath.startsWith("uploads/")) {
//       if (imagePath.startsWith("/uploads")) imagePath = imagePath.slice(1);
//       else imagePath = `uploads/${imagePath}`;
//     }

//     return `${BASE_URL}/${imagePath}`;
//   };

//   if (loading)
//     return (
//       <div className="restaurant-page">
//         <h1 className="page-title">🍴 Choose a Restaurant</h1>
//         <p className="loading-text">Loading restaurants...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="restaurant-page">
//         <h1 className="page-title">🍴 Choose a Restaurant</h1>
//         <p className="error-text">{error}</p>
//       </div>
//     );

//   return (
//     <div className="restaurant-page fade-in">
//       <h1 className="page-title">🍴 Choose a Restaurant</h1>

//       {restaurants.length === 0 ? (
//         <div className="empty-state">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/4150/4150897.png"
//             alt="No restaurants"
//           />
//           <p>No restaurants available</p>
//         </div>
//       ) : (
//         <div className="restaurant-grid">
//           {restaurants.map((rest) => (
//             <div
//               key={rest._id}
//               className="restaurant-card glass hover-zoom"
//               onClick={() => navigate(`/menu/${rest._id}`)}
//             >
//               <div className="image-wrapper">
//                 <img
//                   src={getImageUrl(rest.image)}
//                   alt={rest.restaurantName || rest.name || "Restaurant"}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://placehold.co/400x250?text=Restaurant";
//                   }}
//                 />
//               </div>

//               <div className="info">
//                 <h3 className="restaurant-name">
//                   {rest.restaurantName || rest.name}
//                 </h3>
//                 <p className="address">
//                   {rest.address || "Address not available"}
//                 </p>

//                 <div className="meta">
//                   <span className="rating">
//                     ⭐ {rest.rating?.toFixed(1) || "4.3"}
//                   </span>
//                   <span className="cuisine">
//                     🍽️ {rest.cuisineType || "Various cuisines"}
//                   </span>
//                   <span className="price">
//                     💰 ₹{rest.avgPrice || "400"} for two
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RestaurantList;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/RestaurantList.css";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");
        const data = res.data || [];
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (err) {
        console.error("❌ Error fetching restaurants:", err);
        setError("Failed to load restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  // ✅ Image URL Resolver
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/400x250?text=Restaurant";
    if (imagePath.startsWith("http")) return imagePath;
    imagePath = imagePath.replace(/\\/g, "/").replace(/\/+/g, "/");
    imagePath = imagePath.replace(/^public\//, "").replace(/^\/+/, "");
    if (!imagePath.startsWith("uploads/")) {
      if (imagePath.startsWith("/uploads")) imagePath = imagePath.slice(1);
      else imagePath = `uploads/${imagePath}`;
    }
    return `${BASE_URL}/${imagePath}`;
  };

  // ✅ Apply filters and sorting (no rating or price logic)
  useEffect(() => {
    let filtered = restaurants.filter(
      (r) =>
        (r.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.cuisineType?.toLowerCase().includes(search.toLowerCase())) &&
        (cuisineFilter === "All" || r.cuisineType === cuisineFilter)
    );

    if (sortOption === "rating") {
      filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === "price") {
      filtered = filtered.sort((a, b) => (a.avgPrice || 0) - (b.avgPrice || 0));
    } else if (sortOption === "popularity") {
      filtered = filtered.sort((a, b) => (b.orders || 0) - (a.orders || 0));
    }

    setFilteredRestaurants([...filtered]);
  }, [search, cuisineFilter, sortOption, restaurants]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  if (loading)
    return (
      <div className="restaurant-page">
        <h1 className="page-title">🍴 Choose a Restaurant</h1>
        <p className="loading-text">Loading restaurants...</p>
      </div>
    );

  if (error)
    return (
      <div className="restaurant-page">
        <h1 className="page-title">🍴 Choose a Restaurant</h1>
        <p className="error-text">{error}</p>
      </div>
    );

  return (
    <div className="restaurant-page fade-in">
      <h1 className="page-title">🍴 Choose a Restaurant</h1>

      {/* 🔍 Search + Filters */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search restaurants or cuisines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Cuisines</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Italian">Italian</option>
          <option value="Fast Food">Fast Food</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-select"
        >
          <option value="">Sort By</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="price">Price (Low → High)</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* 🏪 Restaurant Grid */}
      {filteredRestaurants.length === 0 ? (
        <div className="empty-state">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4150/4150897.png"
            alt="No restaurants"
          />
          <p>No restaurants found</p>
        </div>
      ) : (
        <div className="restaurant-grid">
          {filteredRestaurants.map((rest) => (
            <div
              key={rest._id}
              className="restaurant-card glass hover-zoom"
              onClick={() => navigate(`/menu/${rest._id}`)}
            >
              <div className="image-wrapper">
                <img
                  src={getImageUrl(rest.image)}
                  alt={rest.restaurantName || rest.name || "Restaurant"}
                />
                {rest.discount && (
                  <span className="discount-badge">{rest.discount}% OFF</span>
                )}
                <button
                  className={`favorite-btn ${
                    favorites.includes(rest._id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(rest._id);
                  }}
                >
                  ❤️
                </button>
              </div>

              <div className="info">
                <h3 className="restaurant-name" title={rest.name}>
                  {rest.restaurantName || rest.name}
                </h3>
                <p className="address" title={rest.address}>
                  {rest.address || "Address not available"}
                </p>

                <div className="meta">
                  <span className="rating">
                    ⭐ {rest.rating?.toFixed(1) || "4.3"}
                  </span>
                  <span className="cuisine">
                    🍽️ {rest.cuisineType || "Various cuisines"}
                  </span>
                  <span className="price">
                    💰 ₹{rest.avgPrice || "400"} for two
                  </span>
                </div>

                <div className="extra-info">
                  <span>⏱️ {rest.deliveryTime || "30-40 min"}</span>
                  <span>🔥 {rest.orders || 100}+ orders</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantList;
