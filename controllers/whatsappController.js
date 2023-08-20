const { Client } = require('whatsapp-web.js');
const client = new Client();

exports.sendMessage = async (req, res) => {
  try {
    const { number, message } = req.body;
    const chat = await client.sendMessage(`${number}@c.us`, message);
    res.status(200).json({ success: true, chat });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};