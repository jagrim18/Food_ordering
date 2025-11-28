// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import PropTypes from "prop-types";
// import "../styles/RestaurantList.css";

// function RestaurantList() {
//   const [restaurants, setRestaurants] = useState([]);
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
//   const [search, setSearch] = useState("");
//   const [cuisineFilter, setCuisineFilter] = useState("All");
//   const [sortOption, setSortOption] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // ============================
//   // LOAD RESTAURANTS
//   // ============================
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const res = await api.get("/restaurants");
//         const data = res.data || [];

//         const openOnly = data.filter((r) => r.isOpen !== false);

//         setRestaurants(openOnly);
//         setFilteredRestaurants(openOnly);
//       } catch (err) {
//         console.error("❌ Error fetching restaurants:", err);
//         setError("Failed to load restaurants. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   // ============================
//   // FILTER & SORT
//   // ============================
//   useEffect(() => {
//     let filtered = restaurants.filter((r) => {
//       const title = r.restaurantName || r.name || "";
//       const cuisine = r.cuisineType || "";

//       return (
//         title.toLowerCase().includes(search.toLowerCase()) ||
//         cuisine.toLowerCase().includes(search.toLowerCase())
//       ) && (cuisineFilter === "All" || cuisine === cuisineFilter);
//     });

//     if (sortOption === "rating")
//       filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

//     if (sortOption === "price")
//       filtered = filtered.sort(
//         (a, b) => (a.avgPrice || 0) - (b.avgPrice || 0)
//       );

//     if (sortOption === "popularity")
//       filtered = filtered.sort((a, b) => (b.orders || 0) - (a.orders || 0));

//     setFilteredRestaurants([...filtered]);
//   }, [search, cuisineFilter, sortOption, restaurants]);

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

//       {/* Filters */}
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

//       {/* Restaurant Grid */}
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
//                 <AutoCarousel
//                   images={
//                     rest.galleryImages && rest.galleryImages.length > 0
//                       ? rest.galleryImages
//                       : [rest.image]
//                   }
//                   cuisineType={rest.cuisineType}
//                 />

//                 <span
//                   className={`status-badge ${
//                     rest.isOpen ? "open" : "closed"
//                   }`}
//                 >
//                   {rest.isOpen ? "Open" : "Closed"}
//                 </span>
//               </div>

//               <div className="info">
//                 <h3 className="restaurant-name">
//                   {rest.restaurantName || rest.name}
//                 </h3>
//                 <p className="description">
//                   {rest.description ||
//                     rest.cuisineType ||
//                     "Delicious meals"}
//                 </p>

//                 <div className="timing">
//                   ⏰ {rest.openTime || "11:00 AM"} -{" "}
//                   {rest.closeTime || "9:00 PM"}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ===============================
// // AUTO CAROUSEL
// // ===============================
// const AutoCarousel = ({ images, cuisineType }) => {
//   const [index, setIndex] = useState(0);

//   const BASE_URL =
//     process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

//   useEffect(() => {
//     if (images.length <= 1) return;

//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images]);

//   const resolveImg = (img) => {
//     if (!img) return null;
//     if (img.startsWith("http")) return img;

//     return `${BASE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
//   };

//   const currentImg =
//     images.length > 0
//       ? resolveImg(images[index])
//       : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";

//   return (
//     <div className="carousel-container">
//       <img
//         src={currentImg}
//         alt={cuisineType || "Restaurant"}
//         className="carousel-image"
//         loading="lazy"
//       />
//     </div>
//   );
// };

// AutoCarousel.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.oneOfType([PropTypes.string, PropTypes.object])
//   ),
//   cuisineType: PropTypes.string,
// };

// AutoCarousel.defaultProps = {
//   images: [],
//   cuisineType: "Food",
// };

// export default RestaurantList;








import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import PropTypes from "prop-types";
import "../styles/RestaurantList.css";

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ============================
  // LOAD RESTAURANTS
  // ============================
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");
        const data = res.data || [];

        const openOnly = data.filter((r) => r.isOpen !== false);

        setRestaurants(openOnly);
        setFilteredRestaurants(openOnly);
      } catch (err) {
        console.error("❌ Error fetching restaurants:", err);
        setError("Failed to load restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // ============================
  // FILTER & SORT (Cuisine Removed)
  // ============================
  useEffect(() => {
    let filtered = restaurants.filter((r) => {
      const title = r.restaurantName || r.name || "";
      return title.toLowerCase().includes(search.toLowerCase());
    });

    if (sortOption === "rating")
      filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    if (sortOption === "price")
      filtered = filtered.sort(
        (a, b) => (a.avgPrice || 0) - (b.avgPrice || 0)
      );

    if (sortOption === "popularity")
      filtered = filtered.sort((a, b) => (b.orders || 0) - (a.orders || 0));

    setFilteredRestaurants([...filtered]);
  }, [search, sortOption, restaurants]);

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

      {/* Filters */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search restaurants..."
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
          <option value="rating">Rating (High → Low)</option>
          <option value="price">Price (Low → High)</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* Restaurant Grid */}
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
                />

                <span
                  className={`status-badge ${
                    rest.isOpen ? "open" : "closed"
                  }`}
                >
                  {rest.isOpen ? "Open" : "Closed"}
                </span>
              </div>

              <div className="info">
                <h3 className="restaurant-name">
                  {rest.restaurantName || rest.name}
                </h3>

                <p className="description">
                  {rest.description || "Delicious meals available"}
                </p>

                <div className="timing">
                  ⏰ {rest.openTime || "11:00 AM"} -{" "}
                  {rest.closeTime || "9:00 PM"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===============================
// AUTO CAROUSEL
// ===============================
const AutoCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const BASE_URL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

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
        alt="Restaurant"
        className="carousel-image"
        loading="lazy"
      />
    </div>
  );
};

AutoCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
};

AutoCarousel.defaultProps = {
  images: [],
};

export default RestaurantList;
