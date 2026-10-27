import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/storeContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchTerm = "", sortBy = "default", favOnly = false }) => {
  const { food_list } = useContext(StoreContext);

  let favIds = [];
  if (favOnly) {
    try {
      favIds = JSON.parse(localStorage.getItem("biteora_favorites") || "[]");
    } catch {
      favIds = [];
    }
  }

  let filteredFoods = (food_list || []).filter((item) => {
    const itemId = item._id || item.id;
    if (favOnly && !favIds.includes(itemId)) return false;
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch =
      !searchTerm.trim() ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase().trim()));
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "price-low") {
    filteredFoods = [...filteredFoods].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredFoods = [...filteredFoods].sort((a, b) => b.price - a.price);
  }

  return (
    <section className="food-display-section" id="food-display">
      <div className="food-display-header-row">
        <div>
          <h2 className="food-section-title">
            {favOnly ? "Your Favorites" : "Popular Dishes"}{" "}
            <span className="title-category-tag">({category})</span>
          </h2>
          <p className="food-section-sub">
            {favOnly
              ? "All your hand-picked meals saved in one convenient place."
              : "Freshly prepared meals by top local chefs, delivered right to your doorstep."}
          </p>
        </div>
        <span className="results-badge">{filteredFoods.length} items</span>
      </div>

      {filteredFoods.length === 0 ? (
        <div className="food-empty-state">
          <span className="empty-emoji">{favOnly ? "🤍" : "🍽️"}</span>
          <h3>{favOnly ? "No favorite dishes yet" : "No dishes found"}</h3>
          <p>
            {favOnly
              ? "Tap the heart icon on any dish card to add it to your favorites."
              : "Try searching for a different dish or select another category above."}
          </p>
        </div>
      ) : (
        <div className="food-grid-container">
          {filteredFoods.map((item) => (
            <FoodItem
              key={item._id || item.id}
              id={item._id || item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FoodDisplay;
