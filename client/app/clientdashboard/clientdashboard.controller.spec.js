'use strict';

describe('Controller: ClientdashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('badgerApp'));

  var ClientdashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientdashboardCtrl = $controller('ClientdashboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
