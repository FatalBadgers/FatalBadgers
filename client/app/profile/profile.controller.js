'use strict';

angular.module('badgerApp')
  .controller('ProfileCtrl', function($scope, User) {
    // Delete the following once server is setup.
    var exampleClient = {
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
    var exampleWorker = {
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
    // TODO: Once serve is setup, fetch user from database and delete above.
    // $scope.viewee = exampleWorker;
    $scope.viewee = exampleClient;

    $scope.isWorker = ($scope.viewee.accountType === 'Worker');
    $scope.viewee.profilePic = $scope.viewee.profilePic || '/../../assets/images/default.png'

  });
