'use strict';

describe('Controller: ViewCtrl', function () {

  // load the controller's module
  beforeEach(module('badgerApp'));

  var ViewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewCtrl = $controller('ViewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
