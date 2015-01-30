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

};
