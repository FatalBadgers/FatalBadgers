//this stores all of our express routes for workers
var express = require('express');
var workerController = require('./workerController.js');

// app.set('models',require('../models'));
// var Worker = app.get('models').Worker;

module.exports = function(app){

  app.route('/')
    .get(workerController.getWorkers)
};
