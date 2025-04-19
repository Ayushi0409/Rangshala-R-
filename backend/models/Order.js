// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  country: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  paymentDetails: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Order', orderSchema);