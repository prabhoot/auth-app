const express = require("express");
const router = express.Router();

const {
  checkJWT,
  isAuth,
  isUser,
  isModerator,
  isAdmin,
  checkPermission,
} = require("../middlewares/auth.middleware.js");

const {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateUserFromAdmin,
  getMe,
} = require("../controllers/user.controller.js");
const { Permissions } = require("../constants.js");

// Authentication routes
router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);
router.post("/auth/logout", logoutUser);
router.get("/auth/me", checkJWT, getMe);
// User management routes
router.get("/users", checkJWT, getUsers); // Admin-only route
router.get("/users/:id", getUserById);
router.delete("/users/:id",checkJWT,isAdmin, deleteUser);
router.put("/users/:id",checkJWT,isUser, updateUser);
router.put("/users/UpdateByAdmin/:id", updateUserFromAdmin);

// Protected route example
router.get(
  "/auth/protected",
  isAuth,
  checkJWT,
  isUser,
  checkPermission(Permissions.READ_ITEMS),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "You are authorized to access this route.",
      user: req.user,
    });
  }
);

module.exports = router;
