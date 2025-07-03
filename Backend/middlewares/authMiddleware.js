const jwt = require("jsonwebtoken");
const User = require("../models/User");

//
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify token with your JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the decoded ID and exclude password field
      req.user = await User.findById(decoded.id).select("-password");

      // Move on to the next middleware or route handler
      return next(); // You need to return after calling next()
    } catch (err) {
      // Invalid token error
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  return res
    .status(403)
    .json({ message: "Only admins can perform this action" });
};

module.exports = { protect, isAdmin };
