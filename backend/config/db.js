import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI || "mongodb+srv://khushivrma07:mongo123@cluster0.jy4w4ik.mongodb.net/food-del";
    await mongoose.connect(uri).then(()=>console.log("DB Connected"));
};
