/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var express = require('express');
var api = require('./aws/api');
var aws = require('./aws/aws');

module.exports = function(app) {
  app.route('/')
    .get(function(req, res){
      res.sendfile(app.get('appPath') + '/index.html');
    });

  // Insert routes below
  app.use('/api/mocks', require('./api/mocks'));

  var userRouter = express.Router();
  app.use('/api/user', userRouter);
  require('./user/userRoute.js')(userRouter);

  var contractRouter = express.Router();
  app.use('/api/contract', contractRouter);
  require('./contract/contractRoute.js')(contractRouter);

  var workerRouter = express.Router();
  app.use('/api/worker', workerRouter);
  require('./worker/workerRoute.js')(workerRouter);

  // aws config and s3 setup
  app.get('/api/config', api.getClientConfig);
  app.get('/api/s3Policy', aws.getS3Policy);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  //this needs to get put at the very end of our routes
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
