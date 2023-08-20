
// routes/loyalty.js
const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');

router.post('/add-points', loyaltyController.addPoints);
router.post('/redeem-points', loyaltyController.redeemPoints);

module.exports = router;