const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps:true }
);

module.exports = mongoose.model("Order", itemSchema);