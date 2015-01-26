'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('badgerApp'));

  var SignupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
    });
  }));

  it('should default to account type client', function ($scope) {
    console.log($scope);
    expect($scope.user.accountType).toEqual('Client');
  });

  it('should display an error if email is left blank', function ($scope) {
    $scope.register();
    expect($('.help-block')).toEqual(true);
  });
  
});
