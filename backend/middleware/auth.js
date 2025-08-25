import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized - Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
}

// Admin authorization middleware
const adminAuthMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Admin Authorization Required" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!token_decode.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin Access Required" });
    }
    req.adminId = token_decode.email;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Admin Token" });
  }
}

export { authMiddleware as default, adminAuthMiddleware };