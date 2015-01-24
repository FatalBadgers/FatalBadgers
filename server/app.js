/**
 * Main application file
 */

//YF: 
//I think we need to connect to server as well as MySQL here

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var app = express();

var config = require('./config/environment');

// Setup server

var server = require('http').createServer(app);


require('./config/express')(app);
require('./routes')(app, express);
//require a dummy api js--one file

//routes is where we are telling the site what to do

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;