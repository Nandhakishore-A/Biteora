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
  const { food_list } = useContext(StoreContext);

  let favIds = [];
  try {
    favIds = JSON.parse(localStorage.getItem("biteora_favorites") || "[]");
  } catch {
    favIds = [];
  }

  const favFoods = (food_list || []).filter((f) => favIds.includes(f._id || f.id));

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
          <FoodDisplay category="All" searchTerm="" sortBy={sortBy} />
        )}

        <AppDownload />
      </div>
    );
  }

  return (
    <div className="home-container">
      <Header />
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
