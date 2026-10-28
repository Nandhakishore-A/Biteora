import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = ({ setShowLogin }) => {
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    appliedPromo,
    getDiscountAmount,
    getDeliveryFee,
    getFinalTotal,
    clearCart
  } = useContext(StoreContext);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      if (setShowLogin) setShowLogin(true);
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate, setShowLogin]);

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const orderItems = [];
    food_list.forEach((item) => {
      const itemId = item._id || item.id;
      if (cartItems[itemId] > 0) {
        orderItems.push({
          foodId: itemId,
          name: item.name,
          price: item.price,
          quantity: cartItems[itemId],
          image: item.image
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      paymentMethod,
      promoCode: appliedPromo?.code || "",
      totalAmount: getFinalTotal()
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          token,
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        if (response.data.isCOD) {
          clearCart();
          navigate("/myorders");
        } else if (response.data.session_url) {
          window.location.replace(response.data.session_url);
        } else {
          clearCart();
          navigate("/myorders");
        }
      } else {
        alert(response.data.message || "Order placement failed. Please try again.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getTotalCartAmount();
  const discount = getDiscountAmount();
  const deliveryFee = getDeliveryFee();
  const finalTotal = getFinalTotal();

  return (
    <form className="place-order" onSubmit={placeOrder}>
      {/* Left Column: Delivery Form */}
      <div className="place-order-left">
        <h2 className="title">Delivery Address</h2>
        <p className="order-subhead">Enter where you'd like your meal delivered.</p>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          placeholder="Street Address, Apt / Suite"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />

        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="State / Province"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip / Postal Code"
            name="zipCode"
            value={data.zipCode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>

        <input
          type="tel"
          placeholder="Contact Phone Number"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />

        {/* Payment Method Selector */}
        <div className="payment-method-block">
          <h3 className="payment-title">Payment Method</h3>
          <div className="payment-options-grid">
            <label className={`payment-option-card ${paymentMethod === "COD" ? "active" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <div className="payment-card-content">
                <span className="payment-icon">💵</span>
                <div>
                  <strong>Cash on Delivery</strong>
                  <p>Pay with cash or UPI upon meal arrival</p>
                </div>
              </div>
            </label>

            <label className={`payment-option-card ${paymentMethod === "Stripe" ? "active" : ""}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={() => setPaymentMethod("Stripe")}
              />
              <div className="payment-card-content">
                <span className="payment-icon">💳</span>
                <div>
                  <strong>Online Card / UPI</strong>
                  <p>Fast and encrypted payment via Stripe</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Summary</h2>
          
          <div className="cart-total-details">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="cart-total-details">
            <span>Delivery Fee</span>
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
              <span>Coupon ({appliedPromo?.code})</span>
              <span className="discount-value">-₹{discount.toFixed(2)}</span>
            </div>
          )}

          <div className="cart-summary-divider"></div>

          <div className="cart-total-details grand-total">
            <div>
              <span>Final Total</span>
              <small className="inclusive-text">(Includes taxes)</small>
            </div>
            <span className="grand-total-amount">₹{finalTotal.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="btn-primary-lime place-order-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Confirming Order..."
            ) : paymentMethod === "COD" ? (
              "Confirm Cash on Delivery Order"
            ) : (
              "Proceed to Secure Payment"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
