'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('badgerApp'));

  var LoginCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    LoginCtrl = $controller('LoginCtrl', {
      $scope: $rootScope.$new()
    });
    user = {
      email: 'test@test.com',
      password: 'test',
      accountType: 'client'
    };
    // TODO Once server auth processes are complete, this should create the test user.
    // TODO most subsequent tests depend on successful server communication.
    Auth.createUser(user);
  }));

  // button[0] is login.
  // button[1] is sign up.
  // form-control[0] is email input.
  // form-control[1] is password input.
  // form-control[2] is account type selector.
  // .help-block[0] is error for empty email.
  // .help-block[1] is error for valid email.
  it('should display error if email is blank', function () {
    element(':button')[0].click();
    expect(element('.help-block')[0].hasClass('ng-show')).toBe(true);
    expect(element('.help-block')[1].hasClass('ng-show')).toBe(false);
  });

  it('should display error if email is not in email format [*]@[*].[*]', function () {
    using('.form')[0].input('.form-control')[0].enter('notanemail');
    element(':button')[0].click();
    expect(element('.help-block')[0].hasClass('ng-show')).toBe(true);
    expect(element('.help-block')[1].hasClass('ng-show')).toBe(false);
  });

  it('should not login if password is incorrect', function () {
    using('.form')[0].input('.form-control')[0].enter('test@test.com');
    element(':button')[0].click();
    expect(window.location).toEqual(window.location.href = "/login";);
  });

  it('should redirect to home screen upon successful login', function () {
    using('.form')[0].input('.form-control')[0].enter('test@test.com');
    element(':button')[0].click();
    expect(window.location).toEqual(window.location.href = "/";);
  });
});
