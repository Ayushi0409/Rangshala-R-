// server/models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: { type: String }, // ✅ for password reset
  resetTokenExpiry: { type: Date }, // ✅ for expiration
  createdAt: { type: Date, default: Date.now },
});

export default model('User', userSchema);
