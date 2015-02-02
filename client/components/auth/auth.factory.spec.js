'use strict';

describe('Factory: Auth', function () {

  // load the factory's module
  beforeEach(module('badgerApp'));

  var Auth, user;

  // Initialize the factory and example user.
  beforeEach(inject(function ($injector) {
    Auth = $injector.get('Auth');
    user = {
      email: 'test@test.com',
      password: 'test',
      accountType: 'client'
    };
    // TODO Once server auth processes are complete, this should create the test user.
    // TODO most subsequent tests depend on successful server communication.
    Auth.createUser(user);
  }));
/*
  // TODO Once server processes are created, this should check that the login was successful.
  it('should return a promise object for login', function (done) {
    var output = Auth.login(user);
    expect(typeof output).toEqual('object');
  });

  it('should set User to {} after logout', function (done) {
    Auth.login(user)
      .then(function() {
        var currentUser = User.get();
        expect(Object.keys(currentUser).length).toEqual(0);
      });
  });

  // TODO Once server processes are created, this should check that the user was created.
  it('should return a promise object for createUser', function (done) {
    var testUser = {
      email: 'test2@test.com',
      password: 'test',
      accountType: 'client'
    };
    var output = Auth.createUser(testUser);
    expect(typeof output).toEqual('object');
  });

  // TODO Once server processes are created, this should check that the password was changed.
  it('should return a promise object for changePassword', function (done) {
    var output = Auth.changePassword('test', 'test2');
    expect(typeof output).toEqual('object');
  });

  // TODO Once server processes are created, this should check the created user email against the test user defined above.
  it('should return a user object of the current user', function (done) {
    var output = Auth.getCurrentUser(user);
    expect(output.email).toEqual(user.email);
  });

  it('should return false if current user is not admin', function (done) {
    var output = Auth.isAdmin();
    expect(output).toEqual(false);
  });

  it('should return true if user is logged in', function (done) {
    var output = Auth.isLoggedIn();
    expect(output).toEqual(true);
  });
*/
});
