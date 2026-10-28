import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory, searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <section className="explore-menu-section" id="explore-menu">
      {/* Category Discovery Header */}
      <div className="explore-menu-header">
        <div>
          <span className="explore-eyebrow">Explore Our Menu</span>
          <h2 className="explore-heading">Browse by Category</h2>
        </div>

        {/* Filter Sliders Button */}
        <button
          type="button"
          className="filter-toggle-btn"
          onClick={() => {
            if (setSortBy) {
              setSortBy((prev) => (prev === "price-low" ? "price-high" : prev === "price-high" ? "default" : "price-low"));
            }
          }}
          title={sortBy === "price-low" ? "Sorted: Price Low to High" : sortBy === "price-high" ? "Sorted: Price High to Low" : "Sort / Filter"}
          aria-label="Filter dishes"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          {sortBy !== "default" && <span className="filter-active-dot"></span>}
        </button>
      </div>

      {/* Horizontal Category Scroller Pills (Matching Exact Mockup) */}
      <div className="category-scroll-container">
        {/* All Pill with Grid Icon */}
        <button
          type="button"
          className={`category-pill-tab ${category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          <div className="tab-icon-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <span className="tab-label">All</span>
        </button>

        {/* 9 Category Pills with Circular Images */}
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <button
              key={index}
              type="button"
              className={`category-pill-tab ${isActive ? "active" : ""}`}
              onClick={() => setCategory(isActive ? "All" : item.menu_name)}
            >
              <div className="tab-thumb-wrap">
                <img src={item.menu_image} alt={item.menu_name} className="tab-thumb" loading="lazy" />
              </div>
              <span className="tab-label">{item.menu_name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreMenu;
