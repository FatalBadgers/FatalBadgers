/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var express = require('express');

module.exports = function(app) {
  app.route('/')
    .get(function(req, res){
      res.sendfile(app.get('appPath') + '/index.html');
    });

  // Insert routes below
  app.use('/api/mocks', require('./api/mocks'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  //this needs to get put at the very end of our routes
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });

  var workerRouter = express.Router();
  app.use('/worker', workerRouter);
  require('./worker/workerRoute.js')(workerRouter);
};
