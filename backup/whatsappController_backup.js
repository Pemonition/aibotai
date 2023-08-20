
const app = require('../app'); // Adjust the path to app.js as needed
const axios = require('axios');
const { Client } = require('whatsapp-web.js');
//const express = require('express');
//const mongoose = require('mongoose');
require('dotenv').config();


// Initialize the WhatsApp Business API client
const client = new Client();
client.initialize();


// Import the app instance
//const app = require('../app'); // Adjust the path as needed


//const app = express();

// Update the MongoDB connection string with your MongoDB Atlas credentials
//const connectionString = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
//mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//  .then(() => {
//    console.log('Connected to MongoDB Atlas');
//  })
//  .catch((error) => {
//    console.error('Error connecting to MongoDB Atlas:', error);
//  });
// ...
// Anexado recentemente para posibilitar mensajes pelo admin respondendo usuarios no lugar do bot
// Event listener for WhatsApp Business API messages
client.on('message', async (message) => {
  if (message.from === process.env.WA_API_PHONE_NUMBER) {
    // Incoming message is from the WhatsApp API, process it as AI response
    const response = await getChatBotResponse(message.body);
    // Send the AI response back to the user
    message.reply(response);
  } else {
    // Incoming message is from an admin user, forward it to WhatsApp API
    sendMessageToWhatsApp(message.body);
  }
});

// ...
// controllers/whatsappController.js

exports.processIncomingMessage = async (req, res) => {
  const message = req.body; // Ajusta según el formato de la API de WhatsApp

  // Procesa el mensaje según tus necesidades
  // Por ejemplo, si recibes un mensaje con la palabra "registro", puedes enviar un formulario de registro.

  // Responde al mensaje
  sendMessageToWhatsApp(responseMessage);

  res.status(200).send('OK');
};


// Function to get a response from the AI model
async function getChatBotResponse(message) {
  const prompt = message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        prompt: prompt,
        max_tokens: 150,
        stop: '\n',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Process the API response and extract the chatbot's response
    const chatBotResponse = response.data.choices[0].text;

    return chatBotResponse;
  } catch (error) {
    console.error('Error:', error);
    // Handle any errors that occurred during the API request
    throw error;
  }
}

// */ Este bloco era a resposta sem posibilitar resposta vindo do admin
// Event listener for WhatsApp Business API messages
//client.on('message', async (message) => {
  // Process incoming messages and send responses using AI model
//  const response = await getChatBotResponse(message.body);

  // Send the response back to the user
//  message.reply(response);
//});
//...
module.exports = client; // Export the WhatsApp client instance

// Middleware
//app.use(express.json());

// Routes
//const userRoutes = require('../routes/user');
//app.use('/users', userRoutes);

// Start the server
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  