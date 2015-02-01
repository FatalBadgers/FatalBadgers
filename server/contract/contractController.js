//we reference the models here
//expecting models/index.js from Scott
//http://architects.dzone.com/articles/sequelize-javascript-orm
var Q = require('q');
var express = require('express');
var app = express();
var Sequelize = require("sequelize");

app.set('models', require('../models'));
var Job = app.get('models').Jobs;

module.exports = {
  getContracts: function(req, res, next) {
    var query = req.query.q;
    var queryParameters = {};

    if(query) {
      queryParameters = {
        where: Sequelize.or({
          title: {
            like: '%' + query + '%'
          }
        }, {
          'skills_needed': {
            like: '%' + query + '%'
          }
        }),
        limit: 10
      }
    }

    Job.findAll(queryParameters).
      complete(function(err, workers) {
        if(err) {
          console.log(err);
        }

        res.send(workers);
      });
  }
};
