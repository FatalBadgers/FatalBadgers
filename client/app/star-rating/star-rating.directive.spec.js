'use strict';

describe('Directive: starRating', function () {

  // load the directive's module and view
  beforeEach(module('badgerApp'));
  beforeEach(module('app/star-rating/star-rating.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<star-rating></star-rating>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the starRating directive');
  }));
});