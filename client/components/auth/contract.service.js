'use strict';

angular.module('badgerApp')
  .factory('Contract', function($resource) {
    // $resource creates a resource object that lets you interact with RESTful server-side data sources.
    return $resource('/api/contract/:controller', {
        accountType: '@accountType'
      },

      {
        createJob: {
          method: 'POST',
          params: {
            controller: 'createJob',
            id: null,
            title: null,
            'hourly_rate': null,
            summary: null,
            'skills_needed': null,
            status: null,
            'img_url': null
          }
        },

        editJob: {
          method: 'POST',
          params: {
            controller: 'editJob',
            id: null,
            title: null,
            'hourly_rate': null,
            summary: null,
            'skills_needed': null,
            status: null,
            'img_url': null
          }
        },

        endJob: {
          method: 'POST',
          params: {
            controller: 'endJob',
            id: null,
            title: null,
            status: 'complete'
          }
        },

        getHistory: {
          method: 'GET',
          params: {
            controller: 'getHistory'
          }
        },

        getContracts: {
          method: 'GET',
          params: {
            controller: 'getContracts'
          }
        }
      });
  });