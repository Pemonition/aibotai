const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isAuthenticated = require('../middlewares/authentication');
const whatsappController = require('../controllers/whatsappController.js');

router.post('/whatsapp-webhook', whatsappController.processIncomingMessage);

// Keep only one handler for '/admin/respond'
router.post('/admin/respond', isAuthenticated, whatsappController.adminRespond);

router.post('/register', async (req, res, next) => {
  // ... [rest of the code]
});

module.exports = router;
