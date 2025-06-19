// import React, {useContext, useState} from 'react';
// import './navbar.css';
// import { assets } from '../../assets/assets';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';

// const Navbar = ({setShowLogin}) => {

//   const [menu, setmenu] = useState("home");

//   const {getTotalCartAmount,token,setToken} = useContext(StoreContext)

//   const naviagte = useNavigate();

// const logout =() =>{
//   localStorage.removeItem("token");
//   setToken("");
//   Navigate("/")
// }

//   return (
//     <div className='navbar'>
//       <Link to='/'><img src='\g_main-logo.png' alt='' className='logo'/></Link>
//       <ul className="navbar-menu">
//         <Link to='/' onClick={()=>setmenu("home")} className={menu==="home"?"active":""}>home</Link>
//         <a href='#explore-menu' onClick={()=>setmenu("menu")} className={menu==="menu"?"active":""}>menu</a>
//         <a href='#app-download' onClick={()=>setmenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
//         <a href='#footer' onClick={()=>setmenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
//       </ul>

//       <div className="navbar-right">
//         <img src={assets.search_icon} alt=''/>
//         <div className="navbar-search-icon">
//         <Link to='/cart'><img src={assets.basket_icon} alt=''/></Link>
//         <div className={getTotalCartAmount()===0?"":"dot"}></div>
//         </div>
//         {!token? <button onClick={()=>setShowLogin(true)}>Sign in</button>:
//         <div className='navbar-profile'>
//           <img src={assets.profile_icon} alt='' />
//           <ul className="nav-profile-dropdown">
//             <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
//             <hr/>
//             <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
//           </ul>
//           </div>}
       
//       </div>
//     </div>
//   )
// }

// export default Navbar





import React, { useContext, useState, useEffect } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("");                  // active hash section
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const { hash } = useLocation();                        // <-- current #hash

  /* keep state in sync with URL hash */
  useEffect(() => {
    // hash = "", "#explore-menu", "#app-download", "#footer"
    setMenu(hash.replace("#", ""));                      // "" | explore-menu | ...
  }, [hash]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  /* helper to style anchors */
  const anchorClass = (id) => (menu === id ? "active" : "");

  return (
    <div className="navbar">
      {/* logo */}
      <Link to="/">
        <img src="\g_main-logo.png" alt="" className="logo" />
      </Link>

      {/* ===== Nav items ===== */}
      <ul className="navbar-menu">
        {/* HOME – underline only when pathname = "/" AND no hash */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive && !hash ? "active" : ""
          }
        >
          home
        </NavLink>

        <a
          href="#explore-menu"
          onClick={() => setMenu("explore-menu")}
          className={anchorClass("explore-menu")}
        >
          menu
        </a>

        <a
          href="#app-download"
          onClick={() => setMenu("app-download")}
          className={anchorClass("app-download")}
        >
          mobile-app
        </a>

        <a
          href="#footer"
          onClick={() => setMenu("footer")}
          className={anchorClass("footer")}
        >
          contact-us
        </a>
      </ul>

      {/* ===== Right side icons / auth ===== */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

