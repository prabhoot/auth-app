const jwt = require("jsonwebtoken");
// Middleware to check JWT token
exports.checkJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Payload:", payload);
      req.user = payload; // Attach decoded payload to the request object
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired. Please log in again.",
      });
    }
  } catch (error) {
    console.error("Middleware Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while verifying the token.",
    });
  }
};

// Middleware to check session-based authentication
exports.isAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // User is authenticated
  }
  return res.status(401).json({
    success: false,
    message: "Unauthorized access. Please log in.",
  });
};

exports.checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    try {
      const userPermissions = req.user?.permissions; // Get permissions from JWT or session

      if (!userPermissions || !userPermissions.includes(requiredPermission)) {
        return res.status(403).json({
          success: false,
          message:
            "You do not have the necessary permissions to perform this action",
        });
      }
      next(); // User has the required permission, proceed to the next handler
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while verifying permissions",
        error: error.message,
      });
    }
  };
};

// Middleware to check user roles
const checkRole = (requiredRole) => (req, res, next) => {
  try {
    const userRole = req.user?.role || req.session?.user?.role;

    if (!userRole || userRole !== requiredRole) {
      if (userRole === "Admin") {
        return next();
      }
      return res.status(403).json({
        success: false,
        message: `Access denied. This route requires ${requiredRole} role.`,
      });
    }
    next(); // Role matches, proceed
  } catch (error) {
    console.error("Role Check Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while checking user role.",
    });
  }
};

exports.isUser = checkRole("User");
exports.isModerator = checkRole("Moderator");
exports.isAdmin = checkRole("Admin");
