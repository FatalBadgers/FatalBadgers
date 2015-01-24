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

        // TODO $hppt.post path will need to be created on the sever side, or changed to the correct path here once defined server side.
        $http.post('/auth/local', {
          email: user.email,
          password: user.password,
          accountType: user.accountType
        }).
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

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      // Changes a user's password.
      // Returns a {Promise}.
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      // Gets all available info on authenticated user
      // Returns a user {Object}
      getCurrentUser: function() {
        return currentUser;
      },

      // Check if a user is logged in.
      // Returns a boolean.
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      // Waits for currentUser to resolve before checking if user is logged in
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      // Checks if a user is an admin.
      // Returns a boolean.
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      // Gets auth token.
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
