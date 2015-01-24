/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');


module.exports = function(app, express) {
//this brings user to homepage
  app.route('/')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });

  var workerRouter = express.Router();
  // var clientRouter = express.Router();
  // Insert routes below

  // app.use('/api/things', require('./api/thing'));
  

  // app.use('/api/mocks', require('./api/mocks'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  // app.route('/*')
  //   .get(function(req, res) {
  //     res.sendfile(app.get('appPath') + '/index.html');
  //   });

//this should connect to two main routes: worker and client
  app.use('/worker', workerRouter);
  require('./worker/workerRoute.js')(workerRouter);
  
};


//need some help identifying extra files in config
//express.Router vs. app.METHOD?