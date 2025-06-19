import express from 'express';
import razorpayInstance from '../razorpay.js';

const router = express.Router();

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // in paise
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ success: false, error: "Order creation failed" });
  }
});

export default router;
