const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const { Permissions } = require("../constants.js");
const jwt = require("jsonwebtoken");
const JWT_EXPIRY = process.env.JWT_EXPIRY || "1h"; // Default to 1 hours if not set

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "User",
    });

    // Exclude the password before sending the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, try again later",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const response = await User.findById(user.id);
    return res.status(200).json({
      success: true,
      message: "User found",
      data: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const activeUser = req.session.user;
    if (activeUser?.id) {
      return res.status(401).json({
        success: false,
        message: "User is already have an active session",
      });
    }
    // Verify password
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Store user information in session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    };

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user?.role || "USER",
        permissions: user.permissions,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRY } // e.g., "1h" for 1 hour
    );
    user.password = undefined;
    // Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    console.log(`error from backend:`, error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.logoutUser = async (req, res) => {
  if (req.session) {
    const user = req.session.user;
    if (!user?.id) {
      return res.status(400).json({
        success: false,
        message: "User Already Logged Out",
      });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Unable to log out. Please try again later.",
        });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      return res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "No active session found",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const response = await User.find({});
    res.status(200).json({
      success: true,
      data: response,
      message: "All users fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.findById(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "No such user found",
      });
    }

    res.status(200).json({
      success: true,
      data: response,
      message: `Successfully fetched user with ID ${id}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error fetching user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.findByIdAndDelete(id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, oldPassword = "NIL", newPassword = "NIL" } = req.body;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // Verify old password
    if (oldPassword !== "NIL" && newPassword !== "NIL") {
      if (oldPassword) {
        const isPasswordMatch = await bcrypt.compare(
          oldPassword,
          user.password
        );
        if (!isPasswordMatch) {
          return res.status(400).json({
            success: false,
            message: "Old password is incorrect",
          });
        }
      }
      if (newPassword) {
        user.password = await bcrypt.hash(newPassword, 10);
      }
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating user",
    });
  }
};

exports.updateUserFromAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, role, permissions } = req.body;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (permissions) user.permissions = permissions;

    // If new password is provided, hash it before saving
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    try {
      await user.save({ new: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error updating user from admin",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully by admin",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating user from admin",
    });
  }
};
