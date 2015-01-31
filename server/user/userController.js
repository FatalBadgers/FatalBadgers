//we reference the models here
//expecting models/index.js from Scott
//http://architects.dzone.com/articles/sequelize-javascript-orm
var Q = require('q'),
  jwt = require('jwt-simple');
var express = require('express');
var app = express();

var Worker = require('../models').Workers;
var Client = require('../models').Clients;

module.exports = {
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
                    var token = jwt.encode(worker, 'secret');
                    res.json({
                      token: token
                    });
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
                    var token = jwt.encode(client, 'secret');
                    res.json({
                      token: token
                    });
                  } else {
                    return next(new Error('No client'));
                  }
                });
            }
          }
        });
    }
  },

  signup: function(req, res, next) {
    var email = req.body.email,
      password = req.body.password,
      accountType = req.body.accountType,
      name = req.body.name,
      hourly_rate = req.body.hourly_rate,
      img_url = req.body.img_url,
      summary = req.body.summary,
      create,
      newWorker,
      newClient;

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
              console.log("user created");
              // make a new user if not one
              newWorker = {
                email: email,
                accountType: accountType,
                name: name,
                'hourly_rate': hourly_rate,
                'img_url': img_url,
                'summary': summary,
                skills: skills
              };

              Worker.setPassword(password).then(function(password) {
                newWorker.password = password;
                Worker.build(newWorker).save().complete(function(err, worker) {
                  // create token to send back for auth
                  if(err) {
                    console.log(err)
                  } else {
                    console.log("auth token created");
                    var token = jwt.encode(worker, 'secret');
                    res.json({
                      token: token
                    });
                  }
                });
              });
            }
          }
        })
    } else {
      // check to see if user already exists
      Client.find({where: {email: email}})
        .complete(function(err, client) {
          if(err) {
            console.log(err)
          } else {
            if(client) {
              next(new Error('Client already exist!'));
            } else {
              console.log("client created");
              // make a new user if not one
              newClient = {
                email: email,
                password: Client.setPassword(password),
                accountType: accountType,
                name: name,
                'hourly_rate': hourly_rate,
                'img_url': img_url,
                'summary': summary
              };

              Client.setPassword(password).then(function(password) {
                newClient.password = password;
                Client.build(newClient).save().complete(function(err, client) {
                  // create token to send back for auth
                  if(err) {
                    console.log(err)
                  } else {
                    console.log("auth token created");
                    var token = jwt.encode(client, 'secret');
                    res.json({
                      token: token
                    });
                  }
                });
              });
            }
          }
        })
    }
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
      if(token.account_type === "worker") {
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
      } else {
        var client = jwt.decode(token, 'secret');
        var findClient = Q.nbind(User.findOne, User);
        findClient({where: {email: client.email}})
          .then(function(findClient) {
            if(findClient) {
              res.send(200);
            } else {
              res.send(401);
            }
          })
          .fail(function(error) {
            next(error);
          });
      }
    }
  },

  viewProfile: function(req, res, next) {
    var accountType = req.body.accountType,
      email = req.body.email;

    if(accountType === 'Worker') {
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
      password = req.body.password,
      accountType = req.body.accountType,
      name = req.body.name,
      hourly_rate = req.body.hourly_rate,
      img_url = req.body.img_url,
      summary = req.body.summary;

    if(accountType === 'Worker') {
      if(req.body) {
        var edit = {
          email: email,
          password: password,
          accountType: accountType,
          name: name,
          'hourly_rate': hourly_rate,
          'img_url': img_url,
          'summary': summary,
          skills: skills
        };

        Worker.findOrCreate({where: edit}).complete(function(profile) {
          res.send(profile);
        }).catch(function(err) {
          console.log(err);
        });
      } else {
        console.log("In Edit Profile controller method. Worker does not exist.")
      }
    } else {
      if(req.body) {
        var edit = {
          email: email,
          password: password,
          accountType: accountType,
          name: name,
          'hourly_rate': hourly_rate,
          'img_url': img_url,
          'summary': summary
        };

        Client.findOrCreate({where: edit}).complete(function(profile) {
          res.send(profile);
        }).catch(function(err) {
          console.log(err);
        });
      } else {
        console.log("In Edit Profile controller method. Worker does not exist.")
      }
    }
  },

  getUser: function(req, res, next) {
    var accountType = req.body.accountType,
      email = req.body.email,
      query;

    if(accountType === 'Worker') {
      query = {where: {email: email}};
      Worker.find(query).complete(function(profile) {
        res.send(profile);
        res.end('you are in viewprofile');
      });
    } else {
      query = {where: {email: email}};
      Client.find(query).complete(function(profile) {
        res.send(profile);
        res.end('you are in viewprofile');
      });
    }
  }
};
