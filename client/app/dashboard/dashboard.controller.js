'use strict';

angular.module('badgerApp')
  .controller('DashboardCtrl', function($scope, Auth) {

    Auth.getCurrentUser().then(function(user) {
      $scope.currentUser = user;
      $scope.commonLinks = links[$scope.currentUser.account_type];
    });

    var links = {
      // Link and text to display for clients.
      Client: [{
        title: 'Create A Contract',
        href: '/create-contract'
      }, {
        title: 'Ended Contracts',
        href: '/end-contract'
      }, {
        title: 'Manage Contracts',
        href: '/manage-contracts'
      }, {
        title: 'Search Workers',
        href: '/worker/search'
      }],

      // Link and text to display for workers.
      Worker: [{
        title: 'Current Contracts',
        href: '/current-contracts'
      }, {
        title: 'Past Contracts',
        href: '/past-contracts'
      }, {
        title: 'Applications',
        href: '/applications'
      }, {
        title: 'Search Contracts',
        href: '/contract/search'
      }]
    };

  });
