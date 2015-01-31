'use strict';

describe('Controller: WorkerdashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('badgerApp'));

  var WorkerdashboardCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkerdashboardCtrl = $controller('WorkerdashboardCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
