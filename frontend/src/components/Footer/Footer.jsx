import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src='\g_main-logo.png' alt='' className="logoImg"/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis modi eligendi possimus quibusdam autem culpa tempora doloremque veniam hic. Debitis quaerat assumenda, aperiam illo dolorem harum quis. Minus, ipsam autem.</p>
            <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+1-212-456-7890</li>
              <li>contact@ChefFood.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>cCopyright 2025 ©️ ChefFood.com - All Right Reserved. </p>
    </div>
  )
}

export default Footer
