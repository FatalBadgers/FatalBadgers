var express = require('express');
var contractController = require('./contractController.js');

module.exports = function(app){
  app.route('/')
    .get(contractController.getContracts)
};
