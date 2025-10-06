import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Menu.css"; // ✅ reuse menu styles

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await api.get("/restaurants");
        setRestaurants(res.data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="menu-container">
      <h1 className="menu-title">🏪 Choose a Restaurant</h1>
      <div className="menu-grid">
        {restaurants.length > 0 ? (
          restaurants.map((rest) => (
            <div
              key={rest._id}
              className="menu-card"
              onClick={() => navigate(`/menu/${rest._id}`)}
            >
              <img
                src={rest.image || "https://via.placeholder.com/200"}
                alt={rest.name}
              />
              <h3>{rest.name}</h3>
              <p>{rest.location || rest.email}</p>
            </div>
          ))
        ) : (
          <p>No restaurants available</p>
        )}
      </div>
    </div>
  );
}

export default RestaurantList;
