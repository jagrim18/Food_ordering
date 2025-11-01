import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>🍴 Foodify</h2>
          <p>Delicious food delivered to your door.</p>
        </div>

        <div className="footer-links">
          <a href="/restaurants">Restaurants</a>
          <a href="/menu">Menu</a>
          <a href="/orders">My Orders</a>
          <a href="/profile">Profile</a>
        </div>

        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            Twitter
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Foodify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
