var Sequelize = require("sequelize"),
  bcrypt = require('bcrypt-nodejs'),
  Q = require('q');

exports.ihammerDatabase = require('../config/environment').mysql;

// define the workers database
exports.Workers = exports.ihammerDatabase.define("workers", {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  location: Sequelize.STRING,
  email: Sequelize.STRING,
  skills: Sequelize.TEXT,
  'hourly_rate': Sequelize.BIGINT,
  'avg_rating': Sequelize.STRING,
  'img_url': Sequelize.STRING,
  summary: Sequelize.TEXT,
  'account_type': {
    type: Sequelize.STRING,
    defaultValue: 'worker'
  }
}, {
  instanceMethods: {
    comparePasswords: function(candidatePassword) {
      var defer = Q.defer();
      var savedPassword = this.password;
      bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
        if(err) {
          defer.reject(err);
        } else {
          defer.resolve(isMatch);
        }
      });
      return defer.promise;
    }
  }, classMethods: {
    setPassword: function(password) {
      var defer = Q.defer();
      bcrypt.genSalt(10, function(err, salt) {
        return bcrypt.hash(password, salt, null, function(err, encrypted) {
          if(err) {
            defer.reject(err);
          } else {
            defer.resolve(encrypted);
          }
        });
      });
      return defer.promise;
    }
  }
});

// define the clients database
exports.Clients = exports.ihammerDatabase.define("clients", {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  location: Sequelize.STRING,
  email: Sequelize.STRING,
  'avg_rating': Sequelize.STRING,
  'img_url': Sequelize.STRING,
  summary: Sequelize.TEXT,
  'account_type': {
    type: Sequelize.STRING,
    defaultValue: 'client'
  }
}, {
  instanceMethods: {
    comparePasswords: function(candidatePassword) {
      var defer = Q.defer();
      var savedPassword = this.password;
      bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
        if(err) {
          defer.reject(err);
        } else {
          defer.resolve(isMatch);
        }
      });
      return defer.promise;
    }
  }, classMethods: {
    setPassword: function(password) {
      var defer = Q.defer();
      bcrypt.genSalt(10, function(err, salt) {
        return bcrypt.hash(password, salt, null, function(err, encrypted) {
          if(err) {
            defer.reject(err);
          } else {
            defer.resolve(encrypted);
          }
        });
      });
      return defer.promise;
    }
  }
});

// define the client_review database
exports.ClientReviews = exports.ihammerDatabase.define("client_reviews", {
  comment: Sequelize.STRING,
  rating: Sequelize.INTEGER
});

// define the worker_reviews database
exports.WorkerReviews = exports.ihammerDatabase.define("worker_reviews", {
  comment: Sequelize.STRING,
  rating: Sequelize.INTEGER
});

// define the workers_jobs database
exports.WorkersJobs = exports.ihammerDatabase.define("workers_jobs", {});

// define the jobs database
exports.Jobs = exports.ihammerDatabase.define("jobs", {
  title: Sequelize.STRING,
  applicants: Sequelize.INTEGER,
  'hourly_rate': Sequelize.INTEGER,
  summary: Sequelize.TEXT,
  'skills_needed': Sequelize.TEXT,
  status: Sequelize.STRING,
  'img_url': Sequelize.STRING
});

// create all associations between databases specified above
exports.Workers.sync({force: true}).complete(function(err) {
  if(err) {
    console.log('Error creating Workers:', err)
  } else {
    console.log('Workers database created successfully.')
  }
});

exports.Clients.sync({force: true}).complete(function(err) {
  if(err) {
    console.log('Error creating Clients:', err)
  } else {
    console.log('Clients database created successfully.')
  }
});

exports.WorkerReviews.sync({force: true}).complete(function(err) {
  if(err) {
    console.log('Error creating Worker Reviews:', err)
  } else {
    console.log('Worker Reviews database created successfully.')
  }
});

exports.ClientReviews.sync({force: true}).complete(function(err) {
  if(err) {
    console.log('Error creating Client Reviews:', err)
  } else {
    console.log('Client Reviews database created successfully.')
  }
});

exports.WorkersJobs.sync({force: true}).complete(function(err) {
  if(err) {
    console.log('Error creating Workers Jobs:', err)
  } else {
    console.log('Workers Jobs database created successfully.')
  }
});

exports.Jobs.sync({force: true}).complete(function(err) {
  if(err) {
    console.log('Error creating Jobs:', err)
  } else {
    console.log('Jobs database created successfully.')
  }
});

//One to many relationship from workers to worker_reviews
exports.Workers.hasMany(exports.WorkerReviews);
exports.WorkerReviews.belongsTo(exports.Workers);

//One to many relationship from clients to client_reviews
exports.Clients.hasMany(exports.ClientReviews);
exports.ClientReviews.belongsTo(exports.Clients);

//One to one relationship from jobs to clients
exports.Clients.hasMany(exports.Jobs);
exports.Jobs.belongsTo(exports.Clients);

//Many to many relationship from workers to jobs
exports.Workers.hasMany(exports.Jobs, {through: "workers_jobs"});
exports.Jobs.belongsToMany(exports.Workers, {through: "workers_jobs"});

exports.ihammerDatabase
  .authenticate()
  .complete(function(err) {
    // Even if we didn't define any foreign key or something else,
    // instances of Target will have a column SourceId!
    if(err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  });
