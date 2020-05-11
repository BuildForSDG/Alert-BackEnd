const mongoose = require('mongoose');

const regularUserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  blood_type: {
    type: String,
    required: true,
    enum: ["-A", "B", "AB", "O"]
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  next_of_kin_fullname: {
    type: String,
    required: true
  },
  next_of_kin_address: {
    type: String,
    required: true
  },
  next_of_kin_phone_number: {
    type: String,
    required: true
  },

}, {
  timestamps: true
})


module.exports = mongoose.model('RegularUser', regularUserSchema);
