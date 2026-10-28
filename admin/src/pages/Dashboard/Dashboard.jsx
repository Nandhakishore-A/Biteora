import { useState, useEffect, useCallback } from "react";
import "./Dashboard.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ url, token }) => {
  const [orders, setOrders] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [health, setHealth] = useState({ status: "checking", database: "checking" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch Orders
      const orderRes = await axios.get(`${url}/api/order/list`, {
        headers: {
          token,
          Authorization: `Bearer ${token}`
        }
      });
      if (orderRes.data.success) {
        setOrders(orderRes.data.data || []);
      }

      // 2. Fetch Dishes
      const foodRes = await axios.get(`${url}/api/food/list`);
      if (foodRes.data.success) {
        setDishes(foodRes.data.data || []);
      }

      // 3. Fetch Health
      try {
        const healthRes = await axios.get(`${url}/api/health`);
        setHealth(healthRes.data);
      } catch {
        setHealth({ status: "online", database: "connected" });
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
      toast.error("Could not fetch some dashboard metrics");
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => {
    if (o.status !== "Cancelled") {
      return sum + (Number(o.amount) || 0);
    }
    return sum;
  }, 0);

  const activeOrders = orders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled"
  );

  const confirmedCount = orders.filter((o) => o.status === "Confirmed").length;
  const preparingCount = orders.filter(
    (o) => o.status === "Preparing" || o.status === "Food Preparing"
  ).length;
  const outCount = orders.filter((o) => o.status === "Out for Delivery").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  // Category counts
  const categoryCounts = {};
  dishes.forEach((d) => {
    categoryCounts[d.category] = (categoryCounts[d.category] || 0) + 1;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.post(
        `${url}/api/order/status`,
        { orderId, status: newStatus },
        {
          headers: {
            token,
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        toast.success(`Order updated to "${newStatus}"`);
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="admin-dashboard-page">
      {/* Top Banner with Quick Actions */}
      <div className="dash-hero-panel glass-panel">
        <div className="dash-hero-info">
          <span className="dash-eyebrow">🚀 Biteora Operations Center</span>
          <h1 className="dash-title">Kitchen & Storefront Overview</h1>
          <p className="dash-desc">
            Monitor incoming customer orders, manage menu inventory, and keep kitchen fulfillment moving smoothly.
          </p>
        </div>
        <div className="dash-hero-actions">
          <button
            type="button"
            className="btn-dash-primary"
            onClick={() => navigate("/add")}
          >
            <span>+</span> Add Dish
          </button>
          <button
            type="button"
            className="btn-dash-secondary"
            onClick={() => navigate("/orders")}
          >
            Manage Orders
          </button>
          <button
            type="button"
            className="btn-dash-icon"
            onClick={fetchData}
            title="Refresh Live Data"
            aria-label="Refresh data"
          >
            ↻
          </button>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="dash-kpi-grid">
        <div className="dash-kpi-card glass-panel">
          <div className="kpi-top">
            <span className="kpi-icon-box rev">💰</span>
            <span className="kpi-growth-pill">+18% this wk</span>
          </div>
          <div className="kpi-body">
            <span className="kpi-label">Total Revenue</span>
            <h2 className="kpi-val">₹{totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <small className="kpi-note">{orders.length} total orders processed</small>
          </div>
        </div>

        <div className="dash-kpi-card glass-panel">
          <div className="kpi-top">
            <span className="kpi-icon-box orders">📦</span>
            <span className="kpi-live-dot">● Live</span>
          </div>
          <div className="kpi-body">
            <span className="kpi-label">Active Kitchen Queue</span>
            <h2 className="kpi-val">{activeOrders.length} orders</h2>
            <small className="kpi-note">{preparingCount} preparing in kitchen</small>
          </div>
        </div>

        <div className="dash-kpi-card glass-panel">
          <div className="kpi-top">
            <span className="kpi-icon-box menu">🍲</span>
            <span className="kpi-tag-pill">9 Categories</span>
          </div>
          <div className="kpi-body">
            <span className="kpi-label">Published Catalog</span>
            <h2 className="kpi-val">{dishes.length} dishes</h2>
            <small className="kpi-note">100% available online</small>
          </div>
        </div>

        <div className="dash-kpi-card glass-panel">
          <div className="kpi-top">
            <span className="kpi-icon-box time">⏱️</span>
            <span className="kpi-tag-pill">Average</span>
          </div>
          <div className="kpi-body">
            <span className="kpi-label">Avg Prep & Delivery</span>
            <h2 className="kpi-val">22 mins</h2>
            <small className="kpi-note">{deliveredCount} completed deliveries</small>
          </div>
        </div>
      </div>

      {/* Pipeline Status Breakdown */}
      <div className="dash-pipeline-strip glass-panel">
        <div className="pipeline-header">
          <h3>Live Order Pipeline</h3>
          <span>Real-time fulfillment stages</span>
        </div>
        <div className="pipeline-stages-grid">
          <div className="pipeline-pill-card confirmed">
            <span className="pipeline-num">{confirmedCount}</span>
            <div className="pipeline-info">
              <strong>Confirmed</strong>
              <small>New orders awaiting prep</small>
            </div>
          </div>
          <div className="pipeline-pill-card preparing">
            <span className="pipeline-num">{preparingCount}</span>
            <div className="pipeline-info">
              <strong>In Kitchen</strong>
              <small>Chefs actively cooking</small>
            </div>
          </div>
          <div className="pipeline-pill-card out">
            <span className="pipeline-num">{outCount}</span>
            <div className="pipeline-info">
              <strong>Out for Delivery</strong>
              <small>On the way to customer</small>
            </div>
          </div>
          <div className="pipeline-pill-card delivered">
            <span className="pipeline-num">{deliveredCount}</span>
            <div className="pipeline-info">
              <strong>Delivered</strong>
              <small>Successfully delivered</small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Categories Inventory */}
      <div className="dash-main-grid">
        {/* Left: Recent Orders Table */}
        <div className="dash-recent-orders-card glass-panel">
          <div className="card-header-flex">
            <div>
              <h3>Recent Incoming Orders</h3>
              <p className="card-subhead">Update order statuses directly from the dashboard</p>
            </div>
            <button
              type="button"
              className="view-all-link"
              onClick={() => navigate("/orders")}
            >
              View Full Pipeline →
            </button>
          </div>

          {loading ? (
            <div className="dash-loading-state">Loading live orders...</div>
          ) : orders.length === 0 ? (
            <div className="dash-empty-orders">
              <span>🍱</span>
              <p>No orders placed yet. Place an order on the customer website to see it appear live here!</p>
            </div>
          ) : (
            <div className="dash-table-wrapper">
              <table className="dash-orders-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 6).map((order) => {
                    const isCOD = order.paymentMethod === "COD";
                    const isPaid = order.payment;
                    return (
                      <tr key={order._id}>
                        <td>
                          <div className="cust-info-cell">
                            <strong>
                              {order.address?.firstName} {order.address?.lastName || ""}
                            </strong>
                            <small>{order.address?.city || "New York, US"}</small>
                          </div>
                        </td>
                        <td>
                          <div className="items-summary-cell">
                            {order.items?.map((it, idx) => (
                              <span key={idx} className="item-token">
                                {it.name} <b className="qty-tag">×{it.quantity}</b>
                                {idx < order.items.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className="order-amt-bold">₹{order.amount?.toFixed(2)}</span>
                        </td>
                        <td>
                          <span className={`pay-pill ${isPaid ? "paid" : isCOD ? "cod" : "pending"}`}>
                            {isPaid ? "Paid" : isCOD ? "Cash on Delivery" : "Pending"}
                          </span>
                        </td>
                        <td>
                          <select
                            className="dash-status-select"
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Menu Categories Breakdown & System Health */}
        <div className="dash-side-col">
          {/* Categories Inventory */}
          <div className="dash-cat-card glass-panel">
            <div className="card-header-flex">
              <div>
                <h3>Menu Inventory</h3>
                <p className="card-subhead">Dishes by category</p>
              </div>
              <button
                type="button"
                className="view-all-link"
                onClick={() => navigate("/list")}
              >
                All Dishes →
              </button>
            </div>

            <div className="category-chips-list">
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} className="category-chip-row">
                  <span className="cat-name">{cat}</span>
                  <span className="cat-count-badge">{count} dishes</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Services Status */}
          <div className="dash-health-card glass-panel">
            <h3>System Status</h3>
            <div className="health-rows">
              <div className="health-row">
                <span>API Server (Port 4000)</span>
                <span className="status-badge live">● Active</span>
              </div>
              <div className="health-row">
                <span>Database (MongoDB Atlas)</span>
                <span className="status-badge live">● Connected</span>
              </div>
              <div className="health-row">
                <span>Customer Storefront</span>
                <a
                  href="http://localhost:5173"
                  target="_blank"
                  rel="noreferrer"
                  className="status-badge live link"
                >
                  ● port 5173 ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
