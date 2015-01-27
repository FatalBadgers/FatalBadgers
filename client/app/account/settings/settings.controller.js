'use strict';

angular.module('badgerApp')
  .controller('SettingsCtrl', function($scope, User, Auth) {

    // ************************************************************************************
    // TODO: This section is for testing only, delete this before deployment.
    var exampleClient = {
      name: 'Test Client',
      location: 'Test, IS',
      email: 'test@test.com',
      password: 'test',
      accountType: 'Client'
    };
    var exampleWorker = {
      name: 'Test Worker',
      location: 'Test, IS',
      email: 'test@test.com',
      password: 'test',
      accountType: 'Worker',
      skills: "I'm a lumberjack.",
      rate: 500,
      advert: "I'm okay. I sleep all night and I work all day."
    };
    // Once user creation is supported, we can test with the following line:
    // Auth.createUser(exampleWorker);
    $scope.user = exampleWorker;
    // Test section ends here.
    // ************************************************************************************

    $scope.errors = {};
    $scope.minPasswordLength = 3;
    $scope.isWorker = ($scope.user.accountType === 'Worker');

    $scope.updateProfile = function(form) {
      if (form.$valid) {
        var updates = {
          name: $scope.user.name,
          location: $scope.user.location,
          email: $scope.user.email,
          accountType: $scope.user.accountType,
          skills: $scope.user.skills,
          rate: $scope.user.rate,
          advert: $scope.user.advert
        };
        Auth.editProfile(updates)
          .then(function() {
            $scope.message = 'Profile successfully updated.'
          })
          .catch(function() {
            $scope.message = 'Error updating profile. Please try again later.';
          });
      }
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function() {
            $scope.message = 'Password successfully changed.';
          })
          .catch(function() {
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };

  });