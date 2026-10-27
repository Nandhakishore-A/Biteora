import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory, searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <section className="explore-menu-section" id="explore-menu">
      {/* Search & Filter Bar (Matching Right Phone Mockup) */}
      <div className="discovery-search-row">
        <div className="search-pill-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-pill-input"
            placeholder="Search favorite dishes, burger, pizza..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Sliders Button (from right phone mockup) */}
        <button
          type="button"
          className="filter-toggle-btn"
          onClick={() => {
            if (setSortBy) {
              setSortBy((prev) => (prev === "price-low" ? "price-high" : prev === "price-high" ? "default" : "price-low"));
            }
          }}
          title={sortBy === "price-low" ? "Sorted: Low to High" : sortBy === "price-high" ? "Sorted: High to Low" : "Filter / Sort"}
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

      {/* Horizontal Category Scroller (Matching Right Phone Mockup) */}
      <div className="category-scroll-container">
        <button
          type="button"
          className={`category-pill-tab ${category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          <span>All</span>
          {category === "All" && <span className="tab-indicator"></span>}
        </button>

        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <button
              key={index}
              type="button"
              className={`category-pill-tab ${isActive ? "active" : ""}`}
              onClick={() => setCategory(isActive ? "All" : item.menu_name)}
            >
              <img src={item.menu_image} alt={item.menu_name} className="tab-thumb" />
              <span>{item.menu_name}</span>
              {isActive && <span className="tab-indicator"></span>}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreMenu;
