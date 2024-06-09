const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    require:true
  },
  role: {
    type: String,
    enum:["Customer","Admin"],
    default:"Customer"
  },
  token:{
    type:String,
    default:''
  },
  description:{
    type:String,
    default:''
  },
  isOnline:{
    type:Boolean,
    default:false
  },
  total_spends: {
    type: Number,
    default: 0,
  },
  number_of_visits: {
    type: Number,
    default: 0,
  },
  last_visit_date: {
    type: Date,
    default: Date.now()+(5.5 * 60 * 60 * 1000),
  },
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);