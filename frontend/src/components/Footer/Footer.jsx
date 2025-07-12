import React from 'react';
import './Footer.css';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="compact-footer">
      <div className="footer-content">
        <div className="footer-row">
          <div className="footer-brand">
            <h3>Chef Food</h3>
            <p>Fast • Fresh • Delicious</p>
          </div>
          
          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">Menu</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>
        
        <div className="footer-row">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Chef Food
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;