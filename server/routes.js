/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app, express) {

  // Insert routes below
<<<<<<< HEAD
  // app.use('/api/things', require('./api/thing'));
  
=======
  app.use('/api/mocks', require('./api/mocks'));

>>>>>>> 79e801879498cd2043a5b25e438ddc09de825df2
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });

//YAN CODE STARTS
//this should connect to two main routes: worker and clien

  
  var workerRouter = express.Router();
  var clientRouter = express.Router();

  require('/worker/workerRoute.js', workerRouter);
  require('/client/clientRoute.js', clientRouter);
  
};


//need some help identifying extra files in config
//express.Router vs. app.METHOD?