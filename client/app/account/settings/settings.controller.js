'use strict';

angular.module('badgerApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
  	// TODO: This section is for testing only, delete this before deployment.
  	var exampleClient = {
    	email: 'test@test.com',
      password: 'test',
      accountType: 'Worker'
    };
    var exampleWorker = {
    	email: 'test@test.com',
      password: 'test',
      accountType: 'Worker',
      skills: "I'm a lumberjack.",
      rate: '$69 / hour',
      advert: "I'm okay. I sleep all night and I work all day."
    };
    Auth.createUser(exampleWorker);
    console.log(Auth.getCurrentUser());
    $scope.user = exampleWorker;
    // Test section ends here.

    $scope.errors = {};
    $scope.minPasswordLength = 3;
    $scope.isWorker = ($scope.user.accountType === 'Worker');

    $scope.updateProfile = function(form) {
    	//
    };

    $scope.changePassword = function(form) {
    	console.log($scope.user);
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
