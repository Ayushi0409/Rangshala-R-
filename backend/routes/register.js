// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, firstName, lastName, email, mobile, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ title, firstName, lastName, email, mobile, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// eslint-disable-next-line no-undef
module.exports = router;
