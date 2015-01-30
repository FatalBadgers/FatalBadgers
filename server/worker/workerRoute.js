var express = require('express');
var workerController = require('./workerController.js');

module.exports = function(app){

  app.post('/signin', workerController.signin);
  app.post('/signup', workerController.signup);
  app.get('/signedin', workerController.checkAuth);
  app.get('/viewprofile', workerController.viewprofile);
  app.post('/editprofile', workerController.editprofile);
  app.get('/history', workerController.gethistory);
  app.post('/endcontract', workerController.endcontract);
  app.post('/createprofile', workerController.createprofile);

  /*  
    this should serve up dashboard view for client
    need to ask Tim to create it and also if we should create two
    separate views
  */

  app.route('/dashboard').get(function(req, res) {
    res.sendfile(app.get('appPath') + '/dashboard/dashboard.html');
  })
  
}
  //TODO: Add any worker specific routes.
};
