/**
 * Main application file
 */

//YF: 
//I think we need to connect to server as well as MySQL here

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');

var config = require('./server/config/environment/index');

// Setup server

var server = require('http').createServer(app);

require('./server/config/express')(app);
require('./server/routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
