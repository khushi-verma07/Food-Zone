// // admin/src/pages/AllPayments.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
//  import "./AllPayments.css"; // optional styling

// const AllPayments = () => {
//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/api/payment/all-payments");
//         setPayments(res.data);
//       } catch (err) {
//         console.error("Error fetching all payments", err);
//       }
//     };

//     fetchPayments();
//   }, []);

//   return (
//     <div className="admin-payments">
//       <h2>All Payments</h2>
//       {payments.length === 0 ? (
//         <p>No payments found</p>
//       ) : (
//         payments.map((payment, idx) => (
//           <div key={idx} className="payment-card">
//             <p><strong>User:</strong> {payment.name} ({payment.email})</p>
//             <p><strong>Date:</strong> {new Date(payment.date).toLocaleString()}</p>
//             <p><strong>Amount Paid:</strong> ₹{payment.amountPaid}</p>
//             <p><strong>Items:</strong></p>
//             <ul>
//               {payment.cartItems.map((item, i) => (
//                 <li key={i}>
//                   <img
//                     src={`http://localhost:4000/images/${item.image}`}
//                     alt={item.name}
//                     width="60"
//                     height="60"
//                     style={{ borderRadius: "6px", marginRight: "10px" }}
//                   />
//                   {item.name} × {item.quantity} — ₹{item.price}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default AllPayments;



// admin/src/pages/AllPayments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllPayments.css";

const AllPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/payment/all-payments");
        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching all payments", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="admin-payments">
      <h2>All Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <div className="payments-grid">
          {payments.map((payment, idx) => (
            <div key={idx} className="payment-card" style={{ "--order": idx }}>
              <p><strong>User:</strong> {payment.name} ({payment.email})</p>
              <p><strong>Date:</strong> {new Date(payment.date).toLocaleString()}</p>
              <p><strong>Amount Paid:</strong> ₹{payment.amountPaid}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {payment.cartItems.map((item, i) => (
                  <li key={i} style={{ "--order": i }}>
                    <img
                      src={`http://localhost:4000/images/${item.image}`}
                      alt={item.name}
                      width="60"
                      height="60"
                      style={{ borderRadius: "6px", marginRight: "10px" }}
                    />
                    {item.name} × {item.quantity} — ₹{item.price}
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

export default AllPayments;