// We reference the models here
var Q = require('q');
var express = require('express');
var app = express();
var Sequelize = require("sequelize");

app.set('models', require('../models'));

var Worker = app.get('models').Workers;
var Client = app.get('models').Clients;
var Jobs = app.get('models').Jobs;

module.exports = {

  // Creates a new job, done by the Client
  createJob: function(req, res, next) {
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

  // A Client can update the information for a particular job
  editJob: function(req, res, next) {
    var id_clients = req.body.id_clients,
      title = req.body.title,
      hourly_rate = req.body.hourly_rate,
      summary = req.body.summary,
      skills_needed = req.body.skills_needed,
      status = req.body.status,
      img_url = req.body.img_url;

    if(req.body) {
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

  // Gets history of jobs done for a Client or Worker
  getHistory: function(req, res, next) {
    var accountType = req.body.accountType;

    if(accountType === 'Worker') {

      // Gets jobs for Workers
      var query = {where: {id_workers: req.body.id_workers}};
      WorkersJobs.find(query).complete(function(history) {
        res.send(history);
        res.end('You are in get history');
      })

    } else {
      // Gets jobs for Clients
      var query = {where: {id_clients: id_clients}};
      ClientsJobs.find(query).complete(function(history) {
        res.send(history);
        res.end('You are in get history');
      })
    }
  },

  // Get the contracts shared between a Worker and a Client
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

    // Retrieve all jobs from the Job table
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

