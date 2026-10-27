import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  const handleGetStartedClick = () => {
    const menuSection = document.getElementById("explore-menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home-top" className="hero-banner">
      {/* Background Organic Wave Shape */}
      <div className="hero-wave-shape"></div>

      <div className="hero-inner">
        {/* Left / Top Content: Matching Left Phone Header */}
        <div className="hero-content">
          <div className="hero-headline-group">
            <h1 className="hero-title">Order Food</h1>
            <p className="hero-script-sub script-text">Anytime Anywhere</p>
          </div>

          <p className="hero-desc">
            Discover delicious meals delivered fast from your favorite local restaurants.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-circle-dark hero-arrow-btn"
              onClick={handleGetStartedClick}
              aria-label="View menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button
              type="button"
              className="btn-primary-lime hero-start-btn"
              onClick={handleGetStartedClick}
            >
              Get started
            </button>
          </div>
        </div>

        {/* Right / Center Visual: Platter & Badges */}
        <div className="hero-visual-container">
          {/* 10% save Starburst badge (matches mockup) */}
          <div className="hero-save-badge">
            <div className="starburst-inner">
              <span className="badge-percent">10%</span>
              <span className="badge-label">save</span>
            </div>
            {/* Scalloped teeth ring */}
            <div className="starburst-teeth"></div>
          </div>

          {/* Decorative floating starburst sparks (matches mockup) */}
          <div className="deco-starburst star-1">✦</div>
          <div className="deco-starburst star-2">✦</div>
          <div className="deco-starburst star-3">✦</div>

          {/* Food Platter Imagery */}
          <div className="hero-platter-wrapper">
            <img
              src={assets.header_img}
              alt="Mouthwatering burgers, crispy fries, and delicious sides"
              className="hero-platter-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
