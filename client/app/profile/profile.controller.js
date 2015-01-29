'use strict';

angular.module('badgerApp')
  .controller('ProfileCtrl', function($scope) {
    // Delete the following once server is setup.
    var exampleClient = {
      name: 'Test Client',
      location: 'Test, IS',
      email: 'test@test.com',
      accountType: 'Client'
    };
    var exampleWorker = {
      name: 'Test Worker',
      location: 'Test, IS',
      email: 'test@test.com',
      accountType: 'Worker',
      skills: "I'm a lumberjack.",
      rate: 500,
      rating: 4.5,
      history: [{
        title: 'Exmple Project 1',
        summary: 'This is an example project where things were done and stuff.',
        stars: 4,
        review: 'Good work for a good price.',
        client: 'Test Client'
      }, {
        title: 'Exmple Project 2',
        summary: 'This is another, different, example project where different things were done and stuff.',
        stars: 5,
        review: 'OMG Totes like the best evr.',
        client: 'Client Test'
      }, ],
      advert: "I'm okay. I sleep all night and I work all day."
    };
    // TODO: Once serve is setup, fetch user from database and delete above.
    $scope.viewee = exampleWorker;

    $scope.viewee.profilePic = $scope.viewee.profilePic || '/../../assets/images/default.png'

  });