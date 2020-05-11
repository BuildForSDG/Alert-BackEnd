const mongoose = require('mongoose');

const regularUserSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  bloodType: {
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
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  nextOfKinFullname: {
    type: String,
    required: true
  },
  nextOfKinAddress: {
    type: String,
    required: true
  },
  nextOfKinPhoneNumber: {
    type: String,
    required: true
  },

}, {
  timestamps: true
})


module.exports = mongoose.model('RegularUser', regularUserSchema);
