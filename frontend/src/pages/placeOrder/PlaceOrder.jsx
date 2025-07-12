import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

// Load Razorpay script once
const loadRzpScript = () =>
  new Promise((resolve) => {
    if (document.querySelector("#razorpay-sdk")) return resolve(true);
    const s = document.createElement("script");
    s.id = "razorpay-sdk";
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, cartItems, food_list, token, setCartItems, url } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");
    setIsFormValid(allFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      const newErrors = {};
      Object.entries(formData).forEach(([key, val]) => {
        if (val.trim() === "") newErrors[key] = "This field can’t be empty";
      });
      setErrors(newErrors);
      return;
    }
    startPayment();
  };

  const startPayment = useCallback(async () => {
    const ok = await loadRzpScript();
    if (!ok) return alert("Razorpay SDK failed to load.");

    const totalRupees = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100;
    const totalPaise = totalRupees * 100;

    if (totalPaise === 0) return alert("Your cart is empty!");

    const options = {
      key: "rzp_test_KbKCf8dIP10uNs", 
      amount: totalPaise,
      currency: "INR",
      name: "Food Zone",
      description: "Order Payment",
      handler: async (response) => {
        try {
          const payload = {
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
            cartItems: Object.entries(cartItems).map(([id, quantity]) => {
              const item = food_list.find((f) => f._id === id);
              return {
                name: item?.name,
                quantity,
                price: item?.price,
                image: item?.image, // ✅ Include image path
              };
            }),
            amountPaid: totalRupees,
          };

          await axios.post(`${url}/api/payment/payment-success`, payload);

          // alert("✅ Payment successful!");
          setCartItems({}); // clear cart from context
          navigate("/payment-success", { state: { deliveryInfo: formData } });
        } catch (err) {
          console.error("❌ Error saving payment:", err);
          alert("Payment succeeded, but failed to store in DB.");
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#2E7D32",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }, [formData, cartItems, food_list, getTotalCartAmount, navigate, url, setCartItems]);

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      {/* LEFT SIDE */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        </div>
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        {errors.lastName && <span className="error">{errors.lastName}</span>}
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
        <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
        {errors.street && <span className="error">{errors.street}</span>}
        <div className="multi-fields">
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
        </div>
        {errors.city && <span className="error">{errors.city}</span>}
        {errors.state && <span className="error">{errors.state}</span>}
        <div className="multi-fields">
          <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        </div>
        {errors.country && <span className="error">{errors.country}</span>}
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      {/* RIGHT SIDE */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹ {getTotalCartAmount() === 0 ? "0" : "100"}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹ {getTotalCartAmount() === 0 ? "0" : getTotalCartAmount() + 100}</b>
          </div>
          <button type="submit" disabled={!isFormValid}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
