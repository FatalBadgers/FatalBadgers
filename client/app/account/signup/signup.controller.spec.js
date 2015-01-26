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

  it('should default to account type client', function () {
    expect($('.form-control')[3].value).toEqual('Client');
  });

  it('should display an error if email is left blank', function () {
    expect($('.help-block')).toEqual(true);
  });
  
});
