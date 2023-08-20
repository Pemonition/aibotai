const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/authentication');
const feedbackController = require('../controllers/feedbackController');

router.post('/submit', isAuthenticated, feedbackController.submitFeedback);

module.exports = router;
