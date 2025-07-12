import express from "express";
import Payment from "../models/Payment.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Save payment
router.post("/payment-success", async (req, res) => {
  try {
    const { email, name, cartItems, amountPaid } = req.body;

    const payment = new Payment({
      email,
      name,
      cartItems,
      amountPaid,
    });

    await payment.save();
    res.status(200).json({ message: "Payment saved successfully" });
  } catch (err) {
    console.error("❌ Error saving payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get orders for the currently logged-in user
router.get("/user-orders", async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const orders = await Payment.find({ email: decoded.email }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ NEW: Get all orders (admin access)
router.get("/all-payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.status(200).json(payments);
  } catch (err) {
    console.error("❌ Error fetching all payments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
