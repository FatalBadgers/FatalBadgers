var Sequelize = require('sequelize');

// Development specific configuration
// =================================
module.exports = {
  // Create a database connection and export it from this file.
  // Connecting with the user "root", no password,
  // and to the database "ihammer".
  mysql: new Sequelize('ihammer', 'root', '', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
  }),
  port: 9000
};
