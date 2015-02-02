describe('Directive: starRating', function () {

  //load the directive's module and view
  beforeEach(module('badgerApp'));

  var $httpBackend, $rootScope, $compile;

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');

    $httpBackend.whenGET('/api/config').respond({
      awsConfig: {
        bucket: 'ihammer-dev'
      }
    });
    // check that http requests are getting handled correctly
    $httpBackend.whenGET('/api/config').respond(200);
    $httpBackend.whenGET('app/main/main.html').respond(200);
    $httpBackend.whenPOST('/api/user/getuser').respond(302);

    $httpBackend.flush();

    $rootScope.rating = 3;
    $compile('<div star-rating rating-value="rating" max="5"></div>')($rootScope);
    $rootScope.$digest();
  }));

  afterEach(function() {
  });

  it('should display correct ratingValue and max based on html attributes', inject(function () {

    expect($rootScope.$$childTail.max).toBe(5);
    expect($rootScope.$$childTail.ratingValue).toBe(3);
  }));

  it('should display correct number of stars based on html attributes', inject(function () {

    expect($rootScope.$$childTail.stars.length).toBe(5);
  }));
});
