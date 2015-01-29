'use strict';

describe('Controller: ProfileCtrl', function() {
  var ProfileCtrl, createController, user, exampleClient, exampleWorker,
    $scope, $rootScope, $controller;

  // load the controller's module
  beforeEach(module('badgerApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $scope = $rootScope.$new();

    exampleClient = {
      name: 'Test Client',
      location: 'Test, IS',
      email: 'test@test.com',
      accountType: 'Client',
      rating: '★★★☆☆',
      history: [{
        title: 'My Exmple Project 1',
        summary: 'This is an example project where things were done and stuff.',
        stars: '★★★☆☆',
        review: 'Ok. Client kept changing scope of project, but eventually settled on something.',
        worker: 'Test Worker'
      }, {
        title: 'My Exmple Project 2',
        summary: 'This is another, different, example project where different things were done and stuff.',
        stars: '★★★★★',
        review: 'OMG Totes like the best client evr.',
        worker: 'Worker Test'
      }, {
        title: 'My Exmple Project 3',
        summary: 'This is a third, even more different, example project where different things were done and stuff.',
        stars: '★☆☆☆☆',
        review: 'Booooooooooooooooooooooooooooooooooo.',
        worker: 'Third Worker'
      }],
    };

    exampleWorker = {
      name: 'Test Worker',
      location: 'Test, IS',
      email: 'test@test.com',
      accountType: 'Worker',
      skills: "I'm a lumberjack.",
      rate: 500,
      advert: "I'm okay. I sleep all night and I work all day.",
      rating: '★★★★☆',
      history: [{
        title: 'Exmple Project 1',
        summary: 'This is an example project where things were done and stuff.',
        stars: '★★★★☆',
        review: 'Good work for a good price.',
        client: 'Test Client'
      }, {
        title: 'Exmple Project 2',
        summary: 'This is another, different, example project where different things were done and stuff.',
        stars: '★★★★★',
        review: 'OMG Totes like the best evr.',
        client: 'Client Test'
      }, {
        title: 'Exmple Project 3',
        summary: 'This is a third, even more different, example project where different things were done and stuff.',
        stars: '★★★★☆',
        review: 'So good.',
        worker: 'Third Client'
      }]
    };

    // Create controller for testing
    createController = function() {
      ProfileCtrl = $controller('ProfileCtrl', {
        $scope: $scope
      });
    };
    createController();

  }));

  it('should display location, contact, and rating field if viewing a worker profile.', function() {
    $scope.viewee = exampleWorker;
    // TODO: Delete the line above this and uncomment lines below this.
    // Auth.createUser(exampleWorker);
    // Auth.login(exampleWorker);
    expect($scope.viewee).toEqual(exampleWorker);
    // TODO: Add tests to make sure DOM elements are the correct value.
  });

  it('should display skills, rate, and advert field if viewing a worker profile.', function() {
    $scope.viewee = exampleWorker;
    // TODO: Delete the line above this and uncomment lines below this.
    // Auth.createUser(exampleWorker);
    // Auth.login(exampleWorker);
    expect($scope.viewee).toEqual(exampleWorker);
    // TODO: Add tests to make sure DOM elements are the correct value.
  });

  it('should display location, contact, and rating field if viewing a client profile.', function() {
    $scope.viewee = exampleClient;
    // TODO: Delete the line above this and uncomment lines below this.
    // Auth.createUser(exampleClient);
    // Auth.login(exampleClient);
    expect($scope.viewee).toEqual(exampleClient);
    // TODO: Add tests to make sure DOM elements are the correct value.
  });

  it('should not display skills, rate, and advert field if viewing a client profile.', function() {
    $scope.viewee = exampleClient;
    // TODO: Delete the line above this and uncomment lines below this.
    // Auth.createUser(exampleClient);
    // Auth.login(exampleClient);
    expect($scope.viewee).toEqual(exampleClient);
    // TODO: Add tests to make sure DOM elements are the correct value.
  });

});
