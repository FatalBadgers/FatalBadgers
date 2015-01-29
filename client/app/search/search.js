'use strict';

angular.module('badgerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('worker-search', {
        url: '/worker/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      })
      .state('contract-search', {
        url: '/contract/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });
