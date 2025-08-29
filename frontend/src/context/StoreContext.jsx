import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list as localFoodList } from "../assets/assets";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));
  // const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const url = import.meta.env.VITE_BACKEND_URL ;

  useEffect(() => {
    setCartItems({});
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (let itemId in cartItems) {
      const item = food_list.find((f) => f._id === itemId);
      if (item) total += item.price * cartItems[itemId];
    }
    return total;
  };

  // NEW: Get total quantity of items in cart
  const getTotalCartQuantity = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data);
    } catch (err) {
      console.error("Error fetching food list:", err);
      // Fallback to local food list
      setFoodList(localFoodList);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartQuantity, // <-- Provide this in context
        token,
        setToken,
        url,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;