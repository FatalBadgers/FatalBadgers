'use strict';

angular.module('badgerApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

  	$scope.accountOptions = [
  		// The key is what the server will be expecting to define user account type.
  		// The value is what text will be displayed on the login screen.
  		{ value: 'client', text: "I need to find skilled workers." },
  		{ value: 'worker', text: "I have skills and I'm looking for work." }
  	];

  	// Sets default value for account type to first value in accountOptions.
  	$scope.user.accountType = $scope.accountOptions[0].text;

  	// 
    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
      	// The Auth factory is located in the client/components/auth directory and handles client-side authentication.
      	// Auth.login takes a user object as a parameter and returns a promise.
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password,
          accountType: $scope.user.accountType
        })
        .then( function() {
          // If login is successful, then redirect to main page.
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
