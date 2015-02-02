'use strict';

angular.module('badgerApp')
  .controller('LoginCtrl', function($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.accountOptions = ['Client', 'Worker'];

    // Sets default value for account type to first value in accountOptions.
    $scope.user.accountType = $scope.accountOptions[0];

    $scope.login = function(form) {
      console.log(form);
      $scope.submitted = true;

      if(form.$valid) {
        // The Auth factory is located in the client/components/auth directory and handles client-side authentication.
        // Auth.login takes a user object as a parameter and returns a promise.
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password,
          accountType: $scope.user.accountType
        })
          .then(function() {
            // If login is successful, then redirect to main page.
            $location.path('/dashboard');
          })
          .catch(function(err) {
            $scope.errors.other = err.message;
          });
      }
    };

  });
