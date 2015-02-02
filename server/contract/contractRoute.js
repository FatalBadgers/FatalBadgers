var express = require('express');
var contractController = require('./contractController.js');


module.exports = function (app) {
  app.post('/createjob', contractController.createJob);
  app.post('/editjob', contractController.editJob);
  app.post('/endjob', contractController.endJob);
  app.get('/gethistory', contractController.getHistory);
  app.route('/')
    .get(contractController.getContracts)
};
