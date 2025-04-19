// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires in 5 minutes
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('OTP', otpSchema);