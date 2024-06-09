const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or invalid format",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token",
    });
  }
};

exports.isCustomer = (req, res, next) => {
  try {
    if (req.user.role !== "Customer") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Customer, unauthorized access denied",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid user role",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admins, unauthorized access denied",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid user role",
    });
  }
};
