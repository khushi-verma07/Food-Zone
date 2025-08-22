import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home-page/Home";
import Cart from "./pages/cart-page/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import PaymentSuccess from "./pages/PaymentSuccess";
import Order from "./pages/Order";
import LoginPopup from "./components/loginpopup/LoginPopup";

import AdminLayout from "./AdminLayout";
import Add from "./admin-pages/Add/Add";
import List from "./admin-pages/List/List";
import AllPayments from "./admin-pages/AllPayments";
import AdminLogin from "./admin-pages/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chatbot from "./components/Chatbot/Chatbot";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {/* ✅ Only show user navbar & footer if NOT admin route */}
      {!isAdminRoute && <Navbar setShowLogin={setShowLogin} />}
      {!isAdminRoute && <Chatbot />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<><Home /><Footer /></>} />
        <Route path="/cart" element={<><Cart /><Footer /></>} />
        <Route path="/order" element={<><PlaceOrder /><Footer /></>} />
        <Route path="/payment-success" element={<><PaymentSuccess /><Footer /></>} />
        <Route path="/orders" element={<><Order /><Footer /></>} />

        {/* Admin Login */}
        <Route path="/admin-login" element={<><AdminLogin /><Footer /></>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="add" replace />} />
          <Route path="add" element={<Add />} />
          <Route path="list" element={<List />} />
          <Route path="orders" element={<AllPayments />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
