'use strict';

describe('Controller: LoginCtrl', function () {
  var LoginCtrl, createController, user, $scope, $rootScope, $controller, $form;

  // Load the controller's module
  beforeEach(module('badgerApp'));


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');

    $form = $("<form />");
    $scope = $rootScope.$new();

    // TODO Once server auth processes are complete, this should create the test user.
    // TODO most subsequent tests depend on successful server communication.
    // Auth.createUser(user);
    // user = {
    //   email: 'test@test.com',
    //   password: 'test',
    //   accountType: 'client'
    // };

    var fakeWindow = {
      location: {
        href: ''
      }
    };

    // Create controller for testing
    createController = function() {
      LoginCtrl = $controller('LoginCtrl', {
        $scope: $scope,
        $window: fakeWindow
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

  it('should display error if email is blank', function () {
    $scope.user['email'] = '';
    $form.trigger("submit");
    expect(!!$('.help-block')).toEqual(true);
  });

  it('should display error if email is not in email format [*]@[*].[*]', function () {
    $scope.user['email'] = 'test';
    $form.trigger("submit");
    expect(!!$('.help-block')).toEqual(true);
  });

  it('should not login if password is incorrect', function () {
    $scope.user['email'] = 'test@test.com';
    $scope.user['password'] = 'wrongpassword';
    $form.trigger("submit");
    expect(!!$('.help-block')).toEqual(true);
  });

  // TODO: Once the server supports loggin in, should test successful login.
  // it('should redirect to home screen upon successful login', function () {
  //   using('.form')[0].input('.form-control')[0].enter('test@test.com');
  //   element(':button')[0].click();
  //   expect(window.location).toEqual(window.location.href = "/";);
  // });
});
