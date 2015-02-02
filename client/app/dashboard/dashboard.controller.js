'use strict';

angular.module('badgerApp')
  .controller('DashboardCtrl', function($scope, Auth) {
    Auth.getCurrentUser().then(function(user) {
      $scope.currentUser = user;
    });
  });
