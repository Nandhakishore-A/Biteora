import { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/storeContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({
  category,
  searchTerm = "",
  sortBy = "default",
  favOnly = false,
  onSelectDish
}) => {
  const { food_list } = useContext(StoreContext);
  const [quickFilter, setQuickFilter] = useState("all");

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
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase().trim())) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase().trim()));

    if (!matchesCategory || !matchesSearch) return false;

    // Quick filter criteria
    if (quickFilter === "veg") return item.isVeg === true;
    if (quickFilter === "non-veg") return item.isVeg === false;
    if (quickFilter === "bestseller") return item.tag === "Bestseller" || item.tag === "Chef Special";
    if (quickFilter === "top-rated") return (item.rating || 4.8) >= 4.9;
    if (quickFilter === "under-200") return item.price <= 200;
    if (quickFilter === "fast") return item.prepTime?.includes("15") || item.prepTime?.includes("10");

    return true;
  });

  if (sortBy === "price-low") {
    filteredFoods = [...filteredFoods].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredFoods = [...filteredFoods].sort((a, b) => b.price - a.price);
  }

  const quickFilterPills = [
    { key: "all", label: "🍽️ All", desc: "Full catalog" },
    { key: "bestseller", label: "🔥 Bestsellers", desc: "Top orders" },
    { key: "veg", label: "🌱 Pure Veg", desc: "100% vegetarian" },
    { key: "non-veg", label: "🍗 Non-Veg", desc: "Gourmet meats" },
    { key: "top-rated", label: "⭐ Top Rated (4.9★)", desc: "Highest reviewed" },
    { key: "under-200", label: "⚡ Under ₹200", desc: "Pocket-friendly" },
    { key: "fast", label: "⏱️ Fast Prep (≤20m)", desc: "Speedy delivery" }
  ];

  return (
    <section className="food-display-section" id="food-display">
      <div className="food-display-header-row">
        <div>
          <h2 className="food-section-title">
            {favOnly ? "Your Saved Favorites ❤️" : "Explore Delicious Dishes"}{" "}
            <span className="title-category-tag">({category})</span>
          </h2>
          <p className="food-section-sub">
            {favOnly
              ? "All your hand-picked meals saved in one convenient place."
              : "Freshly prepared meals by top local chefs, delivered right to your doorstep."}
          </p>
        </div>
        <span className="results-badge">{filteredFoods.length} dishes ready</span>
      </div>

      {/* Interactive Quick Filter Chips Bar */}
      {!favOnly && (
        <div className="quick-filter-scroll-wrapper">
          <div className="quick-filter-pills">
            {quickFilterPills.map((pill) => (
              <button
                key={pill.key}
                type="button"
                className={`quick-filter-chip ${quickFilter === pill.key ? "active" : ""}`}
                onClick={() => setQuickFilter(pill.key)}
              >
                <span>{pill.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredFoods.length === 0 ? (
        <div className="food-empty-state">
          <span className="empty-emoji">{favOnly ? "🤍" : "🍽️"}</span>
          <h3>{favOnly ? "No favorite dishes yet" : "No dishes match your filter"}</h3>
          <p>
            {favOnly
              ? "Tap the heart icon on any dish card to add it to your favorites."
              : "Try switching filters, clearing your search, or selecting another category above."}
          </p>
          {quickFilter !== "all" && (
            <button
              type="button"
              className="btn-primary-lime reset-filter-btn"
              onClick={() => setQuickFilter("all")}
            >
              Reset to All Dishes
            </button>
          )}
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
              rating={item.rating || 4.8}
              prepTime={item.prepTime || "20-25 min"}
              isVeg={item.isVeg !== undefined ? item.isVeg : true}
              tag={item.tag || ""}
              onSelect={onSelectDish}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FoodDisplay;
