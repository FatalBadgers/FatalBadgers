var models = require('../models/index.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');

//do i need to instantiate a new worker?

module.exports = {
  signin: function (req, res, next) {

    //kevin
  },

  signup: function (req, res, next) {
    //kevin
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database

  },

  viewprofile: function(req, res, next){
    var query = {where: {'email' : req.body.email}};
    sendResponse(res, query);
  },

  editprofile: function(req, res, next){
    //if user posts an editprofile, then have it add to the database
    if(req.user){
      var edit = {
        location: req.body.location,
        skills: req.body.skills,
        summary: req.body.summary
      };
      findOrCreate(edit).success(function(){
        sendResponse(res, {});
      });
    } else{
      console.log("In Edit Profile controller. User does not exist.")
    }  
  }


};
