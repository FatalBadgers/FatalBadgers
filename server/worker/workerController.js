//we reference the models here
//expecting models/index.js from Scott
//http://architects.dzone.com/articles/sequelize-javascript-orm
var Q = require('q'),
    jwt  = require('jwt-simple');
var express = require('express');
var app = express();

app.set('models', require('../models'));

var Worker = app.get('models').Worker;

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
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
  },

  viewprofile: function(req, res, next) {
    // var query = {where: {'email' : req.body.email}};
    // Workers.findAll(query, {raw: true}).success(function(profile){
    //   res.send(profile);
    //   res.end('you are in viewprofile');
    // })
    res.end('you are in viewprofile');

  },

  editprofile: function(req, res, next) {
    res.end('in editprofile');
    //if user posts an editprofile, then have it add to the database
    // if(req.user){
    //   var edit = {
    //     location: req.body.location,
    //     skills: req.body.skills,
    //     summary: req.body.summary
    //   };
    //   findOrCreate(edit).success(function(){
    //     sendResponse(res, {});
    //   });
    // } else{
    //   console.log("In Edit Profile controller. User does not exist.")
    // }  
  },

  gethistory: function(req, res, next) {
    
    res.end('you are in history');
  },

  endcontract: function(req, res, next) {
    res.end('you are in end contract')
  }


};
