'use strict';

angular.module('badgerApp')
  .controller('DashboardCtrl', function ($scope, Auth) {
    $scope.currentUser = Auth.getCurrentUser();
  });
