import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://khushivrma07:mongo123@cluster0.jy4w4ik.mongodb.net/food-del"
    ).then(()=>console.log("DB Connected"));
};
