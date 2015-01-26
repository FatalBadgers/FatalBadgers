var Sequelize = require("sequelize");

// Production specific configuration
// =================================
exports = {
  ip: process.env.IP || undefined,
  // Create a database connection and export it from this file.
  // Connecting with the user "root", no password,
  // and to the database "ihammer".
  mysql: new Sequelize('ihammer_prod', 'root', '', {
    host: process.env.DATABASE_HOST,
    port: '3306',
    dialect: 'mysql'
  }),
  seedDB: true,
  port: 80
};
