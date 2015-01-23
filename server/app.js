/**
 * Main application file
 */

//YF: 
//I think we need to connect to server as well as MySQL here

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var mysql = require('mysql');

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app, express);
//routes is where we are telling the site what to do


//MySQL parameters
//NEED TO COMPLETE
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: ''
});

connection.connect(function(err){
	if (err){
		throw err;
	} else{
		console.log("Connected with MySQL Database");
	}
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;