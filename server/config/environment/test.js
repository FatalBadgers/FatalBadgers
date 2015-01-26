var Sequelize = require("sequelize");

exports = {
  // Create a database connection and export it from this file.
  // Connecting with the user "root", no password,
  // and to the database "ihammer".
  mysql: new Sequelize('ihammer', 'root', '', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
  }),
  seedDB: true,
  port: 3000
};
