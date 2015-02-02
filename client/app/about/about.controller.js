'use strict';

angular.module('badgerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.team = [
      { 
        name:'Yan Fan',
        title:'Product Owner',
        hometown: 'Seattle, WA',
        github:'https://github.com/yanarchy',
        pic:'https://avatars2.githubusercontent.com/u/8541019?v=3&s=460'
      },{
        name:'Kevin Primat',
        title:'Scrum Master',
        hometown: '',
        github:'https://github.com/kxprim',
        pic:'https://avatars0.githubusercontent.com/u/8763439?v=3&s=460'
      },{
        name:'Tim Martin',
        title:'Lead Architect',
        hometown: 'Seattle, WA',
        github:'https://github.com/tmartin1',
        pic:'https://avatars2.githubusercontent.com/u/8376678?v=3&s=460'
      },{
        name:'Scott Rice',
        title:'Build Master',
        hometown: 'St. Louis, MO',
        github:'https://github.com/scottrice10',
        pic:'https://avatars1.githubusercontent.com/u/3627116?v=3&s=460'
      }
    ];

  });
