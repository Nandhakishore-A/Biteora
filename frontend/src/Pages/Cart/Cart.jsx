import { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/storeContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ setShowLogin }) => {
  const {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    getDiscountAmount,
    getDeliveryFee,
    getFinalTotal,
    token,
    url
  } = useContext(StoreContext);

  const [promoInput, setPromoInput] = useState("");
  const [promoStatus, setPromoStatus] = useState(null);
  const navigate = useNavigate();

  const cartCount = Object.values(cartItems).filter((v) => v > 0).length;
  const subtotal = getTotalCartAmount();
  const discount = getDiscountAmount();
  const deliveryFee = getDeliveryFee();
  const finalTotal = getFinalTotal();

  const handleApplyPromo = (codeToApply) => {
    const code = codeToApply || promoInput;
    if (!code) return;
    const res = applyPromoCode(code);
    setPromoStatus(res);
    if (res.success) {
      setPromoInput("");
    }
    setTimeout(() => setPromoStatus(null), 4000);
  };

  const quickPromos = [
    { code: "BITE10", label: "10% OFF" },
    { code: "BITEORA10", label: "10% OFF" },
    { code: "WELCOME50", label: "₹50 OFF" },
    { code: "FREEDEL", label: "FREE DELIVERY" }
  ];

  return (
    <div className="cart-page">
      <div className="cart-header-row">
        <div>
          <h1 className="cart-page-title">
            Your <span className="gradient-text">Food Cart</span>
          </h1>
          <p className="cart-page-sub">
            Review your gourmet picks, apply discount offers, and proceed to swift checkout.
          </p>
        </div>
        {cartCount > 0 && (
          <span className="cart-count-badge">{cartCount} {cartCount === 1 ? "dish" : "dishes"}</span>
        )}
      </div>

      {cartCount === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <h2>Your cart is feeling hungry!</h2>
          <p>Explore the Biteora catalog and add fresh, hot meals to your plate.</p>
          <button className="btn-primary-lime" onClick={() => navigate("/")} style={{ marginTop: "12px" }}>
            Explore Delicious Dishes
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-card">
            <div className="cart-items-header">
              <span>Dish</span>
              <span>Name</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
              <span>Action</span>
            </div>
            {food_list.map((item) => {
              const itemId = item._id || item.id;
              if (cartItems[itemId] > 0) {
                return (
                  <div key={itemId} className="cart-item-row">
                    <img
                      src={item.image?.startsWith("http") ? item.image : `${url}/images/${item.image}`}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-meta">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-cat">{item.category}</span>
                    </div>
                    <span className="cart-item-price">₹{item.price}</span>
                    <div className="cart-qty-stepper">
                      <button
                        type="button"
                        className="cart-stepper-btn"
                        onClick={() => removeFromCart(itemId)}
                        aria-label="Decrease quantity"
                        title="Decrease"
                      >
                        −
                      </button>
                      <span className="cart-item-qty">{cartItems[itemId]}</span>
                      <button
                        type="button"
                        className="cart-stepper-btn"
                        onClick={() => addToCart(itemId)}
                        aria-label="Increase quantity"
                        title="Increase"
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-item-total">
                      ₹{(item.price * cartItems[itemId]).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => removeFromCart(itemId)}
                      aria-label="Remove item"
                      title="Remove from cart"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className="cart-bottom">
            {/* Promo Code & Offers Section */}
            <div className="cart-promo-card">
              <div className="promo-card-header">
                <span className="promo-tag-icon">🎟️</span>
                <div>
                  <h3>Have a Promo Code?</h3>
                  <p>Apply valid discount codes to save extra on your order.</p>
                </div>
              </div>

              <div className="cart-promocode-input">
                <input
                  type="text"
                  placeholder="Enter code (e.g. BITEORA10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleApplyPromo();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleApplyPromo()}
                >
                  Apply
                </button>
              </div>

              {promoStatus && (
                <div className={`promo-status-msg ${promoStatus.success ? "success" : "error"}`}>
                  {promoStatus.success ? "✓ " : "✕ "} {promoStatus.message}
                </div>
              )}

              {appliedPromo && (
                <div className="applied-promo-pill">
                  <div className="applied-promo-info">
                    <span className="applied-badge">Active</span>
                    <strong>{appliedPromo.code}</strong>
                    <small>({appliedPromo.label})</small>
                  </div>
                  <button
                    type="button"
                    className="remove-promo-btn"
                    onClick={removePromoCode}
                    title="Remove coupon"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Quick Click Offers */}
              <div className="quick-promos-section">
                <span className="quick-promos-title">Available Offers:</span>
                <div className="quick-promos-grid">
                  {quickPromos.map((p) => (
                    <button
                      key={p.code}
                      type="button"
                      className={`quick-promo-btn ${appliedPromo?.code === p.code ? "selected" : ""}`}
                      onClick={() => handleApplyPromo(p.code)}
                    >
                      <span className="promo-code-bold">{p.code}</span>
                      <span className="promo-badge-mini">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="cart-total-card">
              <h2>Order Summary</h2>
              
              <div className="cart-total-details">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="cart-total-details">
                <span>Delivery Charges</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong className="text-lime-free">FREE</strong>
                  ) : (
                    `₹${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="cart-total-details discount-row">
                  <span>
                    Coupon Discount ({appliedPromo?.code})
                  </span>
                  <span className="discount-value">-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="cart-summary-divider"></div>

              <div className="cart-total-details grand-total">
                <div>
                  <span>Total Amount</span>
                  <small className="inclusive-text">(Inclusive of all taxes)</small>
                </div>
                <span className="grand-total-amount">₹{finalTotal.toFixed(2)}</span>
              </div>

              {!token && (
                <p className="cart-signin-notice">
                  🔒 Please sign in to finalize your delivery address & order
                </p>
              )}

              <button
                type="button"
                className="btn-primary-lime cart-checkout-btn"
                onClick={() => {
                  if (!token) {
                    if (setShowLogin) setShowLogin(true);
                  } else {
                    navigate("/order");
                  }
                }}
              >
                {!token ? "Sign In to Checkout" : "Proceed to Checkout"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
