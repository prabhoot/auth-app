const mongoose = require("mongoose");
const { Permissions } = require("../constants.js");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Moderator"],
      default: "User",
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions), // Use all enum values here
      required: true,
      default: [Permissions.READ_ITEMS],
      error: "Invalid permissions",
    },
    DP: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/portrait-man-christmas-celebrations_23-2150936477.jpg?t=st=1720014286~exp=1720017886~hmac=7645a2bc438d1dca4d5b1d247f0dc20a3f85476b88bec1d934f149651a20d802&w=740",
    },
    last_visit_date: {
      type: Date,
      default: Date.now() + 5.5 * 60 * 60 * 1000,
    },
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
