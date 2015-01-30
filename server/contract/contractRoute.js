var express = require('express');
var workerController = require('./contractController.js');

module.exports = function(app){

  app.post('/signin', contractController.signin);
  app.post('/signup', contractController.signup);
  app.get('/signedin', contractController.checkAuth);
  app.get('/viewprofile', contractController.viewprofile);
  app.post('/editprofile', contractController.editprofile);
  app.get('/history', contractController.gethistory);
  app.post('/endcontract', contractController.endcontract);

};
