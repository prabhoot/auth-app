const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  order_amount: { type: Number, required: true },
  order_date: { type: Date, required: true,default:Date.now()+(5.5 * 60 * 60 * 1000)  },
});

module.exports = mongoose.model('Order', orderSchema);
