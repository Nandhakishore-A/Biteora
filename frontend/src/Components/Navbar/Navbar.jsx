import "./Navbar.css";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/storeContext";

const Navbar = ({ setShowLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("New York, US");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const { getTotalCartAmount, cartItems, token, setToken } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  const totalCartCount = Object.values(cartItems || {}).reduce((sum, qty) => sum + qty, 0);

  const cities = ["New York, US", "Los Angeles, CA", "Chicago, IL", "London, UK", "Mumbai, IN", "Bangalore, IN"];

  const handleHomeClick = (event) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        {/* Brand Logo with Chef Hat Icon */}
        <div className="navbar-left-group">
          <Link to="/" className="navbar-brand" onClick={handleHomeClick} aria-label="Biteora Home">
            <div className="brand-chef-hat">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 13.8C4.3 13.5 3 12 3 10.2C3 8.2 4.6 6.5 6.6 6.5C6.8 6.5 7 6.5 7.2 6.6C8 4.5 10 3 12.3 3C15.1 3 17.4 5.1 17.8 7.8C18.2 7.7 18.6 7.6 19 7.6C20.7 7.6 22 8.9 22 10.6C22 12.2 20.9 13.6 19.3 13.9C18.9 14 18.5 14 18 14H6.5C6.3 14 6.2 13.9 6 13.8Z" stroke="#64d800" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(100, 216, 0, 0.15)"/>
                <path d="M7 17H17M7 20H17" stroke="#2e7d00" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 14V21H17V14" stroke="#2e7d00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="navbar-logo-text">
              Bite<span className="logo-accent">ora</span>
            </span>
          </Link>

          {/* Location Selector: "Delivery to New York, US" */}
          <div className="location-container">
            <button
              className="location-pill"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              aria-label="Change delivery location"
            >
              <div className="location-pin-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64d800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="location-text">
                <span className="location-caption">Delivery to</span>
                <span className="location-city">{selectedCity}</span>
              </div>
              <svg className="location-chevron" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {showLocationDropdown && (
              <div className="location-menu">
                <p className="location-menu-title">Select delivery city</p>
                {cities.map((city) => (
                  <button
                    key={city}
                    className={`location-menu-item ${selectedCity === city ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowLocationDropdown(false);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      {selectedCity === city && <circle cx="12" cy="12" r="4" fill="currentColor"></circle>}
                    </svg>
                    <span>{city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <ul className={`navbar-menu ${mobileMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className={`navbar-link-pill ${location.pathname === "/" ? "active" : ""}`} onClick={handleHomeClick}>
              Home
            </Link>
          </li>
          <li>
            <button className="navbar-link" onClick={() => handleNavClick("explore-menu")}>
              Menu
            </button>
          </li>
          <li>
            <button className="navbar-link" onClick={() => handleNavClick("home-promos")}>
              Offers
            </button>
          </li>
          <li>
            <button className="navbar-link" onClick={() => handleNavClick("app-download")}>
              App
            </button>
          </li>
          <li>
            <button className="navbar-link" onClick={() => handleNavClick("footer")}>
              Contact
            </button>
          </li>
        </ul>

        {/* Right Actions: Search + Bell + Cart Pill + Profile */}
        <div className="navbar-actions">
          {/* Circular Search Button */}
          <button
            className="action-circle-btn search-toggle-btn"
            onClick={() => handleNavClick("explore-menu")}
            aria-label="Search dishes"
            title="Search dishes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Notification Bell with red dot */}
          <button
            className="action-circle-btn notification-btn"
            onClick={() => setShowNotificationModal(!showNotificationModal)}
            aria-label="Notifications"
            title="Notifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="notification-dot"></span>
          </button>

          {/* Cart Pill (Green bag icon + badge + amount) */}
          <Link to="/cart" className="navbar-cart-pill" aria-label="View cart" title="Shopping Cart">
            <div className="cart-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {totalCartCount > 0 && <span className="cart-badge-count">{totalCartCount}</span>}
            </div>
            <span className="cart-amount-text">
              {getTotalCartAmount() > 0 ? `₹${getTotalCartAmount()}` : "₹0"}
            </span>
          </Link>

          {/* Profile Circle Button */}
          {!token ? (
            <button
              className="action-circle-btn profile-action-btn"
              onClick={() => setShowLogin(true)}
              aria-label="Sign In"
              title="Sign In / Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          ) : (
            <div className="navbar-profile">
              <div className="action-circle-btn profile-action-btn logged-in" title="Account Menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <ul className="navbar-dropdown">
                <li onClick={() => navigate("/myorders")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                  </svg>
                  <span>My Orders</span>
                </li>
                <li onClick={logout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                  </svg>
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile hamburger toggle */}
          <button
            className={`navbar-hamburger ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Notifications Drawer */}
      {showNotificationModal && (
        <div className="notification-modal-overlay" onClick={() => setShowNotificationModal(false)}>
          <div className="notification-modal" onClick={(e) => e.stopPropagation()}>
            <div className="notification-modal-header">
              <h3>Notifications</h3>
              <button onClick={() => setShowNotificationModal(false)}>✕</button>
            </div>
            <div className="notification-item unread">
              <span className="notif-badge-pill">🔥 10% OFF</span>
              <p className="notif-text">Welcome to Biteora! Enjoy 10% savings on your first order.</p>
              <span className="notif-time">Just now</span>
            </div>
            <div className="notification-item">
              <span className="notif-badge-pill">⚡ Fast Delivery</span>
              <p className="notif-text">Kitchens in your area are serving hot & fast meals!</p>
              <span className="notif-time">10m ago</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
