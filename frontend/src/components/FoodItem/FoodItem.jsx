import React, { useContext } from 'react';
import './foodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id = "", name = "", price = 0, description = "", image = "" }) => {
  const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);
  const itemCount = cartItems?.[id] || 0;

  const handleAddToCart = () => {
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(id);
  };

  const handleRemoveFromCart = () => {
    if (!token) {
      alert('Please login to modify cart');
      return;
    }
    removeFromCart(id);
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />
        
        {/* Default cart icon */}
        {itemCount === 0 && (
          <div className='cart-icon' onClick={handleAddToCart}>
            <img src={assets.add_icon_white} alt="Add to cart" />
          </div>
        )}
        
        {/* Add/remove controls */}
        {itemCount > 0 && token && (
          <div className={`food-item-counter ${itemCount > 0 ? 'active' : ''}`}>
            <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt='Remove' />
            <p>{itemCount}</p>
            <img onClick={handleAddToCart} src={assets.add_icon_green} alt="Add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt='Rating' />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">RS- {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;