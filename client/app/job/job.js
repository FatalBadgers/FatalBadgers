'use strict';

angular.module('badgerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view-job', {
        url: '/view-job',
        templateUrl: 'app/job/view/view.html',
        controller: 'ViewCtrl'
      })
      .state('edit-job', {
        url: '/edit-job',
        templateUrl: 'route/job/edit/edit.html',
        controller: 'EditCtrl'
      });
  });