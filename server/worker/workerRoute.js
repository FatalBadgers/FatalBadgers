//this stores all of our express routes for workers

var express = require('express');
var workerController = require('./workerController.js');

module.exports = function(app){
  console.log('HELLO WORKER ROUTE!!!');
  
  app.post('/signin', workerController.signin);
  app.post('/signup', workerController.signup);
  app.get('/signedin', workerController.signedin);
  app.get('/viewprofile', workerController.viewprofile);
  app.post('/editprofile', workerController.editprofile);
}
//use express.Router() to create modular, mountable route handlers
//this way, we can go to ~~~.com/worker/profile, etc.