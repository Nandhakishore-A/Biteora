import { useContext, useRef } from "react";
import "./SignatureDishesRow.css";
import { StoreContext } from "../../Context/storeContext";

const SIGNATURE_NAMES = [
  "Chicken Biryani",
  "Margherita Pizza",
  "Classic Burger",
  "Masala Dosa",
  "Chicken Noodles",
  "Samosa (2 Pcs)",
  "Chocolate Cake",
  "Fresh Orange Juice"
];

// Fallback items in case API is still loading
const FALLBACK_SIGNATURES = [
  {
    _id: "sig_1",
    name: "Chicken Biryani",
    price: 249,
    rating: 4.8,
    prepTime: "30 mins",
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80",
    description: "Royal dum biryani with marinated juicy chicken and fragrant basmati rice",
    isVeg: false
  },
  {
    _id: "sig_2",
    name: "Margherita Pizza",
    price: 299,
    rating: 4.7,
    prepTime: "25 mins",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&auto=format&fit=crop&q=80",
    description: "Classic Italian wood-fired crust, San Marzano sauce and fresh mozzarella",
    isVeg: true
  },
  {
    _id: "sig_3",
    name: "Classic Burger",
    price: 179,
    rating: 4.6,
    prepTime: "20 mins",
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80",
    description: "Juicy flame-grilled patty topped with melted cheddar and secret dressing",
    isVeg: false
  },
  {
    _id: "sig_4",
    name: "Masala Dosa",
    price: 129,
    rating: 4.8,
    prepTime: "20 mins",
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&auto=format&fit=crop&q=80",
    description: "Crispy fermented crepe filled with spiced potato masala and coconut chutney",
    isVeg: true
  },
  {
    _id: "sig_5",
    name: "Chicken Noodles",
    price: 199,
    rating: 4.5,
    prepTime: "25 mins",
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80",
    description: "Wok-tossed Hakka noodles with tender chicken and crunchy bell peppers",
    isVeg: false
  },
  {
    _id: "sig_6",
    name: "Samosa (2 Pcs)",
    price: 59,
    rating: 4.6,
    prepTime: "15 mins",
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&auto=format&fit=crop&q=80",
    description: "Golden flaky pastry stuffed with savory spiced potatoes and sweet peas",
    isVeg: true
  },
  {
    _id: "sig_7",
    name: "Chocolate Cake",
    price: 149,
    rating: 4.7,
    prepTime: "30 mins",
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80",
    description: "Rich dark Belgian chocolate fudge cake with velvet ganache frosting",
    isVeg: true
  },
  {
    _id: "sig_8",
    name: "Fresh Orange Juice",
    price: 99,
    rating: 4.6,
    prepTime: "15 mins",
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&auto=format&fit=crop&q=80",
    description: "Freshly cold-pressed Valencia oranges packed with vitamin C",
    isVeg: true
  }
];

const SignatureDishesRow = ({ category = "All", onSelectDish }) => {
  const { food_list, cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const scrollerRef = useRef(null);

  // Match signature dishes from food_list or fallbacks
  let displayList = [];
  if (food_list && food_list.length > 0) {
    displayList = SIGNATURE_NAMES.map((name) => {
      const found = food_list.find(
        (f) => f.name.toLowerCase().trim() === name.toLowerCase().trim()
      );
      if (found) return found;
      return FALLBACK_SIGNATURES.find((f) => f.name === name);
    }).filter(Boolean);
  }

  if (!displayList.length) {
    displayList = FALLBACK_SIGNATURES;
  }

  // Filter if a specific category is selected
  const filteredList =
    category === "All"
      ? displayList
      : displayList.filter(
          (d) => d.category?.toLowerCase() === category.toLowerCase()
        );

  const finalItems = filteredList.length > 0 ? filteredList : displayList;

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmt = direction === "left" ? -280 : 280;
      scrollerRef.current.scrollBy({ left: scrollAmt, behavior: "smooth" });
    }
  };

  return (
    <section className="signature-dishes-section" aria-label="Signature Dishes">
      <div className="signature-header">
        <div>
          <span className="signature-eyebrow">⭐ Customer Favorites</span>
          <h2 className="signature-title">Signature Dishes</h2>
        </div>
        <div className="signature-nav-controls">
          <button
            type="button"
            className="sig-arrow-btn"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            type="button"
            className="sig-arrow-btn"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div className="signature-scroller" ref={scrollerRef}>
        {finalItems.map((dish) => {
          const dishId = dish._id || dish.id;
          const count = cartItems[dishId] || 0;
          const imageUrl = dish.image?.startsWith("http")
            ? dish.image
            : `${url}/images/${dish.image}`;

          return (
            <div
              key={dishId}
              className="signature-card"
              onClick={() => onSelectDish && onSelectDish(dish)}
              role="button"
              tabIndex={0}
            >
              {/* Left: Square rounded food photo */}
              <div className="sig-image-box">
                <img
                  src={imageUrl}
                  alt={dish.name}
                  className="sig-food-thumb"
                  loading="lazy"
                />
              </div>

              {/* Right: Info, Rating/Time, Price + Add button */}
              <div className="sig-details-col">
                <h4 className="sig-dish-name" title={dish.name}>
                  {dish.name}
                </h4>

                <div className="sig-meta-row">
                  <span className="sig-rating-text">
                    <span className="sig-star">★</span> {dish.rating || 4.8}
                  </span>
                  <span className="sig-bullet">•</span>
                  <span className="sig-preptime-text">{dish.prepTime || "20 mins"}</span>
                </div>

                <div
                  className="sig-price-row"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="sig-price">₹{dish.price}</span>

                  {!count ? (
                    <button
                      type="button"
                      className="sig-add-circle-btn"
                      onClick={() => addToCart(dishId)}
                      aria-label={`Add ${dish.name} to cart`}
                      title="Add to cart"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  ) : (
                    <div className="sig-qty-counter">
                      <button
                        type="button"
                        className="sig-counter-btn"
                        onClick={() => removeFromCart(dishId)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="sig-counter-num">{count}</span>
                      <button
                        type="button"
                        className="sig-counter-btn"
                        onClick={() => addToCart(dishId)}
                        aria-label="Increase quantity"
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

export default SignatureDishesRow;
