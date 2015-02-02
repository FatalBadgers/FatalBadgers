/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var Sequelize = require("sequelize");
var should = require('should');
var models = require('../models');

describe("MySQL Database tests", function() {
  beforeEach(function(done) {
    done();
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var clientId;
    var name;

    // insert new client record in MySQL
    models.Clients.create({
      name: 'Walgreens',
      location: 'St. Louis',
      email: 'walgreens@gmail.com',
      'avg_rating': 3
    }).complete(function(err, client) {
      if(!!err) {
        console.log(err);
      }

      // clientId and name of client created
      clientId = client.id;
      name = client.name;

      // delete client record just created in MySQL
      models.Clients.destroy({
        where: {
          id: clientId
        }
      }).complete(function(err, room) {
        if(!!err) {
          console.log(err);
        }

        // determine if name of inserted database matches what was supposted to be inserted
        name.should.equal("Walgreens");
        done();
      })
    })
  });
});

