'use strict';

angular.module('badgerApp')
  .controller('CreateCtrl', function ($scope, Contract, $state) {
  	$scope.job = {};
  	$scope.errors = {};
  	$scope.create = function(form) {

  		if(form.$valid) {
  			var newJob = {
  				title: $scope.job.title,
          'hourly_rate': $scope.job.hourly_rate,
          summary: $scope.job.summary,
          'skills_needed': $scope.job.skills_needed,
          status: 'open',
          'img_url': $scope.job.img_url
  			};


  			Contract.createJob(newJob)
  				.then(function() {
  					$state.go('dashboard');
  				})
  				.catch(function(err) {
  					$scope.errors.other = err.message;
  				})
  		}
  	}

 	});