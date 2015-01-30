'use strict';

angular.module('badgerApp')
  // Set currentUser to an empty object and then they check if there is a cookie named (?) 'token'.
  // If it is then they call the User service method get, this should return a currentUser object.
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {
      // Authenticates user and saves token.
      // Returns a {Promise}.
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        User.login(user).
          success(function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            deferred.resolve(data);
            return cb();
          }).
          error(function(err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
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
          $cookieStore.put('token', data.token);
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
      }
    };
  });
