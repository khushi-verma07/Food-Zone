// import React from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/assets'

// const Navbar = () => {
//   return (
//     <div className='navbar'>
//       <img className='logo' src={assets.g_mainlogo} alt="" />
//       <img className='profile' src={assets.profile_image} alt="" />
//     </div>
//   )
// }

// export default Navbar





import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <div className='navbar-admin'>
      <div className="navbar-left">
        <img className='logo' src={assets.g_mainlogo} alt="Admin Logo" />
        <h2 className="admin-title">Admin Dashboard</h2>
      </div>
      
        <div className="admin-profile">
          <img className='profile' src={assets.profile_image} alt="Admin Profile" />
          <div className="profile-info">
            <p className="admin-name">Admin User</p>
            <p className="admin-role">Super Admin</p>
          </div>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    
  );
};

export default Navbar;