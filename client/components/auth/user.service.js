'use strict';

angular.module('badgerApp')
  .factory('User', function($resource) {
    // $resource creates a resource object that lets you interact with RESTful server-side data sources.
    return $resource('/api/user/:controller', {
        accountType: '@accountType',
        email: '@email'
      },
      {
        editProfile: {
          method: 'POST',
          params: {
            controller: 'editprofile'
          }
        },
        signup: {
          method: 'POST',
          params: {
            controller: 'signup',
            password: null,
            name: null,
            'hourly_rate': null,
            'img_url': null,
            'summary': null,
            skills: null
          }
        },
        login: {
          method: 'POST',
          params: {
            controller: 'signin',
            password: null
          }
        },
        getuser: {
          method: 'POST',
          params: {
            controller: 'getuser'
          }
        }
      });
  });
