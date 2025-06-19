// import React, { useContext } from 'react'
// import './placeorder.css'
// import { StoreContext } from '../../context/StoreContext'

// const PlaceOrder = () => {

//   const {getTotalCartAmount} = useContext(StoreContext)

//   return (
//    <form className='place-order'>
//     <div className="place-order-left">
//       <p className='title'>Delivery Information</p>
//       <div className="multi-fields">
//         <input type="text" placeholder='First Name'/>
//         <input type="text" placeholder='Last Name'/>
//       </div>
//         <input type="email" placeholder='Email address'/>
//         <input type="text" placeholder='Street'/>

//         <div className="multi-fields">
//         <input type="text" placeholder='City'/>
//         <input type="text" placeholder='State'/>
//       </div>
       
//         <input type="text" placeholder='Country'/>
      
//       <input type='text' placeholder='Phone'/>
//     </div>
//      <div className="place-order-right">
//        <div className="cart-total">
//             <h2>Cart Totals</h2>
//             <div>
//               <div className="cart-total-details">
//                 <p>Subtotal</p>
//                 <p>RS/- {getTotalCartAmount()}</p>
//               </div>
//               <hr/>

//               <div className="cart-total-details">
//                 <p>Delivery Fee</p>
//                 <p>RS/- {getTotalCartAmount()===0?"0":"100"}</p>
//               </div>
//               <hr/>

//               <div className="cart-total-details">
//                 <b>Total</b>
//                 <b>RS/- {getTotalCartAmount()===0?"0":getTotalCartAmount()+100}</b>
//               </div>
//             </div>
//             <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
//             </div>
//     </div>
//    </form>
//   )
// }

// export default PlaceOrder;




import React, { useContext, useState,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import "./placeorder.css";
import { StoreContext } from "../../context/StoreContext";



/* tiny helper to load Razorpay script once */
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
  const { getTotalCartAmount } = useContext(StoreContext);

  // 1️⃣ form values
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


  // 2️⃣ field‑level errors
  const [errors, setErrors] = useState({});

  // 3️⃣ update helper
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear error as soon as user types
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 4️⃣ form completeness check
  const isFormValid = Object.values(formData).every(
    (val) => val.trim() !== ""
  );

  // 5️⃣ submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      // Pass form data to next screen if you need it there
      navigate("/order", { state: { deliveryInfo: formData } });
    } else {
      // mark every empty field with an error message
      const newErrors = {};
      Object.entries(formData).forEach(([key, val]) => {
        if (val.trim() === "") newErrors[key] = "This field can’t be empty";
      });
      setErrors(newErrors);
    }
  };


  //razorpay 
 const startPayment = useCallback(async () => {
    const ok = await loadRzpScript(); // load SDK   :contentReference[oaicite:1]{index=1}
    if (!ok) return alert("Razorpay SDK failed to load 🙁");

    /* dummy order details – replace with data from your backend */



    const totalRupees = getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 100;
  const totalPaise = totalRupees * 100;


if (totalPaise === 0) return alert("Your cart is empty!");

    const options = {
      key: "rzp_test_KbKCf8dIP10uNs", // ← your Key ID  :contentReference[oaicite:2]{index=2}
      amount:  totalPaise,// paise = ₹1
      currency: "INR",
      name: "Food Zone",
      description: "Sample Order",
      /* order_id is optional in test flow; supply real order_id from server in production */
      handler: (resp) => {
        console.log("Payment successful ✔️", response); // resp.razorpay_payment_id, etc.
        alert("Payment successful!");

//change    164-166    
        navigate("/order", { state: { deliveryInfo: formData } });
      },

    prefill: {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      contact: formData.phone,
    },
    theme: {
      color: "#1d4ed8",
    },
 };
   
 const rzp = new window.Razorpay(options);
  rzp.open();
}, [formData, getTotalCartAmount, navigate]);




  return (
    <form className="place-order" onSubmit={handleSubmit}>
      {/* ───────── LEFT  ───────── */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        {errors.lastName && <span className="error">{errors.lastName}</span>}

        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          name="street"
          type="text"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
        />
        {errors.street && <span className="error">{errors.street}</span>}

        <div className="multi-fields">
          <input
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        {errors.city && <span className="error">{errors.city}</span>}
        {errors.state && <span className="error">{errors.state}</span>}

        <input
          name="country"
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        {errors.country && <span className="error">{errors.country}</span>}

        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      {/* ───────── RIGHT  ───────── */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
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
              <b>
                ₹{" "}
                {getTotalCartAmount() === 0
                  ? "0"
                  : getTotalCartAmount() + 100}
              </b>
            </div>
          </div>

          {/* 6️⃣ Checkout button is gated! */}
          <button  onClick={startPayment} type="submit" disabled={!isFormValid}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
















