var express = require('express');
var workerController = require('./workerController.js');

module.exports = function(app){
  console.log('HELLO WORKER ROUTE!!!');


  app.post('/signin', workerController.signin);
  app.post('/signup', workerController.signup);
  app.get('/signedin', workerController.checkAuth);
  app.get('/viewprofile', workerController.viewprofile);
  app.post('/editprofile', workerController.editprofile);
  //get for contract history
  //post for contract application
  
}