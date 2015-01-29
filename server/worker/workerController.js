//we reference the models here
//http://architects.dzone.com/articles/sequelize-javascript-orm

var Q = require('q'),
    jwt  = require('jwt-simple');
var express = require('express');
var app = express();
var db = require('../models/index.js');


//-->FOR MOCK DATA
// Remember to change out the information.
// var worker = require('../api/mocks/mocks.controller.js');
//<--END MOCK DATA

var Worker = db.Workers;
var WorkerJobs = db.WorkersJobs;
var ClientReviews = db.ClientReviews;

module.exports = {
  signin: function (req, res, next) {
    res.end('you are in signin');
    //kevin 
  },

  signup: function (req, res, next) {
    res.end('you are in signup');
    //kevin
  },

  checkAuth: function (req, res, next) {
    res.end('you are in checkauth');
    //kevin
  },

  viewprofile: function(req, res, next) {
    Worker.findAll()
    
    .then(function(worker){
      res.json(worker);
      // res.end();
    })
    // worker.workers(req, res);
  },

  createprofile: function(req, res, next){
    console.log(req.body);
    var profile = Worker.build(req.body);

    profile.save().complete(function(err){
      if(!!err){
        console.log("err!");
        res.status(500);
        res.end();
      }
      else{
        console.log("GREAT success");
        res.json(profile);
      }
    });
  },

  editprofile: function(req, res, next) {
    console.log(req.body);
    var profile = Worker.build(req.body);

    profile.save().complete(function(err){
      if(err){
        console.log('err!');
        res.status(500);
        res.end();
      } else {
        console.log("Successfully edited profile");
        res.json(profile);
        //redirect to Worker Dashboard
      }
    })
    // res.end('Edit Profile');
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
    })
    // res.end("Review Client");
  },

  dashboard: function(req, res, next) {
    res.send()
  }

};
