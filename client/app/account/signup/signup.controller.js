'use strict';

angular.module('badgerApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.minPasswordLength = 3;

    $scope.accountOptions = [ 'Client', 'Worker' ];
    $scope.user.accountType = $scope.accountOptions[0];

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        var newUser = {
          name: $scope.user.name,
          location: $scope.user.location,
          email: $scope.user.email,
          password: $scope.user.password,
          accountType: $scope.user.accountType
        };

        // Add worker data if user is creating a worker account.
        if ($scope.user.accountType === 'Worker') {
          newUser.skills = $scope.user.skills;
          newUser.rate = $scope.user.rate;
          newUser.advert = $scope.user.advert;
        }

        Auth.createUser(newUser)
        .then( function() {
          // Account created, redirect to home.
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
