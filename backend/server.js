// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const cors = require('cors');
// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const dotenv = require('dotenv');

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

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
