import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import Header from "../../Components/Header/Header";
import "./Home.css";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";
import TrendingDishes from "../../Components/TrendingDishes/TrendingDishes";
import SignatureDishesRow from "../../Components/SignatureDishesRow/SignatureDishesRow";
import FoodModal from "../../Components/FoodModal/FoodModal";
import AppDownload from "../../Components/AppDownload/AppDownload";
import { StoreContext } from "../../Context/storeContext";

const Home = ({ showOnlyFavorites, setShowOnlyFavorites }) => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [copiedCode, setCopiedCode] = useState("");
  const [selectedDish, setSelectedDish] = useState(null);

  const { food_list, cartItems, addToCart, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const navigate = useNavigate();

  let favIds = [];
  try {
    favIds = JSON.parse(localStorage.getItem("biteora_favorites") || "[]");
  } catch {
    favIds = [];
  }

  const favFoods = (food_list || []).filter((f) => favIds.includes(f._id || f.id));
  const totalCartCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const totalCartAmount = getTotalCartAmount();

  const copyPromo = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2500);
  };

  const promos = [
    {
      code: "BITEORA10",
      tag: "10% OFF",
      desc: "Get 10% discount on all gourmet dishes",
      bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      border: "rgba(100, 216, 0, 0.4)"
    },
    {
      code: "WELCOME50",
      tag: "FLAT ₹50 OFF",
      desc: "Save ₹50 on orders of ₹200 and above",
      bg: "linear-gradient(135deg, #fefce8 0%, #fef08a 100%)",
      border: "rgba(234, 179, 8, 0.4)"
    },
    {
      code: "FREEDEL",
      tag: "FREE DELIVERY",
      desc: "Zero delivery fees applied instantly",
      bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      border: "rgba(59, 130, 246, 0.4)"
    }
  ];

  if (showOnlyFavorites) {
    return (
      <div className="home-container">
        <div className="favorites-header-banner">
          <div className="favorites-banner-text">
            <h2>Your Favorite Dishes ❤️</h2>
            <p>Quick access to all meals you loved and saved.</p>
          </div>
          <button
            type="button"
            className="btn-primary-lime"
            onClick={() => setShowOnlyFavorites(false)}
          >
            Back to Full Menu
          </button>
        </div>

        {favFoods.length === 0 ? (
          <div className="favorites-empty-box">
            <span className="empty-heart-icon">🤍</span>
            <h3>No favorite dishes yet</h3>
            <p>Tap the heart icon on any dish card to save your top picks here!</p>
            <button
              type="button"
              className="btn-primary-lime"
              onClick={() => setShowOnlyFavorites(false)}
              style={{ marginTop: "16px" }}
            >
              Explore Menu
            </button>
          </div>
        ) : (
          <FoodDisplay
            category="All"
            searchTerm=""
            sortBy={sortBy}
            favOnly={true}
            onSelectDish={setSelectedDish}
          />
        )}

        {selectedDish && (
          <FoodModal
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
            cartCount={cartItems[selectedDish._id || selectedDish.id] || 0}
            onAdd={addToCart}
            onRemove={removeFromCart}
            url={url}
          />
        )}

        <AppDownload />
      </div>
    );
  }

  return (
    <div className="home-container">
      <Header setSearchTerm={setSearchTerm} setCategory={setCategory} />

      {/* Category Discovery Pills Row (Exact Mockup Layout) */}
      <ExploreMenu
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Signature Dishes Horizontal Row (8 Dishes from Mockup) */}
      <SignatureDishesRow
        category={category}
        onSelectDish={setSelectedDish}
      />

      {/* Interactive Offers & Promo Codes Strip */}
      <section id="home-promos" className="home-promos-section" aria-label="Special Offers">
        <div className="home-promos-header">
          <div>
            <span className="promos-eyebrow">⚡ Today's Top Offers</span>
            <h3 className="promos-heading">Claim Exclusive Biteora Coupons</h3>
          </div>
          <span className="promos-note">Click any code to copy</span>
        </div>

        <div className="home-promos-grid">
          {promos.map((p) => {
            const isCopied = copiedCode === p.code;
            return (
              <div
                key={p.code}
                className="promo-ticket"
                style={{ background: p.bg, borderColor: p.border }}
                onClick={() => copyPromo(p.code)}
                title="Click to copy coupon code"
              >
                <div className="ticket-top">
                  <span className="ticket-badge">{p.tag}</span>
                  <span className="ticket-action">{isCopied ? "✓ Copied!" : "Tap to Copy"}</span>
                </div>
                <div className="ticket-code-row">
                  <code className="ticket-code">{p.code}</code>
                </div>
                <p className="ticket-desc">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chef's Specials & Trending Dishes Carousel (Interactive Showcase) */}
      <TrendingDishes onSelectDish={setSelectedDish} />

      {/* Main Dishes Grid with Live Filter Pills & Dish Modal */}
      <FoodDisplay
        category={category}
        searchTerm={searchTerm}
        sortBy={sortBy}
        onSelectDish={setSelectedDish}
      />

      {/* Interactive Floating Quick Cart Bar (appears when items added) */}
      {totalCartCount > 0 && (
        <div
          className="floating-cart-toast"
          onClick={() => navigate("/cart")}
          role="button"
          tabIndex={0}
          title="View Cart and Checkout"
        >
          <div className="toast-left">
            <span className="toast-icon">🛒</span>
            <span className="toast-count">{totalCartCount}</span>
            <div className="toast-info">
              <strong>Order in Progress</strong>
              <small>Subtotal: ₹{totalCartAmount.toFixed(2)}</small>
            </div>
          </div>
          <div className="toast-right">
            <span>View Cart</span>
            <span className="toast-arrow">→</span>
          </div>
        </div>
      )}

      {/* Quick View Dish Modal */}
      {selectedDish && (
        <FoodModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          cartCount={cartItems[selectedDish._id || selectedDish.id] || 0}
          onAdd={addToCart}
          onRemove={removeFromCart}
          url={url}
        />
      )}

      <AppDownload />
    </div>
  );
};

export default Home;
