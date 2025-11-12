// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import "../styles/RestaurantList.css";

// function RestaurantList() {
//   const [restaurants, setRestaurants] = useState([]);
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
//   const [search, setSearch] = useState("");
//   const [cuisineFilter, setCuisineFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [favorites, setFavorites] = useState([]);

//   const navigate = useNavigate();
//   const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const res = await api.get("/restaurants");
//         const data = res.data || [];
//         setRestaurants(data);
//         setFilteredRestaurants(data);
//       } catch (err) {
//         console.error("❌ Error fetching restaurants:", err);
//         setError("Failed to load restaurants. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRestaurants();
//   }, []);

//   // ✅ Smart Image Resolver
//   const getImageUrl = (imagePath, cuisineType) => {
//     const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
//     if (imagePath) {
//       if (imagePath.startsWith("http")) return imagePath;
//       imagePath = imagePath.replace(/\\/g, "/").replace(/^public\//, "").replace(/^\/+/, "");
//       if (!imagePath.startsWith("uploads/")) imagePath = `uploads/${imagePath}`;
//       return `${BASE_URL}/${imagePath}`;
//     }

//     const cuisineImages = {
//       Indian: "https://images.unsplash.com/photo-1600628422019-7e3d4e46919f?auto=format&fit=crop&w=900&q=80",
//       Chinese: "https://images.unsplash.com/photo-1604909053193-7f8e8dfe47d4?auto=format&fit=crop&w=900&q=80",
//       Italian: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
//       "Fast Food": "https://images.unsplash.com/photo-1606755962773-0b4b4f9f6f5b?auto=format&fit=crop&w=900&q=80",
//       default: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
//     };
//     return cuisineImages[cuisineType] || cuisineImages.default;
//   };

//   // ✅ Apply filters and sorting
//   useEffect(() => {
//     let filtered = restaurants.filter(
//       (r) =>
//         (r.name?.toLowerCase().includes(search.toLowerCase()) ||
//           r.cuisineType?.toLowerCase().includes(search.toLowerCase())) &&
//         (cuisineFilter === "All" || r.cuisineType === cuisineFilter)
//     );

//     if (sortOption === "rating") {
//       filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//     } else if (sortOption === "price") {
//       filtered = filtered.sort((a, b) => (a.avgPrice || 0) - (b.avgPrice || 0));
//     } else if (sortOption === "popularity") {
//       filtered = filtered.sort((a, b) => (b.orders || 0) - (a.orders || 0));
//     }

//     setFilteredRestaurants([...filtered]);
//   }, [search, cuisineFilter, sortOption, restaurants]);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
//     );
//   };

//   if (loading)
//     return (
//       <div className="restaurant-page">
//         <h1 className="page-title">Order from Campus Outlets</h1>
//         <p className="loading-text">Loading restaurants...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="restaurant-page">
//         <h1 className="page-title">Order from Campus Outlets</h1>
//         <p className="error-text">{error}</p>
//       </div>
//     );

//   return (
//     <div className="restaurant-page fade-in">
//       <h1 className="page-title">Order from Campus Outlets</h1>
//       <p className="page-subtitle">
//         Choose from our variety of food outlets across campus
//       </p>

//       {/* 🔍 Search + Filters */}
//       <div className="filters-container">
//         <input
//           type="text"
//           placeholder="Search restaurants or cuisines..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="search-bar"
//         />

//         <select
//           value={cuisineFilter}
//           onChange={(e) => setCuisineFilter(e.target.value)}
//           className="filter-select"
//         >
//           <option value="All">All Cuisines</option>
//           <option value="Indian">Indian</option>
//           <option value="Chinese">Chinese</option>
//           <option value="Italian">Italian</option>
//           <option value="Fast Food">Fast Food</option>
//         </select>

//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="filter-select"
//         >
//           <option value="">Sort By</option>
//           <option value="rating">Rating (High → Low)</option>
//           <option value="price">Price (Low → High)</option>
//           <option value="popularity">Popularity</option>
//         </select>
//       </div>

//       {/* 🏪 Restaurant Grid */}
//       {filteredRestaurants.length === 0 ? (
//         <div className="empty-state">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/4150/4150897.png"
//             alt="No restaurants"
//           />
//           <p>No restaurants found</p>
//         </div>
//       ) : (
//         <div className="restaurant-grid">
//           {filteredRestaurants.map((rest) => (
//             <div
//               key={rest._id}
//               className="restaurant-card"
//               onClick={() => navigate(`/menu/${rest._id}`)}
//             >
//               <div className="image-wrapper">
//                 <img
//                   src={getImageUrl(rest.image, rest.cuisineType)}
//                   alt={rest.restaurantName || rest.name || "Restaurant"}
//                 />
//                 <span className="status-badge">Open</span>
//               </div>

//               <div className="info">
//                 <h3 className="restaurant-name">
//                   {rest.restaurantName || rest.name}
//                 </h3>
//                 <p className="description">
//                   {rest.description || rest.cuisineType || "Delicious meals"}
//                 </p>

//                 <div className="timing">
//                   ⏰ {rest.openingTime || "11:00 AM"} -{" "}
//                   {rest.closingTime || "9:00 PM"}
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
        <h1 className="page-title">Order from Campus Outlets</h1>
        <p className="loading-text">Loading restaurants...</p>
      </div>
    );

  if (error)
    return (
      <div className="restaurant-page">
        <h1 className="page-title">Order from Campus Outlets</h1>
        <p className="error-text">{error}</p>
      </div>
    );

  return (
    <div className="restaurant-page fade-in">
      <h1 className="page-title">Order from Campus Outlets</h1>
      <p className="page-subtitle">
        Choose from our variety of food outlets across campus
      </p>

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
              className="restaurant-card"
              onClick={() => navigate(`/menu/${rest._id}`)}
            >
              <div className="image-wrapper">
                <AutoCarousel
                  images={
                    rest.galleryImages && rest.galleryImages.length > 0
                      ? rest.galleryImages
                      : [rest.image]
                  }
                  cuisineType={rest.cuisineType}
                />
                <span className="status-badge">Open</span>
              </div>

              <div className="info">
                <h3 className="restaurant-name">
                  {rest.restaurantName || rest.name}
                </h3>
                <p className="description">
                  {rest.description || rest.cuisineType || "Delicious meals"}
                </p>

                <div className="timing">
                  ⏰ {rest.openingTime || "11:00 AM"} -{" "}
                  {rest.closingTime || "9:00 PM"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// 🎞️ AutoCarousel Component for Smooth Image Scrolling
// ============================================================
const AutoCarousel = ({ images = [], cuisineType }) => {
  const [index, setIndex] = useState(0);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const resolveImg = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return `${BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
  };

  const currentImg =
    images.length > 0
      ? resolveImg(images[index])
      : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";

  return (
    <div className="carousel-container">
      <img
        src={currentImg}
        alt={cuisineType || "Restaurant"}
        className="carousel-image"
        loading="lazy"
      />
    </div>
  );
};

export default RestaurantList;
