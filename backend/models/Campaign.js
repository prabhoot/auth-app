const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  audience: { type: Object, required: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now()+(5.5 * 60 * 60 * 1000)  },
  sent_at: { type: Date },
  delivery_status: { type: String, enum: ['PENDING', 'SENT', 'FAILED'], default: 'PENDING' },
});

module.exports = mongoose.model('Campaign', campaignSchema);
