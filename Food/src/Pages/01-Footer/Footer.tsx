import './Footer.css';
import { FaInstagram, FaFacebook, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo1 from "../../assets/images/foodlogo.jpg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <img src={logo1} alt="Max-i Logo" className="logo1" />
          <p>
            Elevating your digital experience through clean designs and innovative tech.
          </p>
          <div className="footer-icons">

            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
             <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Get In Touch</h3>
          <ul className="footer-contact">
            <li>
              <FaMapMarkerAlt />
              <span>12, Park Avenue, Suite 501, Bengaluru, India - 560001</span>
            </li>
            <li>
              <FaPhoneAlt />
              <span>+91 98765 43210</span>
            </li>
            <li>
              <FaEnvelope />
              <span>support@maxisite.com</span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-copy">
        © 2025 Maxisite Technologies. All rights reserved.
      </p>
    </footer>
  );
}
