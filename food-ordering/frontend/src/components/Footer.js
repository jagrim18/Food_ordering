// import React from "react";
// import "../styles/Footer.css";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-logo">
//           <h2>🍴 Foodify</h2>
//           <p>Delicious food delivered to your door.</p>
//         </div>

//         <div className="footer-links">
//           <a href="/restaurants">Restaurants</a>
//           <a href="/menu">Menu</a>
//           <a href="/orders">My Orders</a>
//           <a href="/profile">Profile</a>
//         </div>

//         <div className="footer-socials">
//           <a href="https://facebook.com" target="_blank" rel="noreferrer">
//             Facebook
//           </a>
//           <a href="https://instagram.com" target="_blank" rel="noreferrer">
//             Instagram
//           </a>
//           <a href="https://twitter.com" target="_blank" rel="noreferrer">
//             Twitter
//           </a>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>© {new Date().getFullYear()} Foodify. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from "react";
import "../styles/Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* ===== Top Section ===== */}
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            🍴 <span>Foodify</span>
          </h2>
          <p className="footer-description">
            Your favorite campus food ordering platform. Skip the line, savor your time!
          </p>

          <ul className="footer-contact">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Bennett university </span>
            </li>
            <li>
              <FaPhoneAlt className="contact-icon" />
              <span>+91 9084573344 </span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>support@foodify.edu</span>
            </li>
          </ul>

          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/restaurants">Outlets</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/track">Order Tracking</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
            <li><a href="/refund">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      {/* ===== Bottom Section ===== */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Foodify. All rights reserved.</p>
        <p className="footer-credit">
          Made with <span>❤️</span> for students & faculty.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
