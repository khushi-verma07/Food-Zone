import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import chatbotRouter from "./routes/chatbotRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/chatbot", chatbotRouter);
app.use("/api/admin", adminRouter);


app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
