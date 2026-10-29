import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({ onLogout }) => {
  const storefrontUrl =
    typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "http://localhost:5173"
      : "https://biteora-frontend.vercel.app";

  return (
    <header className="navbar glass-panel">
      <div className="navbar-brand">
        <div className="brand-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64d800" strokeWidth="2.2">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        </div>
        <div>
          <div className="brand-title-wrap">
            <span className="navbar-kicker">Biteora</span>
            <span className="admin-pill">Admin</span>
          </div>
          <p className="navbar-subtitle">Restaurant Operations & Menu Console</p>
        </div>
      </div>

      <div className="navbar-right">
        {/* Live Storefront Link */}
        <a
          href={storefrontUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="storefront-link"
          title="Open customer storefront in a new tab"
        >
          <span>Storefront</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>

        {/* Live Status Badge */}
        <div className="system-live-badge">
          <span className="live-pulse-dot"></span>
          <span>Online</span>
        </div>

        {/* User Card */}
        <div className="navbar-user">
          <img className="profile" src={assets.profile_image} alt="Admin profile" />
          <div className="navbar-user-copy">
            <span className="user-name">Manager</span>
            <small className="user-role">Super Admin</small>
          </div>
        </div>

        {/* Logout Button */}
        <button className="logout-btn" onClick={onLogout} title="Sign out of Admin Console">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
