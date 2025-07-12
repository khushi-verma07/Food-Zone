// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import "./paymentSuccess.css";

// const PaymentSuccess = () => {
//   const { state } = useLocation();
//   const deliveryInfo = state?.deliveryInfo;

//   return (
//     <div className="payment-success">
//       <h2>🎉 Payment Successful!</h2>
//       <p>Thank you for your order, {deliveryInfo?.firstName}!</p>
//       <p>We’ll contact you at 📞 {deliveryInfo?.phone}</p>
//       <p>A confirmation has been sent to 📧 {deliveryInfo?.email}</p>
      
//       <Link to="/">← Go back to Home</Link>
//     </div>
//   );
// };

// export default PaymentSuccess;





import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle, FaHome, FaPhone, FaEnvelope } from "react-icons/fa";
import "./paymentSuccess.css";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const deliveryInfo = state?.deliveryInfo;

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="success-animation">
          <div className="checkmark-circle">
            <FaCheckCircle className="checkmark" />
          </div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>

        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-message">
          Thank you for your order, <span className="highlight">{deliveryInfo?.firstName}</span>!
        </p>

        <div className="order-details">
          <div className="detail-item">
            <FaPhone className="detail-icon" />
            <span>We'll contact you at: <strong>{deliveryInfo?.phone}</strong></span>
          </div>
          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <span>Confirmation sent to: <strong>{deliveryInfo?.email}</strong></span>
          </div>
        </div>

        

        <Link to="/" className="home-button">
          <FaHome className="button-icon" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;