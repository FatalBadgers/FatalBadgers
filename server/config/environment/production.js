var Sequelize = require("sequelize");

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:       process.env.IP || undefined,

  // Server port
  port:     80
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
