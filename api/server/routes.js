const express = require('express');
const { END_POINT_ROUTE } = require('../constants');
const { BotController } = require('./controllers');

module.exports = (adapter, luisBot) => {
	const botController = BotController(adapter, luisBot);
	const router = express.Router();
	router.post(END_POINT_ROUTE, botController.processMessage);
	return router;
};