const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  let token;
  token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  if (token) {
    try {
      const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decodeToken.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }
  } else {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
};

module.exports = authMiddleware;
