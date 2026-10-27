import { useRef, useContext } from "react";
import "./TrendingDishes.css";
import { StoreContext } from "../../Context/storeContext";

const TrendingDishes = ({ onSelectDish }) => {
  const { food_list, cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  const scrollRef = useRef(null);

  // Top 10 trending & chef special dishes
  const trendingList = (food_list || []).filter(
    (item) => item.rating >= 4.9 || item.tag === "Chef Special" || item.tag === "Bestseller"
  ).slice(0, 10);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!trendingList.length) return null;

  return (
    <section className="trending-section" aria-label="Trending Gourmet Picks">
      <div className="trending-header">
        <div>
          <span className="trending-eyebrow">🔥 Handpicked Perfection</span>
          <h2 className="trending-title">Chef's Specials & Trending Picks</h2>
        </div>
        <div className="trending-nav-arrows">
          <button
            type="button"
            className="arrow-btn"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            type="button"
            className="arrow-btn"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div className="trending-scroller" ref={scrollRef}>
        {trendingList.map((dish) => {
          const dishId = dish._id || dish.id;
          const count = cartItems[dishId] || 0;
          const imgUrl = dish.image?.startsWith("http")
            ? dish.image
            : `${url}/images/${dish.image}`;

          return (
            <div
              key={dishId}
              className="trending-card"
              onClick={() => onSelectDish && onSelectDish(dish)}
              role="button"
              tabIndex={0}
            >
              <div className="trending-card-img-box">
                <img src={imgUrl} alt={dish.name} loading="lazy" />
                <span className="trending-tag-badge">
                  {dish.tag || "Chef Special"}
                </span>
                <span className="trending-rating-badge">★ {dish.rating || 4.9}</span>
              </div>

              <div className="trending-card-info">
                <div className="trending-name-row">
                  <h3 className="trending-dish-name">{dish.name}</h3>
                  <span
                    className={`diet-dot-mini ${dish.isVeg ? "veg" : "non-veg"}`}
                    title={dish.isVeg ? "Veg" : "Non-Veg"}
                  ></span>
                </div>
                <p className="trending-dish-sub">{dish.category} • {dish.prepTime || "15-20 min"}</p>

                <div
                  className="trending-card-bottom"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="trending-price">₹{dish.price}</span>

                  {!count ? (
                    <button
                      type="button"
                      className="trending-add-btn"
                      onClick={() => addToCart(dishId)}
                    >
                      + Add
                    </button>
                  ) : (
                    <div className="trending-qty-pill">
                      <button
                        type="button"
                        onClick={() => removeFromCart(dishId)}
                      >
                        −
                      </button>
                      <span>{count}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(dishId)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingDishes;
