import "./MobileDock.css";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/storeContext";

const MobileDock = ({ setShowLogin, showOnlyFavorites, setShowOnlyFavorites }) => {
  const { cartItems, token } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  const totalCartCount = Object.values(cartItems || {}).reduce((sum, qty) => sum + qty, 0);

  const isHome = location.pathname === "/" && !showOnlyFavorites;
  const isOrders = location.pathname === "/myorders";
  const isCart = location.pathname === "/cart";

  const handleHomeClick = () => {
    if (setShowOnlyFavorites) setShowOnlyFavorites(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrdersClick = () => {
    if (token) {
      navigate("/myorders");
    } else {
      setShowLogin(true);
    }
  };

  const handleFavoritesClick = () => {
    if (setShowOnlyFavorites) {
      if (location.pathname !== "/") {
        navigate("/");
      }
      setShowOnlyFavorites((prev) => !prev);
    }
  };

  const handleProfileClick = () => {
    if (!token) {
      setShowLogin(true);
    } else {
      navigate("/myorders");
    }
  };

  return (
    <nav className="mobile-dock-bar" aria-label="Mobile navigation dock">
      <div className="mobile-dock-inner">
        {/* Home */}
        <button
          type="button"
          className={`dock-tab ${isHome ? "active" : ""}`}
          onClick={handleHomeClick}
          aria-label="Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={isHome ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="dock-label">Home</span>
          {isHome && <span className="dock-active-dot"></span>}
        </button>

        {/* Message / Orders */}
        <button
          type="button"
          className={`dock-tab ${isOrders ? "active" : ""}`}
          onClick={handleOrdersClick}
          aria-label="Orders"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="dock-label">Orders</span>
          {isOrders && <span className="dock-active-dot"></span>}
        </button>

        {/* Floating Center Elevated Cart Button (from mockup) */}
        <div className="dock-center-cart-slot">
          <button
            type="button"
            className={`dock-floating-cart-btn ${isCart ? "active" : ""}`}
            onClick={() => navigate("/cart")}
            aria-label="View Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {totalCartCount > 0 && (
              <span className="dock-cart-badge">{totalCartCount}</span>
            )}
          </button>
        </div>

        {/* Favorite */}
        <button
          type="button"
          className={`dock-tab ${showOnlyFavorites ? "active" : ""}`}
          onClick={handleFavoritesClick}
          aria-label="Favorites"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={showOnlyFavorites ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span className="dock-label">Favorite</span>
          {showOnlyFavorites && <span className="dock-active-dot"></span>}
        </button>

        {/* Profile */}
        <button
          type="button"
          className="dock-tab"
          onClick={handleProfileClick}
          aria-label="Profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="dock-label">{token ? "Profile" : "Sign In"}</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileDock;
