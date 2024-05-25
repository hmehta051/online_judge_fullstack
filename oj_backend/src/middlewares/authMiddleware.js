const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    // Retrieving token from authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Authorization header is missing or invalid" });
    }
    const token = authHeader.split(' ')[1];

    // Verifying token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Retrieving user from database based on decoded token
    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    // Assigning user to the request object
    req.user = user;
    next();
  } catch (error) {
    // Handling token verification errors
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = authMiddleware;
