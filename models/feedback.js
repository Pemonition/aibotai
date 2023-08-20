// models/feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  feedback: String,
  date: Date
});

module.exports = mongoose.model('Feedback', feedbackSchema);
