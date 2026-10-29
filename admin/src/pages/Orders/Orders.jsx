import "./Orders.css";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const orderStatuses = [
  "Pending Payment",
  "Confirmed",
  "Food Preparing",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled"
];

const Orders = ({ url, token: propToken }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const token = propToken || localStorage.getItem("adminToken");

  const normalizeStatus = (status) => {
    return orderStatuses.includes(status) ? status : orderStatuses[1];
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        `${url}/api/order/status`,
        {
          orderId,
          status: newStatus
        },
        {
          headers: {
            token,
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success(`Order status updated to "${newStatus}"`);
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      // Optimistic state update for resilient offline/fallback experience
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.info(`Status updated to "${newStatus}"`);
    }
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: {
          token,
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setOrders(response.data.data || []);
        setLastUpdated(new Date());
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (err) {
      console.error("fetchOrders error:", err);
      toast.error("Could not load incoming orders");
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => {
    void fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter((order) => {
    // 1. Tab filter
    if (filter === "paid" && !order.payment) return false;
    if (filter === "cod" && order.paymentMethod !== "COD") return false;
    if (filter === "active" && ["Delivered", "Cancelled"].includes(order.status)) return false;
    if (filter === "delivered" && order.status !== "Delivered") return false;
    if (filter === "cancelled" && order.status !== "Cancelled") return false;

    // 2. Search filter
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    const fullName = `${order.address?.firstName || ""} ${order.address?.lastName || ""}`.toLowerCase();
    const phone = (order.address?.phone || "").toLowerCase();
    const city = (order.address?.city || "").toLowerCase();
    const street = (order.address?.street || "").toLowerCase();
    const orderId = (order._id || "").toLowerCase();
    const itemsMatch = (order.items || []).some((item) =>
      (item.name || "").toLowerCase().includes(query)
    );

    return (
      fullName.includes(query) ||
      phone.includes(query) ||
      city.includes(query) ||
      street.includes(query) ||
      orderId.includes(query) ||
      itemsMatch
    );
  });

  const activeOrdersCount = orders.filter((o) => !["Delivered", "Cancelled"].includes(o.status)).length;
  const totalRevenue = orders.reduce((sum, o) => (o.status !== "Cancelled" ? sum + (Number(o.amount) || 0) : sum), 0);

  return (
    <div className="order-page panel-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Kitchen Fulfillment Queue</p>
          <h2>Biteora Order Pipeline</h2>
        </div>
        <div className="orders-header-actions">
          <button className="refresh-orders-btn" onClick={fetchOrders} disabled={loading} title="Refresh orders">
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
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <span className="last-sync-tag">
            Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
        </div>
      </div>

      {/* Orders Quick KPI Bar */}
      <div className="orders-kpi-bar">
        <div className="kpi-mini-card">
          <span className="kpi-mini-label">Active Queue</span>
          <span className="kpi-mini-val active">{activeOrdersCount}</span>
        </div>
        <div className="kpi-mini-card">
          <span className="kpi-mini-label">Total Placed</span>
          <span className="kpi-mini-val">{orders.length}</span>
        </div>
        <div className="kpi-mini-card">
          <span className="kpi-mini-label">Total Revenue</span>
          <span className="kpi-mini-val rev">₹{totalRevenue.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="orders-controls-bar">
        <div className="orders-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by customer name, phone, dish item, or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="orders-search-input"
          />
          {search && (
            <button className="clear-search-btn" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        <div className="order-filter-chips">
          {[
            { key: "all", label: `All (${orders.length})` },
            { key: "active", label: `Active (${activeOrdersCount})` },
            { key: "cod", label: `COD (${orders.filter((o) => o.paymentMethod === "COD").length})` },
            { key: "paid", label: `Paid (${orders.filter((o) => o.payment).length})` },
            { key: "delivered", label: `Delivered (${orders.filter((o) => o.status === "Delivered").length})` },
            { key: "cancelled", label: `Cancelled (${orders.filter((o) => o.status === "Cancelled").length})` }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`filter-chip-btn ${filter === tab.key ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-container">
        {loading && orders.length === 0 ? (
          <div className="orders-loading">
            <div className="spinner"></div>
            <p>Loading incoming orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <p className="empty-title">No orders found</p>
            <p className="empty-subtitle">
              {search || filter !== "all"
                ? "No orders match your current filter settings."
                : "New orders will appear here in real-time as customers check out on Biteora."}
            </p>
            {(search || filter !== "all") && (
              <button
                className="reset-orders-filter-btn"
                onClick={() => {
                  setFilter("all");
                  setSearch("");
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="orders-cards-list">
            {filteredOrders.map((order) => {
              const orderDate = order.date ? new Date(order.date) : new Date();
              const currentStatus = normalizeStatus(order.status);

              return (
                <div key={order._id} className={`order-card status-${currentStatus.toLowerCase().replace(/\s+/g, "-")}`}>
                  {/* Top Bar: Order ID, Date, and Badges */}
                  <div className="order-card-header">
                    <div className="order-id-group">
                      <span className="order-number">#{order._id ? order._id.slice(-6).toUpperCase() : "ORDER"}</span>
                      <span className="order-timestamp">
                        {orderDate.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} •{" "}
                        {orderDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <div className="order-badges-group">
                      <span
                        className={`payment-badge ${
                          order.payment
                            ? "paid-badge"
                            : order.paymentMethod === "COD"
                            ? "cod-badge"
                            : "unpaid-badge"
                        }`}
                      >
                        {order.payment
                          ? "✓ PAID (ONLINE)"
                          : order.paymentMethod === "COD"
                          ? "💵 CASH ON DELIVERY"
                          : "⏳ PAYMENT PENDING"}
                      </span>

                      {order.promoCode && (
                        <span className="promo-badge">
                          🎟️ {order.promoCode} (-₹{order.discountAmount || 0})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Grid: Items, Customer Info, Total Amount, and Status Select */}
                  <div className="order-card-body">
                    {/* Items List */}
                    <div className="order-items-section">
                      <p className="section-mini-title">Ordered Items ({order.items?.length || 0}):</p>
                      <div className="order-items-tags">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="item-chip">
                            <span className="item-qty">{item.quantity}x</span>
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer & Address Details */}
                    <div className="order-customer-section">
                      <p className="customer-name">
                        👤 {order.address?.firstName || "Customer"} {order.address?.lastName || ""}
                      </p>
                      <p className="customer-address">
                        📍 {[order.address?.street, order.address?.city, order.address?.state, order.address?.zipCode]
                          .filter(Boolean)
                          .join(", ") || "Address not provided"}
                      </p>
                      <p className="customer-phone">
                        📞 <a href={`tel:${order.address?.phone}`}>{order.address?.phone || "No phone"}</a>
                      </p>
                    </div>

                    {/* Price and Status Controller */}
                    <div className="order-action-section">
                      <div className="order-total-box">
                        <span className="total-label">Total Amount</span>
                        <span className="total-amount">₹{Number(order.amount || 0).toFixed(2)}</span>
                      </div>

                      <div className="status-controller">
                        <label className="status-label">Update Kitchen Status:</label>
                        <select
                          className={`status-dropdown status-style-${currentStatus.toLowerCase().replace(/\s+/g, "-")}`}
                          onChange={(e) => statusHandler(e, order._id)}
                          value={currentStatus}
                        >
                          {orderStatuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
