'use strict';

describe('Controller: SignupCtrl', function () {
  var SignupCtrl, createController, $scope, $rootScope, $controller, $form;

  // Load the controller's module
  beforeEach(module('badgerApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');

    $form = $("<form />");
    $scope = $rootScope.$new();

    createController = function() {
      SignupCtrl = $controller('SignupCtrl', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should default to account type client', function () {
    expect($scope.user.accountType).toEqual('Client');
  });

  it('should display an error if email is left blank', function () {
    $form.trigger("submit");
    expect(!!$('.help-block')).toEqual(true);
  });

});
