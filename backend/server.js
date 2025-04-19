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

// Routes
// eslint-disable-next-line no-undef
app.use('/api/register', require('./routes/register'));
// eslint-disable-next-line no-undef
app.use('/api/auth', require('./routes/auth'));

// New route to get all users
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

// New route to delete a user
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

// Enquiry Model and Routes
// eslint-disable-next-line no-undef
const Enquiry = require('./models/Enquiry');

app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, companyName, designation, email, countryCode, mobileNo, enquiry } = req.body;
    const phone = `${countryCode} ${mobileNo}`;
    const newEnquiry = new Enquiry({ name, company_name: companyName, designation, email, phone, enquiry });
    await newEnquiry.save();

    // Email configuration (optional fallback if EmailJS fails)
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
      cc: 'ayushibabariya4@gmail.com', // Admin notification
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

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});