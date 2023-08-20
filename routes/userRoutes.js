// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const whatsappController = require('../controllers/whatsappController');

// GET /users/register
router.get('/register', (req, res) => {
  res.render('registration-form.ejs'); // Render the registration form template
});

// POST /users/register
router.post('/register', async (req, res) => {
  try {
    const { name } = req.body;
    // Add code to validate and process user input
    // Store the user data in the MongoDB database
    const user = await User.create({ name });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
});

module.exports = router;