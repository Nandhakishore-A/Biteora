import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-top">
        <p className="sidebar-label">Control Center</p>
        <p className="sidebar-title">Biteora Console</p>
        <p className="sidebar-copy">Real-time menu management, live order pipeline, and restaurant operations.</p>
      </div>

      <div className="sidebar-options">
        <NavLink to="/" end className="sidebar-option">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9" rx="1"></rect>
            <rect x="14" y="3" width="7" height="5" rx="1"></rect>
            <rect x="14" y="12" width="7" height="9" rx="1"></rect>
            <rect x="3" y="16" width="7" height="5" rx="1"></rect>
          </svg>
          <p>Dashboard</p>
        </NavLink>

        <NavLink to="/orders" className="sidebar-option">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <p>Orders Queue</p>
        </NavLink>

        <NavLink to="/add" className="sidebar-option">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <p>Add Dish</p>
        </NavLink>

        <NavLink to="/list" className="sidebar-option">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <p>Menu Inventory</p>
        </NavLink>
      </div>

      <div className="sidebar-footer-card">
        <div className="footer-status-pill">
          <span className="dot dot-green"></span>
          <span>Cloud Connected</span>
        </div>
        <p className="footer-card-title">Cloudinary Active</p>
        <p className="footer-card-copy">All images stream directly to mern_stack_project_storage/Biteora</p>
      </div>
    </aside>
  );
};

export default Sidebar;
