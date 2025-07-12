import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./admin-components/Navbar/AdminNavbar";
import "./AdminLayout.css";
const AdminLayout = () => {
  return (
    <>
    
      <AdminNavbar/>
      
      <Outlet />
    </>
  );
};

export default AdminLayout;
