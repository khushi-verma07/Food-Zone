import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../../admin-assets/assets";  

const List = () => {
  const [list, setList] = useState([]);

  // Fetch the list from the server
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch list");
      }
    } catch (err) {
      console.error("Error fetching list:", err);
      toast.error("Network error while fetching list");
    }
  };

  // Remove an item by ID and refresh
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message || "Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Network error while removing item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h1>Our Menu</h1>
      <div className="food-grid">
        {list.length === 0 ? (
          <p>No items available.</p>
        ) : (
          list.map((item) => (
            <div key={item._id} className="food-card">
              <img 
                src={`${url}/images/${item.image}`} 
                alt={item.name} 
                className="food-image"
              />
              <div className="food-details">
                <h3 className="food-name">{item.name}</h3>
                <span className="food-category">{item.category}</span>
                <p className="food-price">₹{item.price}</p>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFood(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
