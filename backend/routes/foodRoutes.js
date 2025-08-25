import express from "express"
import { addFood,listFood,removeFood } from "../controllers/foodcontroller.js"
import multer from "multer"
import path from "path"
import crypto from "crypto"
import { adminAuthMiddleware } from "../middleware/auth.js"

const foodRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    // Generate secure filename to prevent path traversal
    const uniqueId = crypto.randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}_${uniqueId}${ext}`;
    return cb(null, safeName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
})

foodRouter.post("/add", adminAuthMiddleware, upload.single("image"), addFood)
foodRouter.get("/list", listFood);
foodRouter.post("/remove", adminAuthMiddleware, removeFood);

export default foodRouter;
