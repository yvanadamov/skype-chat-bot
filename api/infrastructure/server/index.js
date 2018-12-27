const { BotFrameworkAdapter } = require('botbuilder');
const express = require('express');

// Create the connector/adapter
// The adapter will act as 
// the conductor for your bot, 
// directing incoming and outgoing 
// communication, authentication, and so on.

const { APP_ID, APP_PASSWORD } = require('./config/constants');
const adapter = new BotFrameworkAdapter({
	appId: APP_ID,
	appPassword: APP_PASSWORD
});

// Create the http server which will serve as the end point of the messages
// end point is configured in the bot, ngrock is used to forward messages to the server
const routes = require('./config/routes')(adapter);

const server = express();
server.use('/', routes);

const port = process.env.port || process.env.PORT || 8080;
server.listen(port, () => {
	console.log('%s listening to %s', 'server', port);
});

module.exports = server;