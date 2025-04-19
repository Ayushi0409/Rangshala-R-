// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  company_name: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }, // Combine country code and mobile
  enquiry: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// eslint-disable-next-line no-undef
module.exports = mongoose.model('Enquiry', enquirySchema);