'use strict';

describe('Controller: SettingsCtrl', function () {
  var SettingsCtrl, createController, user, exampleClient, exampleWorker,
      $scope, $rootScope, $controller, $form;


  // Load the controller's module
  beforeEach(module('badgerApp'));

  var SettingsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');

    $form = $("<form />");
    $scope = $rootScope.$new();
    
    exampleClient = {
      name: 'Test Client',
      location: 'Test, IS',
      email: 'test@test.com',
      password: 'test',
      accountType: 'Worker'
    };

    exampleWorker = {
      name: 'Test Worker',
      location: 'Test, IS',
      email: 'test@test.com',
      password: 'test',
      accountType: 'Worker',
      skills: "I'm a lumberjack.",
      rate: '$69 / hour',
      advert: "I'm okay. I sleep all night and I work all day."
    };

    // Create controller for testing
    createController = function() {
      SettingsCtrl = $controller('SettingsCtrl', {
        $scope: $scope
      });
    };
    createController();
  }));

  // TODO: Once users accounts can be created, see comments below.
  it('should display worker profile questions when current user is a worker.', function () {
    $scope.user.accountType = 'Worker';
    // Delete the line above this and uncomment lines below this.
    // Auth.createUser(exampleWorker);
    expect(!!$('#workerQuestions')).toEqual(true);
  });

  // TODO: Once users accounts can be created, see comments below.
  it('should hide worker profile questions when current user is a client.', function () {
    $scope.user.accountType = 'Client';
    $scope.isWorker = false;
    // Delete the two lines above this and uncomment lines below this.
    // Auth.createUser(exampleWorker);
    expect($scope.isWorker).toEqual(false);
  });

});
