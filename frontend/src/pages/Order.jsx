import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import "./order.css";

const Order = () => {
  const { token, url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/payment/user-orders`, {
          headers: { token },
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setOrders([]);
      }
    };

    if (token) fetchOrders();
  }, [token, url]);

  return (
    <div className="order-page" style={{ padding: "20px" }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="order-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {orders.map((order, index) => (
            <div
              key={index}
              className="order-card"
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
              }}
            >
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Amount Paid:</strong> ₹{order.amountPaid}</p>
              <p><strong>Items:</strong></p>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {order.cartItems.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      gap: "10px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "8px",
                    }}
                  >
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60";
                      }}
                    />
                    <div>
                      <div><strong>{item.name}</strong></div>
                      <div>Qty: {item.quantity} | Price: ₹{item.price}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
