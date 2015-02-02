var express = require('express');
var contractController = require('./contractController.js');

module.exports = function(app){
<<<<<<< HEAD
	app.post('/createjob', contractController.createJob);
	app.post('/editjob', contractController.editJob);
	app.post('/endjob', contractController.endJob);
	app.get('/gethistory', userController.getHistory);
=======
  app.route('/')
    .get(contractController.getContracts)
>>>>>>> 5663e6b185c2568a89c409e5a5b53053c177d6e2
};
