// userController is the Parent Controller to Worker and Client.
// All generic functions are present here.
// For more specific function, check in worker/workerController.js

var Q = require('q'),
  jwt = require('jwt-simple');
var express = require('express');
var app = express();

var Worker = require('../models').Workers;
var Client = require('../models').Clients;
var WorkerReviews = require('../models').WorkerReviews;
var ClientReviews = require('../models').ClientReviews;

module.exports = {

  // Depending on whether the account is for a Worker or Client
  // we will retrieve data from the corresponding table
  // Check the Schema Layout in the FatalBadger WikiPage
  
  signin: function(req, res, next) {
    var email = req.body.email,
      password = req.body.password,
      accountType = req.body.accountType;

    if(accountType === 'Worker') {
      Worker.find({where: {email: email}})
        .complete(function(err, worker) {
          if(err) {
            console.log(err)
          } else {
            if(!worker) {
              next(new Error('Worker does not exist'));
            } else {
              return worker.comparePasswords(password)
                .then(function(foundWorker) {
                  if(foundWorker) {
                    res.send(worker);
                  } else {
                    return next(new Error('No worker'));
                  }
                });
            }
          }
        });
    } else {
      Client.find({where: {email: email}})
        .complete(function(err, client) {
          if(err) {
            console.log(err)
          } else {
            if(!client) {
              next(new Error('Client does not exist'));
            } else {
              return client.comparePasswords(password)
                .then(function(foundClient) {
                  if(foundClient) {
                    res.send(client);
                  } else {
                    return next(new Error('No client'));
                  }
                });
            }
          }
        });
    }
  },

  // Depending on whether the account is for a Worker or Client
  // we will retrieve data from the corresponding table
  // Check the Schema Layout in the FatalBadger WikiPage
  signup: function(req, res, next) {

    // Collect information from the request
    var email = req.body.email,
      password = req.body.password,
      accountType = req.body.accountType,
      name = req.body.name,
      hourly_rate = req.body.hourly_rate,
      img_url = req.body.img_url,
      summary = req.body.summary,
      location = req.body.location,
      newWorker,
      newClient;

    // Depending on whether the account is for a Worker or Client
    // we will retrieve data from the corresponding table
    // Check the Schema Layout in the FatalBadger WikiPage
    if(accountType === 'Worker') {
      var skills = req.body.skills;

      // check to see if user already exists
      Worker.find({where: {email: email}})
        .complete(function(err, worker) {
          if(err) {
            console.log(err)
          } else {
            if(worker) {
              next(new Error('Worker already exists!'));
            } else {
              console.log("User created");

              // Make a new user if doesn't yet exist
              newWorker = {
                email: email,
                accountType: accountType,
                name: name,
                'hourly_rate': hourly_rate,
                'summary': summary,
                skills: skills,
                location: location
              };

              if(img_url){
                newWorker.img_url = img_url;
              }


              Worker.setPassword(password).then(function(password) {
                newWorker.password = password;
                // Save password to database here
                Worker.build(newWorker).save().complete(function(err, worker) {
                  // create token to send back for auth
                  if(err) {
                    console.log(err)
                  } else {
                    console.log("auth token created");
                    res.json(worker);
                  }
                });
              });
            }
          }
        })
    } else {
      // Check to see if user already exists
      Client.find({where: {email: email}})
        .complete(function(err, client) {
          if(err) {
            console.log(err)
          } else {
            if(client) {
              next(new Error('Client already exist!'));
            } else {
              console.log("client created");
              
              // Make a new user if not one
              newClient = {
                email: email,
                password: Client.setPassword(password),
                accountType: accountType,
                name: name,
                'hourly_rate': hourly_rate,
                'summary': summary,
                location: location
              };

              if(img_url){
                newWorker.img_url = img_url;
              }

              Client.setPassword(password).then(function(password) {
                newClient.password = password;
                Client.build(newClient).save().complete(function(err, client) {
                  // create token to send back for auth
                  if(err) {
                    console.log(err)
                  } else {
                    console.log("auth token created");
                    res.json(client);
                  }
                });
              });
            }
          }
        })
    }
  },

  // Function isn't used, use instead at getUser
  // Can be deleted
  viewProfile: function(req, res, next) {
    var accountType = req.body.accountType,
      email = req.body.email;

    if(accountType === 'Worker') {
      // Search user in corresponding table
      var query = {where: {email: email}};
      Worker.find(query).complete(function(profile) {
        res.send(profile);
        res.end('you are in viewprofile');
      });
    } else {
      var query = {where: {email: email}};
      Client.find(query).complete(function(profile) {
        res.send(profile);
        res.end('you are in viewprofile');
      });
    }
  },

  editProfile: function(req, res, next) {
    //if user posts an editprofile, then have it add to the database
    var email = req.body.email,
      accountType = req.body.accountType,
      name = req.body.name,
      hourly_rate = req.body.hourly_rate,
      img_url = req.body.img_url,
      skills = req.body.skills,
      summary = req.body.summary;

    if(accountType === 'Worker') {
      if(req.body) {
        var edit = {
          email: email,
          accountType: accountType,
          name: name,
          'hourly_rate': hourly_rate,
          'img_url': img_url,
          'summary': summary,
          skills: skills
        };

        Worker.update(edit, {where: {email: edit.email}}).complete(function(err, affectedRows) {
          if(err){
            console.log(err);
          }

          res.send({affectedRows: affectedRows});
        });
      } else {
        // TODO: Add modal alert on client side
        console.log("In Edit Profile controller method. Worker does not exist.")
      }
    } else {
      if(req.body) {
        var edit = {
          email: email,
          accountType: accountType,
          name: name,
          'hourly_rate': hourly_rate,
          'img_url': img_url,
          'summary': summary
        };

        Client.update(edit, {where: {email: edit.email}}).complete(function(err, affectedRows) {
          if(err){
            console.log(err);
          }

          res.send({affectedRows: affectedRows});
        });
      } else {
        // TODO: Add modal alert on client side
        console.log("In Edit Profile controller method. Worker does not exist.")
      }
    }
  },

  // Can view the profile of a Worker or Client
  // On app, is used to view a profile and view/update the 'Settings' page
  getUser: function(req, res, next) {
    var accountType = req.body.accountType,
      email = req.body.email,
      query;

    if(accountType === 'Worker') {
      query = {where: {email: email}};
      Worker.find(query).complete(function(err, profile) {
        if(err){
          console.log(err);
        }

        res.send(profile);
        res.end('you are in viewprofile');
      });
    } else {
      query = {where: {email: email}};
      Client.find(query).complete(function(err, profile) {
        if(err){
          console.log(err);
        }

        res.send(profile);
        res.end('you are in viewprofile');
      });
    }
  },

  // A Client or Worker adds a review for the person they worked with
  review: function(req, res, next) {
    var accountType = req.body.accountType,
        id = req.body.id,
        rating = req.body.rating,
        comment = req.body.comment;

    if(accountType === "Worker"){
      if(req.body) {
        var review = {
          id: id,
          comment: comment,
          rating: rating,
          id_clients: req.body.id_clients
        };
        WorkerReviews.findOrCreate({where: review}).complete(function(rating) {
          res.send(rating);
        }).catch(function(err) {
          console.log(err);
        });
      } else {
        console.log('In review controller method')
      }  
    } else {
      if(req.body) {
        var review = {
          id: id,
          comment: comment,
          rating: rating,
          id_workers: req.body.id_workers
        };
        ClientReviews.findOrCreate({where: review}).complete(function(rating) {
          res.send(rating);
        }).catch(function(err) {
          console.log(err);
        });
      } else {
        console.log("In review controller method")
      }
    }

  }

};
