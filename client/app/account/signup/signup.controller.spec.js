'use strict';

describe('Controller: SignupCtrl', function () {
  var SignupCtrl, createController, $scope, $rootScope, $controller, $form;

  // Load the controller's module
  beforeEach(module('badgerApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');

    $scope = $rootScope.$new();

    createController = function() {
      SignupCtrl = $controller('SignupCtrl', {
        $scope: $scope
      });
    };
  }));

  it('should default to account type client', function () {
    createController();
    expect($scope.user.accountType).toEqual('Client');
  });

  it('should display an error if email is left blank', function () {
    createController();
    $form = $("<form />");
    $form.trigger("submit");
    expect(!!$('.help-block')).toEqual(true);
  });
  
});
