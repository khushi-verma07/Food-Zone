import React, { useContext, useEffect } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleProceedToCheckout = () => {
    if (!token) {
      alert('Please login to proceed to checkout');
      navigate('/');
      return;
    }
    navigate('/order');
  };

  if (!token) {
    return (
      <div className="cart">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Please login to view your cart</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-Items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>RS/- {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>RS/- {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          } else {
            return null; // Prevent undefined return
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>RS/- {getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>RS/- {getTotalCartAmount() === 0 ? "0" : "100"}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>RS/- {getTotalCartAmount() === 0 ? "0" : getTotalCartAmount() + 100}</b>
            </div>
          </div>
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>

       
      </div>
    </div>
  );
};

export default Cart;

