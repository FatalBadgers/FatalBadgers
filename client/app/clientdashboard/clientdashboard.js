'use strict';

angular.module('badgerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('clientdashboard', {
        url: '/clientdashboard',
        templateUrl: 'app/clientdashboard/clientdashboard.html',
        controller: 'ClientdashboardCtrl'
      });
  });