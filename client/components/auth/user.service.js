'use strict';

angular.module('badgerApp')
  .factory('User', function ($resource) {
    // $resource creates a resource object that lets you interact with RESTful server-side data sources.
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
      // TODO /:controller may need to be defined here. If undefined, the url will default to '/api/isers/:id/'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      // This will make a get request to /api/users/me in the /api/user/index.js (default file).
      // TODO if the server side filepath changes or is not /api/users/me, this (or it) will need updating.
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
