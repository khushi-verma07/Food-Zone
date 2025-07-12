import React, { useContext, useState, useEffect } from "react";
import "./NormalNav.css";
import { assets } from "../../assets/assets";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const NormalNav = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
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
    setToken("");
    navigate("/");
  };

  const anchorClass = (id) => (menu === id ? "active" : "");

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
         
        </div>

        
      </div>
    </nav>
  );
};

export default NormalNav;
