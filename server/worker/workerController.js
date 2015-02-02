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
  },

  gethistory: function(req, res, next) {
    console.log('hello get history');
    //we need to just grab all the jobs where we find worker name or id
    WorkerJobs.find({where: {workerID: req.body.workerID}})
      .then(function(history){
        res.send("hello!");
        res.json(history);
      })
  },

  endcontract: function(req, res, next) {
    console.log("End Contract");
    res.end('End Contract');

  },

  reviewclient: function(req, res, next) {
    console.log("Review Client");
    var review = ClientReviews.build(req.body);

    review.save().complete(function(err){
      if(err){
        res.status(500);
        //maybe redirect to dashboard?
        res.end();
      } else {
        res.json(review);
      }
    });
    // res.end("Review Client");
  },

  dashboard: function(req, res, next) {
    res.send()
  }
};
