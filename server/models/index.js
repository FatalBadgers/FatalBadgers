var Sequelize = require("sequelize");
exports.ihammerDatabase = require('../config/environment').mysql;

// define the workers database
exports.Workers = exports.ihammerDatabase.define("workers", {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  location: Sequelize.STRING,
  email: Sequelize.STRING,
  'avg_rating': Sequelize.STRING
});

// define the clients database
exports.Clients = exports.ihammerDatabase.define("clients", {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  location: Sequelize.STRING,
  email: Sequelize.STRING,
  'avg_rating': Sequelize.STRING
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
exports.WorkersJobs = exports.ihammerDatabase.define("workers_jobs", {
});

// define the jobs database
exports.Jobs = exports.ihammerDatabase.define("jobs", {
  title: Sequelize.STRING,
  applicants: Sequelize.INTEGER,
  budget: Sequelize.INTEGER,
  summary: Sequelize.STRING,
  'skills_needed': Sequelize.STRING,
  status: Sequelize.STRING
});

// create all associations between databases specified above
exports.Workers.sync(({force:true})).complete(function(err) {
  if(err) {
    console.log('Error creating Workers:', err)
  } else {
    console.log('Workers database created successfully.')
  }
});

exports.Clients.sync(({force:true})).complete(function(err) {
  if(err) {
    console.log('Error creating Clients:', err)
  } else {
    console.log('Clients database created successfully.')
  }
});

exports.WorkerReviews.sync(({force:true})).complete(function(err) {
  if(err) {
    console.log('Error creating Worker Reviews:', err)
  } else {
    console.log('Worker Reviews database created successfully.')
  }
});

exports.ClientReviews.sync(({force:true})).complete(function(err) {
  if(err) {
    console.log('Error creating Client Reviews:', err)
  } else {
    console.log('Client Reviews database created successfully.')
  }
});

exports.WorkersJobs.sync(({force:true})).complete(function(err) {
  if(err) {
    console.log('Error creating Workers Jobs:', err)
  } else {
    console.log('Workers Jobs database created successfully.')
  }
});

exports.Jobs.sync(({force:true})).complete(function(err) {
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
exports.Jobs.hasOne(exports.Clients);
exports.Clients.belongsTo(exports.Jobs);

//Many to many relationship from workers to jobs
exports.Workers.hasMany(exports.Jobs, { through: "workers_jobs" });
exports.Jobs.belongsToMany(exports.Workers, { through: "workers_jobs" });

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
