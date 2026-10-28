import "./Sidebar.css"
import {assets} from "../../assets/assets"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-top">
        <p className="sidebar-label">Workspace</p>
        <p className="sidebar-title">Biteora panel</p>
        <p className="sidebar-copy">A focused control surface for the restaurant menu and order queue.</p>
      </div>
      <div className="sidebar-options">
        <NavLink to="/" end className="sidebar-option">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9"></rect>
            <rect x="14" y="3" width="7" height="5"></rect>
            <rect x="14" y="12" width="7" height="9"></rect>
            <rect x="3" y="16" width="7" height="5"></rect>
          </svg>
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="Add" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="List" />
          <p>List Items</p>
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
