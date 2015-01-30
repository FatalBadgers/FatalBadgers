'use strict';

angular.module('badgerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'angularFileUpload',
  'ui.bootstrap',
  'ui.select'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })

  //attach aws config info to $rootscope
  .run(function ($rootScope, $location, $http) {

    $http.get('/api/config').success(function(config) {
      $rootScope.config = config;
    });
  });
