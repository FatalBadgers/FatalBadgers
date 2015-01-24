var Sequelize = require("sequelize");
exports.ihammerDatabase = require('../config/environment').mysql;

exports.Workers = exports.ihammerDatabase.define("workers", {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  email: Sequelize.STRING,
  'avg_rating': Sequelize.STRING
});

exports.Clients = exports.ihammerDatabase.define("clients", {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  email: Sequelize.STRING,
  'avg_rating': Sequelize.STRING
});

exports.ClientReviews = exports.ihammerDatabase.define("client_reviews", {
  comment: Sequelize.STRING,
  rating: Sequelize.INTEGER
});

exports.WorkerReviews = exports.ihammerDatabase.define("worker_reviews", {
  comment: Sequelize.STRING,
  rating: Sequelize.INTEGER
});

exports.WorkersJobs = exports.ihammerDatabase.define("workers_jobs", {
});

exports.Jobs = exports.ihammerDatabase.define("jobs", {
  title: Sequelize.STRING,
  applicants: Sequelize.INTEGER,
  budget: Sequelize.INTEGER,
  summary: Sequelize.STRING,
  'skills_needed': Sequelize.STRING,
  status: Sequelize.STRING
});

//One to many relationship from workers to worker_reviews
exports.Workers.hasMany(exports.WorkerReviews);
exports.WorkerReviews.belongsTo(exports.Workers);

//One to many relationship from clients to client_reviews
exports.Clients.hasMany(exports.ClientReviews);
exports.ClientReviews.belongsTo(exports.Clients);

//Many to many relationship from workers to jobs
exports.Workers.belongsToMany(exports.Jobs, { through: exports.WorkersJobs });
exports.Jobs.belongsToMany(exports.Workers, { through: exports.WorkersJobs });

//One to many relationship from jobs to workers
exports.Workers.hasMany(exports.Jobs);
exports.Jobs.belongsTo(exports.Workers);

//One to one relationship from jobs to clients
exports.Jobs.hasOne(exports.Clients);
exports.Clients.belongsTo(exports.Jobs);

exports.Workers.sync();
exports.Clients.sync();
exports.WorkerReviews.sync();
exports.ClientReviews.sync();
exports.Jobs.sync();
exports.WorkersJobs.sync();

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
