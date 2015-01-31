'use strict';

angular.module('badgerApp')
  .controller('ProfileCtrl', function($scope, Auth) {
    $scope.viewee = Auth.getCurrentUser();

    $scope.isWorker = ($scope.viewee.account_type === 'Worker');
    $scope.viewee.profilePic = $scope.viewee.img_url;

  });
