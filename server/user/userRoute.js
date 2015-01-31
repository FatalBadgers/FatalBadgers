var express = require('express');
var userController = require('./userController.js');

module.exports = function(app){
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
  app.get('/viewprofile', userController.viewprofile);
  app.post('/editprofile', userController.editprofile);
  app.get('/history', userController.gethistory);
  app.post('/endcontract', userController.endcontract);
  app.post('/getuser', userController.getUser);
};
