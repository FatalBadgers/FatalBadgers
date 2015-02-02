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
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    //$urlRouterProvider
    //  .otherwise('/');

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');

    $locationProvider.html5Mode(true);
  })

  .factory('AttachTokens', function($cookieStore) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function(object) {
        var cookie = $cookieStore.get('token');
        if(cookie) {
          object.headers['x-access-token'] = cookie;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })

  .run(function($rootScope, $state, $location, $http, Auth) {

    //attach aws config info to $rootscope
    $http.get('/api/config').success(function(config) {
      $rootScope.config = config;
    });

    // here inside the run phase of angular, our services and controllers
    // have just been registered and our app is ready
    // however, we want to make sure the user is authorized
    // we listen for when angular is trying to change routes
    // when it does change routes, we then look for the token in localstorage
    // and send that token to the server to see if it is a real user or hasn't expired
    // if it's not valid, we then redirect back to signin/signup
    $rootScope.$on('$stateChangeStart', function(evt, next, current) {
      var allowedPaths = ['/signup', '/login', '/about', '/'];
      if(next.name && allowedPaths.indexOf($location.path()) === -1 && !Auth.isAuth()) {
        $state.go('main');
      }
    });
  });
