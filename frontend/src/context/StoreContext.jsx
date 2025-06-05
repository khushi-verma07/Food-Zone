import { createContext,useState,useEffect } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  const url = "http://localhost:4000"
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  
  

  const addToCart = (itemId) => {
    setcartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setcartItems((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }

  useEffect(() => {
    
    async function loadData() {
      await fetchFoodList();
       if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"))
    }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
