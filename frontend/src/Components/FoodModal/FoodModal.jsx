import { useEffect } from "react";
import "./FoodModal.css";

const FoodModal = ({ dish, onClose, cartCount = 0, onAdd, onRemove, url }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!dish) return null;

  const dishId = dish._id || dish.id;
  const imageUrl = dish.image?.startsWith("http")
    ? dish.image
    : `${url}/images/${dish.image}`;

  return (
    <div className="dish-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="dish-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="dish-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Hero Image */}
        <div className="dish-modal-hero">
          <img src={imageUrl} alt={dish.name} className="dish-modal-img" />
          <div className="dish-modal-badges">
            <span className={`dish-diet-pill ${dish.isVeg ? "veg" : "non-veg"}`}>
              <span className="diet-dot"></span>
              {dish.isVeg ? "100% Pure Veg" : "Non-Veg Specialty"}
            </span>
            {dish.tag && <span className="dish-tag-pill">{dish.tag}</span>}
          </div>
        </div>

        {/* Modal Content */}
        <div className="dish-modal-body">
          <div className="dish-modal-header">
            <div>
              <h2 className="dish-modal-title">{dish.name}</h2>
              <span className="dish-modal-cat">{dish.category}</span>
            </div>
            <span className="dish-modal-price">₹{dish.price}</span>
          </div>

          {/* Quick Metrics (Rating, Prep Time, Calories) */}
          <div className="dish-metrics-strip">
            <div className="metric-pill">
              <span className="metric-icon">⭐</span>
              <strong>{dish.rating || 4.8}</strong>
              <small>({dish.reviewsCount || 150}+)</small>
            </div>
            <div className="metric-pill">
              <span className="metric-icon">⏱️</span>
              <span>{dish.prepTime || "20-25 min"}</span>
            </div>
            <div className="metric-pill">
              <span className="metric-icon">🔥</span>
              <span>{dish.calories || "350 kcal"}</span>
            </div>
          </div>

          <p className="dish-modal-desc">
            {dish.description ||
              "Crafted with handpicked fresh ingredients, traditional spices, and culinary artistry by top local chefs."}
          </p>

          <div className="dish-highlights-box">
            <span className="highlight-tag">✨ Freshly Prepared</span>
            <span className="highlight-tag">🛡️ Contactless Packing</span>
            <span className="highlight-tag">🌱 Chef Tested</span>
          </div>

          {/* Modal Footer: Quantity & Add Button */}
          <div className="dish-modal-footer">
            <div className="modal-qty-controls">
              {cartCount > 0 ? (
                <div className="modal-qty-pill">
                  <button
                    type="button"
                    onClick={() => onRemove(dishId)}
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="modal-qty-count">{cartCount}</span>
                  <button
                    type="button"
                    onClick={() => onAdd(dishId)}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              ) : (
                <span className="modal-no-item">Not in cart yet</span>
              )}
            </div>

            <button
              type="button"
              className="btn-primary-lime modal-cta-btn"
              onClick={() => {
                onAdd(dishId);
              }}
            >
              {cartCount > 0
                ? `Add Another (₹${dish.price})`
                : `Add to Cart • ₹${dish.price}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
