var express = require('express');
var userController = require('./userController.js');

module.exports = function(app){
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
  app.get('/viewprofile', userController.viewProfile);
  app.post('/editprofile', userController.editProfile);
  app.get('/history', userController.getHistory);
  app.post('/endcontract', userController.endContract);
  app.post('/getuser', userController.getUser);
  app.post('/review', userController.review);

};
