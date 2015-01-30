//we reference the models here
//expecting models/index.js from Scott
//http://architects.dzone.com/articles/sequelize-javascript-orm
var Q = require('q'),
  jwt = require('jwt-simple');
var express = require('express');
var app = express();

app.set('models', require('../models'));

var Worker = app.get('models').Worker;

module.exports = {
  //TODO: Add any worker specific routes.
};
