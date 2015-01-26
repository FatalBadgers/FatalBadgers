'use strict';

angular.module('badgerApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.accountOptions = [ 'Client', 'Worker' ];
    $scope.user.accountType = $scope.accountOptions[0];

    $scope.workerQuestions = [
    	{ field: 'skills', text: 'What are your skills/professions?' },
    	{ field: 'rate', text: 'What is your hourly rate?' },
    	{ field: 'advert', text: 'Anything else you would like to say about your work?' }
    ];

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
      	var newUser = {
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          accountType: $scope.user.accountType
        };

        // Add worker data if user is creating a worker account.
        if ($scope.user.accountType === 'Worker') {
        	newUser.skills = $('#skills'),
        	newUser.rate = $('#rate'),
        	newUser.advert = $('#advert')
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
