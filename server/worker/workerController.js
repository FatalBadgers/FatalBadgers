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
  signin: function(req, res, next) {
    var email = req.body.email,
      password = req.body.password;

    var findWorker = Q.nbind(Worker.find, Worker);
    findWorker({'where': {email: email}})
      .then(function(worker) {
        if(!worker) {
          next(new Error('Worker does not exist'));
        } else {
          return worker.comparePasswords(password)
            .then(function(foundWorker) {
              if(foundWorker) {
                var token = jwt.encode(worker, 'secret');
                res.json({
                  token: token
                });
              } else {
                return next(new Error('No worker'));
              }
            });
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  signup: function(req, res, next) {
    var email = req.body.email,
      password = req.body.password,
      create,
      newWorker;

    var findOne = Q.nbind(Worker.find, Worker);

    // check to see if user already exists
    findOne({where: {email: email}})
      .then(function(worker) {
        if(worker) {
          next(new Error('Worker already exist!'));
        } else {
          console.log("user created");
          // make a new user if not one
          create = Q.nbind(Worker.create, Worker);
          newWorker = {
            email: email,
            password: password
          };
          return create(newWorker);
        }
      })
      .then(function(worker) {
        // create token to send back for auth
        console.log("auth token created");
        var token = jwt.encode(worker, 'secret');
        res.json({
          token: token
        });
      })
      .fail(function(error) {
        next(error);
      });
  },

  checkAuth: function(req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if(!token) {
      next(new Error('No token'));
    } else {
      var worker = jwt.decode(token, 'secret');
      var findWorker = Q.nbind(User.findOne, User);
      findWorker({where: {email: worker.email}})
        .then(function(foundWorker) {
          if(foundWorker) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function(error) {
          next(error);
        });
    }
  },

  viewprofile: function(req, res, next) {
    var query = {where: {email: req.body.email}};
    Worker.findAll(query).complete(function(profile) {
      res.send(profile);
      res.end('you are in viewprofile');
    });
  },

  editprofile: function(req, res, next) {
    //if user posts an editprofile, then have it add to the database
    if(req.body) {
      var edit = {
        location: req.body.location,
        skills: req.body.skills,
        summary: req.body.summary
      };

      Worker.findOrCreate({where: edit}).complete(function(profile) {
        res.send(profile);
      }).catch(function(err){
        console.log(err);
      });
    } else {
      console.log("In Edit Profile controller method. Worker does not exist.")
    }
  },

  gethistory: function(req, res, next) {
    if(req.body) {
      Worker.find({ where: {id: req.body.id} }).complete(function(worker) {
        worker.getJobs().then(function(jobs){
          res.send(jobs);
        }).fail(function(err){
          console.log(err);
        });
      }).catch(function(err){
        console.log(err);
      });
    } else {
      console.log("In Get History controller method. Worker does not exist.")
    }
  },

  endcontract: function(req, res, next) {
    if(req.body) {
      Worker.find({ where: {id: req.body.id} }).complete(function(worker) {
        worker.getJobs({ where: {status: 'in_progress'} }).then(function(job){
          job.
          res.send(jobs);
        }).fail(function(err){
          console.log(err);
        });
      }).catch(function(err){
        console.log(err);
      });
    } else {
      console.log("In end contract controller method. Worker does not exist.")
    }
  }
};
