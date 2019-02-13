const express = require('express');
const events = require('events');
const eventEmitter = new events.EventEmitter();
eventEmitter.on('spam', data => {
    console.log('received event');
    console.log(data);
})
const botFactory = require('../bot/botFactory');

const {adapter, bot} = botFactory(eventEmitter);

const routes = require('./routes')(adapter, bot);

const DEFAULT_PORT = 8080;

const server = express();
server.use('/', routes);

const port = process.argv[2] || DEFAULT_PORT;
server.listen(port, () => console.log(`Server listening to ${port}`));

module.exports = server;