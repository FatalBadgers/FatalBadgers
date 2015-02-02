var express = require('express');
var workerController = require('./workerController.js');

module.exports = function(app){

  app.route('/')
    .get(workerController.getWorkers)
};
