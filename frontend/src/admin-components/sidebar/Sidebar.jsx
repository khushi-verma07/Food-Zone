import React from "react";
import "./Sidebar.css";
import { assets } from "../../../../frontend/src/admin-assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
   
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/admin/add" className="sidebar-option">
          <img className="icon" src={assets.add_icon} />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/admin/list" className="sidebar-option">
          <img className="icon" src={assets.list_icon} />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/admin/orders" className="sidebar-option">
          <img className="icon" src={assets.order_icon} />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;


