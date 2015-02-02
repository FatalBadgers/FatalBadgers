'use strict';

angular.module('badgerApp')
  .controller('ProfileCtrl', function($scope, Auth) {
    Auth.getCurrentUser().then(function(user){
      $scope.viewee = user;
      $scope.isWorker = ($scope.viewee.account_type === 'Worker');
    });
  });
