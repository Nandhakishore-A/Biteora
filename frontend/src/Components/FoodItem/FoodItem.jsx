import "./FoodItem.css";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../Context/storeContext";

const FoodItem = ({
  id,
  name,
  price,
  description,
  image,
  rating = 4.8,
  prepTime = "20-25 min",
  isVeg = true,
  tag = "",
  onSelect
}) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const count = cartItems[id] || 0;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("biteora_favorites") || "[]");
      setIsFavorite(favs.includes(id));
    } catch {
      // ignore
    }
  }, [id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem("biteora_favorites") || "[]");
      let updated;
      if (favs.includes(id)) {
        updated = favs.filter((fId) => fId !== id);
        setIsFavorite(false);
      } else {
        updated = [...favs, id];
        setIsFavorite(true);
      }
      localStorage.setItem("biteora_favorites", JSON.stringify(updated));
    } catch {
      setIsFavorite(!isFavorite);
    }
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect({
        _id: id,
        id,
        name,
        price,
        description,
        image,
        rating,
        prepTime,
        isVeg,
        tag
      });
    }
  };

  const imageUrl = image?.startsWith("http") ? image : `${url}/images/${image}`;

  return (
    <div className="card-item-container" onClick={handleCardClick} role="button" tabIndex={0}>
      {/* Top Header: Dietary Tag, Name, Price, and Favorite Heart */}
      <div className="card-top-row">
        <div className="card-info-header">
          <div className="card-diet-row">
            <span
              className={`diet-icon-box ${isVeg ? "veg" : "non-veg"}`}
              title={isVeg ? "100% Pure Veg" : "Non-Veg"}
            >
              <span className="diet-icon-circle"></span>
            </span>
            {tag && <span className="card-mini-tag">{tag}</span>}
          </div>
          <h3 className="card-dish-name" title={description || name}>
            {name}
          </h3>
          <div className="card-dish-meta-row">
            <span className="card-dish-price">₹{price}</span>
            <span className="card-rating-pill">★ {rating}</span>
          </div>
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          className={`card-heart-btn ${isFavorite ? "favorite-active" : ""}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#ff385c" : "none"}
            stroke={isFavorite ? "#ff385c" : "currentColor"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Center: Appetizing floating food photo */}
      <div className="card-image-stage">
        <img src={imageUrl} alt={name} className="card-dish-photo" loading="lazy" />
        <span className="card-preptime-badge">⏱ {prepTime}</span>
      </div>

      {/* Bottom Row: Action Button / Qty Counter & 10% OFF Badge */}
      <div className="card-bottom-row" onClick={(e) => e.stopPropagation()}>
        {!count ? (
          <button
            type="button"
            className="card-action-btn"
            onClick={() => addToCart(id)}
            aria-label="Add to cart"
            title="Add to cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        ) : (
          <div className="card-qty-pill">
            <button
              type="button"
              className="qty-btn"
              onClick={() => removeFromCart(id)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="qty-number">{count}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => addToCart(id)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        )}

        <span className="discount-pill">10% OFF</span>
      </div>
    </div>
  );
};

export default FoodItem;
