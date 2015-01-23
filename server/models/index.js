var Sequelize = require("sequelize");
exports.ihammerDatabase = require('../config/environment');

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

exports.Jobs = exports.ihammerDatabase.define("jobs", {
  title: Sequelize.STRING,
  'id_workers': Sequelize.INTEGER,
  'id_clients': Sequelize.INTEGER,
  applicants: Sequelize.INTEGER,
  budget: Sequelize.INTEGER,
  summary: Sequelize.STRING,
  'skills_needed': Sequelize.STRING,
  status: Sequelize.STRING
});

exports.ClientReviews = exports.ihammerDatabase.define("client_reviews", {
  comment: Sequelize.STRING,
  'id_clients': Sequelize.INTEGER,
  rating: Sequelize.INTEGER
});

exports.WorkerReviews = exports.ihammerDatabase.define("worker_reviews", {
  comment: Sequelize.STRING,
  'id_workers': Sequelize.INTEGER,
  rating: Sequelize.INTEGER
});

//One to many relationship from workers to worker_reviews
exports.WorkerReviews.belongsTo(exports.Workers);
exports.Workers.hasMany(exports.WorkerReviews);

//One to many relationship from clients to client_reviews
exports.ClientReviews.belongsTo(exports.Client);
exports.Client.hasMany(exports.ClientReviews);

//Many to many relationship from workers to jobs
exports.Workers.belongsToMany(exports.Jobs, { through: WorkersJobs });
exports.Jobs.belongsToMany(exports.Workers, { through: WorkersJobs });

//One to many relationship from jobs to workers
exports.Jobs.belongsTo(exports.Workers);
exports.Workers.hasMany(exports.Jobs);

//One to one relationship from jobs to clients
exports.Jobs.hasMany(exports.Clients);
exports.Clients.hasMany(exports.Jobs);

exports.workers.sync();
exports.clients.sync();
exports.jobs.sync();
exports.workers_open_jobs.sync();
exports.client_reviews.sync();
exports.worker_reviews.sync();

exports.ihammerDatabase
  .authenticate()
  .complete(function(err) {
    // Even if we didn't define any foreign key or something else,
    // instances of Target will have a column SourceId!
    if(!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  });
