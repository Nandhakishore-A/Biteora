import { useState } from "react";
import "./Header.css";

const Header = ({ setSearchTerm, setCategory }) => {
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (setSearchTerm && localSearch.trim()) {
      setSearchTerm(localSearch.trim());
    }
    const menuSection = document.getElementById("explore-menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSpecialOfferClick = () => {
    if (setCategory) {
      setCategory("Healthy");
    }
    const menuSection = document.getElementById("explore-menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home-top" className="hero-banner">
      {/* Decorative Floating Leaves and Citrus Accents */}
      <div className="hero-floating-item leaf-1" aria-hidden="true">🍃</div>
      <div className="hero-floating-item leaf-2" aria-hidden="true">🌿</div>
      <div className="hero-floating-item lemon-1" aria-hidden="true">🍋</div>
      <div className="hero-floating-item tomato-1" aria-hidden="true">🍅</div>

      <div className="hero-grid">
        {/* Left Column: Eyebrow, Main Headline, Subtitle, Search Pill */}
        <div className="hero-left-col">
          <div className="hero-eyebrow-pill">
            <span className="eyebrow-leaf">🌱</span>
            <span>Fresh Food • Fast Delivery • Best Restaurants</span>
          </div>

          <div className="hero-headline-group">
            <h1 className="hero-heading-main">
              <span className="heading-line-1">Order Food</span>
              <span className="heading-line-2">
                <span className="lime-highlight">Anytime</span>{" "}
                <span className="serif-italic">Anywhere</span>
              </span>
            </h1>
          </div>

          <p className="hero-subtext">
            Discover delicious meals delivered fast from your favorite local restaurants.
          </p>

          <form className="hero-search-pill" onSubmit={handleSearchSubmit}>
            <div className="hero-search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search for dishes, restaurants..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button
              type="submit"
              className="hero-search-submit-btn"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        {/* Center Column: Doodle text + Chicken Grain Bowl + 10% save badge */}
        <div className="hero-center-col">
          <div className="doodle-text-wrapper">
            <span className="doodle-text">Good Food Good Mood !</span>
            <svg className="doodle-curve-arrow" width="70" height="26" viewBox="0 0 70 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18C20 2 50 4 66 16" stroke="#2e7d00" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
              <path d="M60 8L67 16L58 20" stroke="#2e7d00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="doodle-heart">♥</span>
          </div>

          <div className="hero-main-bowl-wrapper">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=85"
              alt="Delicious Chicken & Fresh Grain Bowl"
              className="hero-main-bowl-img"
              loading="eager"
            />

            {/* Circular Scalloped 10% save badge */}
            <div className="hero-save-scallop-badge">
              <div className="scallop-inner">
                <span className="scallop-percent">10%</span>
                <span className="scallop-label">save</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dark Special Offer Card */}
        <div className="hero-right-col">
          <div className="special-offer-card" onClick={handleSpecialOfferClick} role="button" tabIndex={0}>
            <div className="offer-card-top">
              <div className="offer-text-block">
                <span className="offer-cursive-tag">Special Offer</span>
                <h3 className="offer-title">Delicious Healthy Bowls</h3>
              </div>
              <div className="offer-dish-thumb-wrap">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&auto=format&fit=crop&q=80"
                  alt="Healthy Bowl Mini Preview"
                  className="offer-dish-thumb"
                />
                <span className="offer-thumb-leaf">🌱</span>
              </div>
            </div>

            <p className="offer-coupon-line">
              Flat 10% OFF | Use code: <span className="coupon-code-pill">BITE10</span>
            </p>

            <button
              type="button"
              className="offer-order-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleSpecialOfferClick();
              }}
            >
              <span>Order Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2e7d00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
