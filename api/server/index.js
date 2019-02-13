const express = require('express');
const { adapter, bot } = require('../bot/botFactory');
const routes = require('./routes')(adapter, bot);

const DEFAULT_PORT = 8080;

const server = express();
server.use('/', routes);

const port = process.argv[2] || DEFAULT_PORT;
server.listen(port, () => console.log(`Server listening to ${port}`));

module.exports = server;