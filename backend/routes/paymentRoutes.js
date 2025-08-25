import express from "express";
import Payment from "../models/Payment.js";
import authMiddleware, { adminAuthMiddleware } from "../middleware/auth.js";

const router = express.Router();

// ✅ Save payment
router.post("/payment-success", authMiddleware, async (req, res) => {
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
router.get("/user-orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Payment.find({ userId: req.userId }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ NEW: Get all orders (admin access)
router.get("/all-payments", adminAuthMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.status(200).json(payments);
  } catch (err) {
    console.error("❌ Error fetching all payments:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
