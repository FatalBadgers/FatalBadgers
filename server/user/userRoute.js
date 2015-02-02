var express = require('express');
var userController = require('./userController.js');

module.exports = function(app){
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/viewprofile', userController.viewProfile);
  app.post('/editprofile', userController.editProfile);
  app.post('/getuser', userController.getUser);
  app.post('/review', userController.review);

};
