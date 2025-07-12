import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  email: String,
  name: String,
  cartItems: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image: String, // ✅ Include image
    },
  ],
  amountPaid: Number,
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
