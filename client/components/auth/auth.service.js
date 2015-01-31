'use strict';

angular.module('badgerApp')
  // Set currentUser to an empty object and then they check if there is a cookie named (?) 'token'.
  // If it is then they call the User service method get, this should return a currentUser object.
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = $cookieStore.get('token');
    }

    return {
      // Authenticates user and saves token.
      // Returns a {Promise}.
      login: function(user, callback) {
        var cb = callback || angular.noop;
        return User.login(user, function(data) {
          $cookieStore.put('token', data);
          currentUser = data;
          return cb(user);
        }, function(err) {
          this.logout();
          return cb(err);
        }.bind(this)).$promise;
      },

      // Delete access token and user info.
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      // Creates a new user.
      // Returns a {Promise}.
      createUser: function(user, callback) {
        var cb = callback || angular.noop;
        return User.signup(user, function(data) {
          $cookieStore.put('token', data);
          currentUser = data;
          return cb(user);
        }, function(err) {
          this.logout();
          return cb(err);
        }.bind(this)).$promise;
      },

      // Changes a user's password.
      // Returns a {Promise}.
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        return User.editProfile({id: currentUser.id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      // Changes a user's profile fields (except password).
      // Returns a {Promise}.
      editProfile: function(userObject, callback) {
        var cb = callback || angular.noop;
        return User.editProfile(userObject, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      isAuth: function() {
        return !!$cookieStore.get('token');
      },

      getCurrentUser: function(){
        return currentUser;
      }
    }
  });
