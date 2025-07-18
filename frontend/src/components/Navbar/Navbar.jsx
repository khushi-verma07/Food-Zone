import React, { useContext, useState, useEffect } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");
  const { getTotalCartAmount, getTotalCartQuantity, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMenu(hash.replace("#", ""));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hash]);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setToken("");
    navigate("/");
  };

  const anchorClass = (id) => (menu === id ? "active" : "");

  // Get total quantity for badge
  const totalQuantity = getTotalCartQuantity ? getTotalCartQuantity() : 0;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          {/* <img src={assets.chef} alt="logo" className="logo-img" /> */}
          <span className="logo-text">Chef Food</span>
        </Link>

        <div className="nav-menu">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive && !hash ? "active" : "")}
          >
            <span>Home</span>
            <div className="nav-underline"></div>
          </NavLink>
          <a
            href="#explore-menu"
            onClick={() => setMenu("explore-menu")}
            className={anchorClass("explore-menu")}
          >
            <span>Menu</span>
            <div className="nav-underline"></div>
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("app-download")}
            className={anchorClass("app-download")}
          >
            <span>App</span>
            <div className="nav-underline"></div>
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("footer")}
            className={anchorClass("footer")}
          >
            <span>Contact</span>
            <div className="nav-underline"></div>
          </a>

          {/* Updated Admin link to redirect to login first */}
          <NavLink
            to="/admin-login"
            className={({ isActive }) => (pathname === "/admin-login" ? "active" : "")}
          >
            <span>Admin</span>
            <div className="nav-underline"></div>
          </NavLink>
        </div>

        <div className="nav-actions">
          <div className="nav-icon cart-btn" style={{ position: "relative" }}>
            <Link to="/cart">
              <img src={assets.basket_icon} alt="cart" />
              {totalQuantity > 0 && (
                <span className="cart-quantity-badge">{totalQuantity}</span>
              )}
            </Link>
          </div>

          {!token ? (
            <button className="signin-btn" onClick={() => setShowLogin(true)}>
              <span>Sign In</span>
              <div className="hover-effect"></div>
            </button>
          ) : (
            <div className="profile-menu">
              <div className="profile-btn">
                <img src={assets.profile_icon} alt="profile" />
              </div>
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={() => navigate("/orders")}>
                  <img src={assets.bag1} alt="orders" />
                  <span>Orders</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={logout}>
                  <img src={assets.logout1} alt="logout" />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



