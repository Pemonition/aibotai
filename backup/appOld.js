const privateKey = require('../config').privateKey;
// app.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('../routes/userRoutes');
const { Client } = require('whatsapp-web.js'); // Use the WhatsApp Business API library

// Load environment variables from .env file
require('dotenv').config();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize WhatsApp Business API client
const client = new Client();