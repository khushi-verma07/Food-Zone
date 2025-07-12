import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCog, 
  faPlus, 
  faList, 
  faCreditCard, 
  faSignOutAlt 
} from "@fortawesome/free-solid-svg-icons";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <Link to="/admin/add" className="admin-logo">
          <FontAwesomeIcon icon={faCog} className="logo-icon" />
          Admin Panel
        </Link>
        <div className="admin-nav-links">
          <Link to="/admin/add" className="nav-link">
            <FontAwesomeIcon icon={faPlus} className="link-icon" />
            Add
          </Link>
          <Link to="/admin/list" className="nav-link">
            <FontAwesomeIcon icon={faList} className="link-icon" />
            List
          </Link>
          <Link to="/admin/orders" className="nav-link">
            <FontAwesomeIcon icon={faCreditCard} className="link-icon" />
            Payments
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} className="link-icon" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;