const express = require('express');
const { END_POINT_ROUTE } = require('../config/constants');
const { BotController } = require('../controllers');

module.exports = adapter => {
	const botController = BotController(adapter);
	const router = express.Router();
	router.post(END_POINT_ROUTE, botController.processMessage);
	router.post('/conversations', botController.getConversations);
	return router;
};