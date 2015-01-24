var Sequelize = require("sequelize");

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080,

  // MongoDB connection options
  mongo: {
    uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/badger'
  }
};



// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
exports.mysql = new Sequelize('ihammer', 'root', '', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

exports.seedDB = true;
