'use strict';

angular.module('badgerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('workerdashboard', {
        url: '/workerdashboard',
        templateUrl: 'app/workerdashboard/workerdashboard.html',
        controller: 'WorkerdashboardCtrl'
      });
  });