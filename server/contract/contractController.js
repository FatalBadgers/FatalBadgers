//we reference the models here
//expecting models/index.js from Scott
//http://architects.dzone.com/articles/sequelize-javascript-orm
var Q = require('q');
var express = require('express');
var app = express();
var Sequelize = require("sequelize");

app.set('models', require('../models'));

var Worker = app.get('models').Workers;
var Client = app.get('models').Clients;
var Jobs = app.get('models').Jobs;

module.exports = {
  createJob: function(req, res, next){
    var id_clients = req.body.id_clients,
        title = req.body.title,
        hourly_rate = req.body.hourly_rate,
        summary = req.body.summary,
        skills_needed = req.body.skills_needed,
        status = req.body.status,
        img_url = req.body.img_url

    var newJob = {
      title: title,
      'hourly_rate': hourly_rate,
      summary: summary,
      'skills_needed': skills_needed,
      status: status,
      'img_url': img_url,
      'id_clients': id_clients
    };

    Jobs.build(newJob).save().complete(function(err, job) {
      if(err) {
        console.log(err);
      } else {
        console.log('New job created');
        res.json(job);
      }
    });

  },

  editJob: function(req, res, next){
    var id_clients = req.body.id_clients,
        title = req.body.title,
        hourly_rate = req.body.hourly_rate,
        summary = req.body.summary,
        skills_needed = req.body.skills_needed,
        status = req.body.status,
        img_url = req.body.img_url;

    if (req.body) {
      var edit = {
        title: title,
        'hourly_rate': hourly_rate,
        summary: summary,
        'skills_needed': skills_needed,
        status: status,
        'img_url': img_url
      };

      Jobs.findOrCreate({where: edit}).complete(function(job) {
        res.send(job);
      }).catch(function(err) {
        console.log(err);
      });
    } else {
      console.log("In Edit Job controller method. Job does not exist.")
    };

  },
  
  endJob: function(req, res, next) {  
   
    var id = req.body.id

    if(req.body) {
      var edit = {
        id: id,
        status: "complete"
      };

      Jobs.findOrCreate({where: edit}).complete(function(job) {
        res.send(job);
      }).catch(function(err) {
        console.log(err);
      });
    } else {
      console.log("In end contract controller. Job does not exist");
    };

  },

  getHistory: function(req, res, next) {
    
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


// var Job = app.get('models').Jobs;


};




  