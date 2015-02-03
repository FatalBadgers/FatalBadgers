'use strict';

angular.module('badgerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('view-contract', {
        url: '/view-contract',
        templateUrl: 'app/job/view/view.html',
        controller: 'ViewCtrl'
      })
      .state('edit-contract', {
        url: '/edit-contract',
        templateUrl: 'route/job/edit/edit.html',
        controller: 'EditCtrl'
      })
      .state('create-contract', {
        url: '/create-contract',
        templateUrl: 'route/job/create/create.html',
        controller: 'CreateCtrl'
      });
  });