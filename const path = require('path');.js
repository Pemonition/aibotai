const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const { Client } = require('whatsapp-web.js');
const dotenv = require('dotenv');
const whatsappController = require('./controllers/whatsappController');

// ...

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to use EJS templates
app.set('view engine', 'ejs');
// Load environment variables from .env file
dotenv.config({ path: './config/.env' });

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize WhatsApp Business API client
const client = new Client();
client.initialize();

// ...

// Include your other route definitions here
app.use('/users', userRoutes);

// ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
