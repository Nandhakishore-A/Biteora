import { useContext, useEffect, useState, useCallback } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const pipelineStages = ["Confirmed", "Preparing", "Out for Delivery", "Delivered"];

const getStageIndex = (status) => {
  if (status === "Food Preparing") return 1;
  const idx = pipelineStages.indexOf(status);
  return idx === -1 ? 0 : idx;
};

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/userorders`, {
        headers: {
          token,
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data.data || []);
    } catch {
      try {
        const res = await axios.post(
          `${url}/api/order/userorders`,
          {},
          { headers: { token, Authorization: `Bearer ${token}` } }
        );
        setData(res.data.data || []);
      } catch {
        setData([]);
      }
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => {
    if (token) {
      void fetchOrders();
    } else {
      navigate("/cart");
    }
  }, [token, fetchOrders, navigate]);

  return (
    <div className="my-orders">
      <div className="my-orders-header">
        <div>
          <h2>Order History</h2>
          <p className="my-orders-sub">
            Track your meal fulfillment in real time from kitchen prep to your doorstep.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchOrders}
          className="refresh-orders-btn"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "↻ Refresh Orders"}
        </button>
      </div>

      <div className="my-orders-container">
        {data.length === 0 ? (
          <div className="my-orders-empty">
            <span className="empty-order-emoji">🍱</span>
            <h3>No orders placed yet</h3>
            <p>
              Your kitchen is waiting! Explore Biteora's top-rated chefs and treat yourself today.
            </p>
            <button
              type="button"
              className="btn-primary-lime"
              onClick={() => navigate("/")}
              style={{ marginTop: "16px" }}
            >
              Browse Full Menu
            </button>
          </div>
        ) : (
          data.map((order, index) => {
            const currentStage = getStageIndex(order.status);
            const isCancelled = order.status === "Cancelled";
            const isCOD = order.paymentMethod === "COD";

            return (
              <div key={order._id || index} className="my-order-card">
                <div className="order-card-top">
                  <div className="order-card-brand">
                    <img
                      src={assets.parcel_icon}
                      alt="Parcel"
                      className="order-parcel-icon"
                    />
                    <div>
                      <div className="order-tags-row">
                        <span
                          className={`order-pay-badge ${
                            order.payment
                              ? "paid"
                              : isCOD
                              ? "cod"
                              : "pending"
                          }`}
                        >
                          {order.payment
                            ? "✓ Paid Online"
                            : isCOD
                            ? "💵 Cash on Delivery"
                            : "⏳ Payment Pending"}
                        </span>
                        {order.promoCode && (
                          <span className="order-promo-badge">
                            🎟️ {order.promoCode}
                          </span>
                        )}
                        <span className="order-date-text">
                          {order.date ? new Date(order.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          }) : ""}
                        </span>
                      </div>

                      <p className="order-items-summary">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="order-item-chip">
                            {item.name} <strong>x{item.quantity}</strong>
                            {idx < order.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="order-price-box">
                    <span className="order-total-price">
                      ₹{order.amount?.toFixed(2)}
                    </span>
                    <span className="order-item-count">
                      {order.items?.length || 1} {order.items?.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>

                {/* Status Progress Stepper */}
                {!isCancelled ? (
                  <div className="order-stepper-wrap">
                    {pipelineStages.map((stage, sIdx) => {
                      const isDone = sIdx <= currentStage;
                      const isCurrent = sIdx === currentStage;
                      return (
                        <div
                          key={stage}
                          className={`stepper-step ${isDone ? "done" : ""} ${isCurrent ? "current" : ""}`}
                        >
                          <div className="stepper-indicator">
                            <span className="stepper-circle">
                              {isDone && !isCurrent ? "✓" : sIdx + 1}
                            </span>
                            {sIdx < pipelineStages.length - 1 && (
                              <div className={`stepper-line ${sIdx < currentStage ? "done" : ""}`}></div>
                            )}
                          </div>
                          <span className="stepper-label">{stage}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="order-cancelled-banner">
                    ✕ This order was cancelled
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;
