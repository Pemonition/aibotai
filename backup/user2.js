//models/user2.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  // Other fields as needed
});

// Add passport-local-mongoose plugin to enable authentication methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
