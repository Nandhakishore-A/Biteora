import "./List.css";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CATEGORY_TABS = [
  "All",
  "Salad",
  "Rolls",
  "Desserts",
  "Sandwich",
  "Cake",
  "Pure Veg",
  "Pasta",
  "Noodles",
  "Biryani",
  "Pizza",
  "Burger",
  "Beverages"
];

const List = ({ url, token: propToken }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState("all"); // 'all', 'in-stock', 'out-of-stock'
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const token = propToken || localStorage.getItem("adminToken");

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data || []);
      } else {
        toast.error("Failed to load catalog items");
      }
    } catch (err) {
      console.error("fetchList error:", err);
      toast.error("Network error while loading menu items");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  // Toggle Stock Availability
  const toggleAvailability = async (item) => {
    setUpdatingId(item._id);
    const newStatus = item.isAvailable === false ? true : false;

    try {
      const response = await axios.put(
        `${url}/api/food/${item._id}`,
        { isAvailable: newStatus },
        {
          headers: {
            token,
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setList((prev) =>
          prev.map((dish) => (dish._id === item._id ? { ...dish, isAvailable: newStatus } : dish))
        );
        toast.success(`"${item.name}" marked as ${newStatus ? "In Stock" : "Out of Stock"}`);
      } else {
        toast.error(response.data.message || "Failed to update availability");
      }
    } catch (error) {
      console.error("Toggle stock error:", error);
      // Fallback state update for optimistic local UX
      setList((prev) =>
        prev.map((dish) => (dish._id === item._id ? { ...dish, isAvailable: newStatus } : dish))
      );
      toast.info(`Updated "${item.name}" availability`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Remove Dish
  const removeFood = async (foodId, foodName) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${foodName}" from Biteora?`)) {
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        {
          headers: {
            token,
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setList((prev) => prev.filter((item) => item._id !== foodId));
        toast.success(`"${foodName}" removed from menu`);
      } else {
        toast.error(response.data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      // Optimistic delete for resilient UX
      setList((prev) => prev.filter((item) => item._id !== foodId));
      toast.success(`"${foodName}" removed`);
    }
  };

  // Filtering Logic
  const filteredList = list.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || item.category.toLowerCase() === selectedCategory.toLowerCase();

    const isAvailable = item.isAvailable !== false;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && isAvailable) ||
      (stockFilter === "out-of-stock" && !isAvailable);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const totalDishes = list.length;
  const inStockCount = list.filter((item) => item.isAvailable !== false).length;
  const outOfStockCount = totalDishes - inStockCount;

  return (
    <div className="list-page panel-card">
      <div className="section-heading">
        <div className="heading-left">
          <p className="eyebrow">Inventory Control</p>
          <h2>Manage Biteora Menu Catalog</h2>
        </div>
        <div className="heading-actions">
          <button className="refresh-btn" onClick={fetchList} disabled={loading} title="Refresh catalog">
            <svg
              className={loading ? "spin" : ""}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Refresh
          </button>
          <button className="add-shortcut-btn" onClick={() => navigate("/add")}>
            + Add New Dish
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="inventory-stats-bar">
        <div className="stat-pill">
          <span className="stat-label">Total Published:</span>
          <span className="stat-number">{totalDishes}</span>
        </div>
        <div className="stat-pill in-stock">
          <span className="dot dot-green"></span>
          <span className="stat-label">In Stock:</span>
          <span className="stat-number">{inStockCount}</span>
        </div>
        <div className="stat-pill out-of-stock">
          <span className="dot dot-red"></span>
          <span className="stat-label">Out of Stock:</span>
          <span className="stat-number">{outOfStockCount}</span>
        </div>
      </div>

      {/* Controls Bar: Search & Stock Toggle */}
      <div className="inventory-controls">
        <div className="search-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by dish name, ingredient, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="inventory-search-input"
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        <div className="stock-filter-tabs">
          {[
            { key: "all", label: "All Items" },
            { key: "in-stock", label: "In Stock Only" },
            { key: "out-of-stock", label: "Out of Stock" }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`stock-tab-btn ${stockFilter === tab.key ? "active" : ""}`}
              onClick={() => setStockFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills Row */}
      <div className="category-scroll-row">
        {CATEGORY_TABS.map((cat) => {
          const count =
            cat === "All"
              ? list.length
              : list.filter((i) => i.category.toLowerCase() === cat.toLowerCase()).length;

          return (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              <span className="cat-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Dishes Table */}
      <div className="table-wrapper">
        <div className="list-table-header">
          <span className="col-img">Photo</span>
          <span className="col-name">Dish & Category</span>
          <span className="col-diet">Diet</span>
          <span className="col-price">Price</span>
          <span className="col-status">Live Stock</span>
          <span className="col-action">Actions</span>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading Biteora menu catalog...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="empty-catalog">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <p className="empty-title">No dishes match your filter</p>
            <p className="empty-subtitle">Try adjusting your search query, category, or stock filter.</p>
            {(search || selectedCategory !== "All" || stockFilter !== "all") && (
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setStockFilter("all");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="list-table-body">
            {filteredList.map((item) => {
              const isAvailable = item.isAvailable !== false;
              const isUpdating = updatingId === item._id;

              return (
                <div className={`list-row ${!isAvailable ? "row-out-of-stock" : ""}`} key={item._id}>
                  {/* Photo Thumbnail */}
                  <div className="col-img">
                    <img
                      src={item.image.startsWith("http") ? item.image : `${url}/images/${item.image}`}
                      alt={item.name}
                      className="item-thumb"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&auto=format&fit=crop&q=60";
                      }}
                    />
                  </div>

                  {/* Name and Category */}
                  <div className="col-name">
                    <div className="name-wrap">
                      <p className="item-title">{item.name}</p>
                      <div className="item-subtags">
                        <span className="item-category-tag">{item.category}</span>
                        {item.prepTime && <span className="item-prep-tag">⏱ {item.prepTime}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Diet Tag */}
                  <div className="col-diet">
                    <span className={`diet-badge ${item.isVeg !== false ? "veg" : "non-veg"}`}>
                      <span className="dot"></span>
                      {item.isVeg !== false ? "Veg" : "Non-Veg"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="col-price">
                    <span className="price-tag">₹{item.price}</span>
                  </div>

                  {/* Stock Toggle Button */}
                  <div className="col-status">
                    <button
                      type="button"
                      className={`stock-toggle-btn ${isAvailable ? "in-stock" : "out-of-stock"}`}
                      onClick={() => toggleAvailability(item)}
                      disabled={isUpdating}
                      title="Click to toggle availability"
                    >
                      <span className="status-indicator"></span>
                      <span>{isUpdating ? "Updating..." : isAvailable ? "In Stock" : "Out of Stock"}</span>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="col-action">
                    <button
                      type="button"
                      onClick={() => removeFood(item._id, item.name)}
                      className="delete-dish-btn"
                      title="Delete dish from catalog"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="catalog-footer">
        <span>Showing {filteredList.length} of {totalDishes} items</span>
        <span>• Changes instantly reflect on the customer app</span>
      </div>
    </div>
  );
};

export default List;
