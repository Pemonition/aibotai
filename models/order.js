//models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: mongoose.Types.ObjectId,
    items: Array,
    status: String,
    estimatedDeliveryTime: Date
});

module.exports = mongoose.model('Order', orderSchema);
