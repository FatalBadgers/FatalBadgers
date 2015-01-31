'use strict';

angular.module('badgerApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      { 'title': 'Home', 'link': '/' },
      { 'title': 'Our Team', 'link': '/about' }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isAuth;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
