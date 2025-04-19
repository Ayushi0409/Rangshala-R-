// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const cors = require('cors');
// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const dotenv = require('dotenv');
// eslint-disable-next-line no-undef
const nodemailer = require('nodemailer');
// eslint-disable-next-line no-undef
const OTP = require('./models/OTP');
// eslint-disable-next-line no-undef
const User = require('./models/User'); // Assuming you have a User model
// eslint-disable-next-line no-undef
const bcrypt = require('bcryptjs'); // Add this for password hashing comparison
// eslint-disable-next-line no-undef
const jwt = require('jsonwebtoken'); // Add this for token generation (npm install jsonwebtoken)
// Add Razorpay require
// eslint-disable-next-line no-undef
const Razorpay = require('razorpay');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to MongoDB
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

// Initialize Razorpay instance
const razorpay = new Razorpay({
  // eslint-disable-next-line no-undef
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_jVqdtFwidymhM3',
  // eslint-disable-next-line no-undef
  key_secret: process.env.RAZORPAY_KEY_SECRET || '069pF4H12sdSJRbdZGytcVgE', // Securely store in .env
});

// Routes
// eslint-disable-next-line no-undef
app.use('/api/register', require('./routes/register'));
// eslint-disable-next-line no-undef
app.use('/api/auth', require('./routes/auth'));

// Existing routes (users, enquiries, etc.)
app.get('/api/users', async (req, res) => {
  try {
    // eslint-disable-next-line no-undef
    const users = await require('./models/User').find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    // eslint-disable-next-line no-undef
    const user = await require('./models/User').findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// eslint-disable-next-line no-undef
const Enquiry = require('./models/Enquiry');
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, companyName, designation, email, countryCode, mobileNo, enquiry } = req.body;
    const phone = `${countryCode} ${mobileNo}`;
    const newEnquiry = new Enquiry({ name, company_name: companyName, designation, email, phone, enquiry });
    await newEnquiry.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ayushibabariya4@gmail.com',
        pass: 'igmn mubd kfmk iwuo', // Use App Password if 2FA enabled
      },
    });

    const mailOptions = {
      from: 'ayushibabariya4@gmail.com',
      to: email,
      cc: 'ayushibabariya4@gmail.com',
      subject: 'New Art Advisory Enquiry Received',
      html: `
        <h3>New Enquiry Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Designation:</strong> ${designation}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Enquiry:</strong> ${enquiry}</p>
        <p><strong>Received On:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Enquiry submitted and email sent successfully' });
  } catch (err) {
    console.error('Enquiry save or email error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// New Forgot Password Route
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate OTP (6-digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp); // For debugging

    // Store OTP
    await OTP.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ayushibabariya4@gmail.com',
        pass: 'igmn mubd kfmk iwuo', // Use App Password
      },
    });

    const mailOptions = {
      from: 'ayushibabariya4@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <h3>Password Reset Request</h3>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        <p>If you did not request this, please ignore this email or contact support.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// New /api/verify-otp route
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    res.status(200).json({ message: 'OTP verified successfully', email });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
});

// New /api/reset-password route
app.post('/api/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = newPassword; // This will trigger the pre-save hash in User.js
    await user.save();
    await OTP.deleteOne({ email }); // Clear OTP after reset
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
});

// New /api/auth/login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    // eslint-disable-next-line no-undef
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// New /create-order route
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    // eslint-disable-next-line no-undef
    res.json({ ...order, key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_jVqdtFwidymhM3' });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// New /verify-payment route
app.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // eslint-disable-next-line no-undef
    const secret = process.env.RAZORPAY_KEY_SECRET || '069pF4H12sdSJRbdZGytcVgE';

    // eslint-disable-next-line no-undef
    const crypto = require('crypto');
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      res.json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ status: 'failure', message: 'Invalid payment signature' });
    }
  } catch (err) {
    console.error('Error verifying payment:', err);
    res.status(500).json({ status: 'failure', message: 'Payment verification failed' });
  }
});

// New /save-order route (assuming a new Order model)
// eslint-disable-next-line no-undef
const Order = require('./models/Order'); // Create this model if not exists
app.post('/save-order', async (req, res) => {
  try {
    const { country, address, city, state, pinCode, email, phone, paymentDetails } = req.body;
    const newOrder = new Order({
      country,
      address,
      city,
      state,
      pinCode,
      email,
      phone,
      paymentDetails,
      createdAt: Date.now(),
    });
    await newOrder.save();
    res.json({ success: true, message: 'Order saved successfully' });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ success: false, message: 'Failed to save order' });
  }
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});