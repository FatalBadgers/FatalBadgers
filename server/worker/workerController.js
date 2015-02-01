//we reference the models here
//expecting models/index.js from Scott
//http://architects.dzone.com/articles/sequelize-javascript-orm
var Q = require('q');
var express = require('express');
var app = express();
var Sequelize = require("sequelize");

app.set('models', require('../models'));
var Worker = app.get('models').Workers;

module.exports = {
  getWorkers: function(req, res, next) {
    var query = req.query.q;
    var queryParameters = {};

    if(query) {
      queryParameters = {
        where: Sequelize.or({
          name: {
            like: '%' + query + '%'
          }
        }, {
          skills: {
            like: '%' + query + '%'
          }
        }),
        limit: 10
      }
    }

    Worker.findAll(queryParameters).
      complete(function(err, workers) {
        if(err) {
          console.log(err);
        }

        res.send(workers);
      });
  }
};
