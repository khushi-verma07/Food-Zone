import express from "express";
import jwt from "jsonwebtoken";

const adminRouter = express.Router();

// Admin login route
adminRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log("Admin login attempt:", { email, password });
        console.log("Expected:", { 
            email: process.env.ADMIN_EMAIL, 
            password: process.env.ADMIN_PASSWORD 
        });
        
        // Check against environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email, isAdmin: true }, 
                process.env.JWT_SECRET, 
                { expiresIn: "24h" }
            );
            
            res.json({
                success: true,
                token,
                message: "Admin login successful"
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

export default adminRouter;