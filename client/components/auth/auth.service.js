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
      login: function(user) {
        return User.login(user, function(data) {
          $cookieStore.put('token', data);
          currentUser = data;
          return user;
        }).$promise;
      },

      // Delete access token and user info.
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      // Creates a new user.
      // Returns a {Promise}.
      createUser: function(user) {
        return User.signup(user, function(data) {
          $cookieStore.put('token', data);
          currentUser = data;
          return user;
        }).$promise;
      },

      // Changes a user's password.
      // Returns a {Promise}.
      changePassword: function(oldPassword, newPassword) {
        return User.editProfile({id: currentUser.id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }).$promise;
      },

      // Changes a user's profile fields (except password).
      // Returns a {Promise}.
      editProfile: function(userObject) {
        return User.editProfile(userObject, function(user) {
          return user;
        }).$promise;
      },

      isAuth: function() {
        return !!$cookieStore.get('token');
      },

      getCurrentUser: function(callback){
        return User.getUser({email: currentUser.email, accountType: currentUser.account_type}, function(user){
          return user;
        }).$promise;
      },

      getImages: function(){
        return currentUser.img_url;
      },

      setImages: function(imageUrls){
        currentUser.img_url = imageUrls[0];
      }
    }
  });
