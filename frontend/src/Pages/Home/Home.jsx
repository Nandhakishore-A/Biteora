import { useState, useContext } from "react";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import Header from "../../Components/Header/Header";
import "./Home.css";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";
import AppDownload from "../../Components/AppDownload/AppDownload";
import { StoreContext } from "../../Context/storeContext";

const Home = ({ showOnlyFavorites, setShowOnlyFavorites }) => {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [copiedCode, setCopiedCode] = useState("");
  const { food_list } = useContext(StoreContext);

  let favIds = [];
  try {
    favIds = JSON.parse(localStorage.getItem("biteora_favorites") || "[]");
  } catch {
    favIds = [];
  }

  const favFoods = (food_list || []).filter((f) => favIds.includes(f._id || f.id));

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
          <FoodDisplay category="All" searchTerm="" sortBy={sortBy} favOnly={true} />
        )}

        <AppDownload />
      </div>
    );
  }

  return (
    <div className="home-container">
      <Header />

      {/* Interactive Offers & Promo Codes Strip */}
      <section className="home-promos-section" aria-label="Special Offers">
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

      <ExploreMenu
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <FoodDisplay
        category={category}
        searchTerm={searchTerm}
        sortBy={sortBy}
      />

      <AppDownload />
    </div>
  );
};

export default Home;
