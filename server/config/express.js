/**
 * Express configuration
 */

'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');

// --- Unused dependencies --- //
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // --- Unused methods --- //
  app.use(compression());
  app.use(methodOverride());
  app.use(cookieParser());
  
  if ('production' === env) {
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    
    // --- Unused methods --- //
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(morgan('dev'));

  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(errorHandler()); // Error handler - has to be last
    
    // --- Unused methods --- //
    app.use(morgan('dev'));
  }
};