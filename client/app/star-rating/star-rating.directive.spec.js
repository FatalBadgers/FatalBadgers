'use strict';

describe('Directive: starRating', function () {

  // load the directive's module and view
  beforeEach(module('badgerApp'));
  beforeEach(module('ihammer.templates'));

  var element, $httpBackend, $rootScope, $compile;

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');

    $httpBackend.whenGET('/api/config').respond({
      awsConfig: {
        bucket: 'ihammer-dev'
      }
    });

    $rootScope.rating = 3;
    element = $compile('<div star-rating rating-value="rating" max="5"></div>')($rootScope);
    $rootScope.$digest();
  }));

  it('should display correct ratingValue and max based on html attributes', inject(function () {
    expect($rootScope.$$childTail.max).toBe(5);
    expect($rootScope.$$childTail.ratingValue).toBe(3);
  }));

  it('should display correct number of stars based on html attributes', inject(function () {
    expect($rootScope.$$childTail.stars.length).toBe(5);
  }));
});
