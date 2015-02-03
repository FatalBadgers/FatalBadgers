//this stores all of our express routes for workers
var express = require('express');
var workerController = require('./workerController.js');

module.exports = function(app){
  app.route('/')
    .get(workerController.getWorkers)
};
