var Sequelize = require("sequelize"),
  bcrypt = require('bcrypt-nodejs'),
  Q = require('q');

exports.ihammerDatabase = require('../config/environment').mysql;

// define the workers database
exports.Workers = exports.ihammerDatabase.define("workers", {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  location: {
    type: Sequelize.STRING,
    defaultValue: 'No location provided'
  },
  email: Sequelize.STRING,
  skills: Sequelize.TEXT,
  'hourly_rate': {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  'avg_rating': {
    type: Sequelize.STRING,
    defaultValue: 'No rating given yet'
  },
  'img_url': {
    type: Sequelize.STRING,
    defaultValue: '/../../assets/images/default.png'
  },
  summary: {
    type: Sequelize.STRING,
    defaultValue: 'No summary provided'
  },
  'account_type': {
    type: Sequelize.STRING,
    defaultValue: 'Worker'
  },
  'worker_reviewId': {
    type: Sequelize.STRING,
    defaultValue: 'Client'
  }
}, {
  instanceMethods: {

    // On login, we compare the hashed given password with the stored password
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

    // When we set password, we first hash and salt it for increased security
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
  location: {
    type: Sequelize.STRING,
    defaultValue: 'No location provided'
  },
  email: Sequelize.STRING,
  'avg_rating': {
    type: Sequelize.STRING,
    defaultValue: 'No rating given yet'
  },
  'img_url': {
    type: Sequelize.STRING,
    defaultValue: '/../../assets/images/default.png'
  },
  summary: {
    type: Sequelize.STRING,
    defaultValue: 'No summary provided'
  },
  'account_type': {
    type: Sequelize.STRING,
    defaultValue: 'Client'
  },
  'client_reviewId': {
    type: Sequelize.STRING,
    defaultValue: 'Client'
  }
}, {
  instanceMethods: {

    // On login, we compare the hashed given password with the stored password
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

    // When we set password, we first hash and salt it for increased security
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
  rating: Sequelize.INTEGER,
  clientId: Sequelize.INTEGER
});

// define the worker_reviews database
exports.WorkerReviews = exports.ihammerDatabase.define("worker_reviews", {
  comment: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  workerId: Sequelize.INTEGER
});

// define the workers_jobs database
exports.WorkersJobs = exports.ihammerDatabase.define("workers_jobs", {
  workerId: Sequelize.INTEGER
});

// define the clients_jobs database
exports.ClientsJobs = exports.ihammerDatabase.define("clients_jobs", {});


// define the jobs database
exports.Jobs = exports.ihammerDatabase.define("jobs", {
  title: Sequelize.STRING,
  applicants: Sequelize.INTEGER,
  'hourly_rate': {
    type: Sequelize.BIGINT,
    defaultValue: 0
  },
  summary: {
    type: Sequelize.STRING,
    defaultValue: 'No summary provided'
  },
  'skills_needed': Sequelize.TEXT,
  status: Sequelize.STRING,
  'img_url': {
    type: Sequelize.STRING,
    defaultValue: '/../../assets/images/default.png'
  },
  clientId: Sequelize.INTEGER,
  workerId: Sequelize.INTEGER,
  workers_jobsId: Sequelize.INTEGER
});

// create all associations between databases specified above
exports.Workers.sync().complete(function(err) {
  if(err) {
    console.log('Error creating Workers:', err)
  } else {
    console.log('Workers database created successfully.')
  }
});

exports.Clients.sync().complete(function(err) {
  if(err) {
    console.log('Error creating Clients:', err)
  } else {
    console.log('Clients database created successfully.')
  }
});

exports.WorkerReviews.sync().complete(function(err) {
  if(err) {
    console.log('Error creating Worker Reviews:', err)
  } else {
    console.log('Worker Reviews database created successfully.')
  }
});

exports.ClientReviews.sync().complete(function(err) {
  if(err) {
    console.log('Error creating Client Reviews:', err)
  } else {
    console.log('Client Reviews database created successfully.')
  }
});

exports.WorkersJobs.sync().complete(function(err) {
  if(err) {
    console.log('Error creating Workers Jobs:', err)
  } else {
    console.log('Workers Jobs database created successfully.')
  }
});

exports.ClientsJobs.sync().complete(function(err) {
  if(err) {
    console.log('Error creating Clients Jobs:', err)
  } else {
    console.log('Clients Jobs database created successfully.')
  }
});

exports.Jobs.sync().complete(function(err) {
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

//Many to many relationship from clients to jobs
exports.Clients.hasMany(exports.Jobs, {through: "clients_jobs"});
exports.Jobs.belongsToMany(exports.Clients, {through: "clients_jobs"});


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
