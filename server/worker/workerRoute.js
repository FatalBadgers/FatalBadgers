var express = require('express');
var workerController = require('./workerController.js');

module.exports = function(app){
<<<<<<< HEAD

=======
  app.route('/')
    .get(workerController.getWorkers)
>>>>>>> 5663e6b185c2568a89c409e5a5b53053c177d6e2
};
