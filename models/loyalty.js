// models/loyalty.js
const loyaltySchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    points: Number
  });
  
  module.exports = mongoose.model('Loyalty', loyaltySchema);