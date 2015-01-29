describe('Directive: photoupload', function() {

  // load the controller's module
  beforeEach(module('badgerApp'));
  beforeEach(module('app/photoupload/photoupload.html'));
  var $httpBackend;
  var $rootScope;
  var $compile;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.expectGET('/api/config').respond({
      awsConfig: {
        bucket: 'ihammer-dev'
      }
    });
    $httpBackend.flush();

    createDirective = function(){
      // Compile a piece of HTML containing the directive
      $compile("<photoupload></photoupload>")($rootScope);
      // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
      $rootScope.$digest();
    }

  }));

  afterEach(function() {
  });

  it('should get Policy for one file', function() {
    var file = new Blob(['<content>'], {
      type: 'image/jpeg'
    });
    file.name = 'abc.jpeg';
    var files = [file];

    createDirective();

    $httpBackend.expectGET('/api/s3Policy?mimeType=' + files[0].type)
      .respond({
        s3Policy: 'base64Policy',
        s3Signature: 'signature',
        AWSAccessKeyId: 'config.accessKeyId'
      });

    $rootScope.onFileSelect(files);

    $httpBackend.expectPOST('https://ihammer-dev.s3.amazonaws.com/')
      .respond(201,
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<PostResponse>' +
      '<Location>https://ihammer-dev.s3.amazonaws.com/clubs%2Fimages%2Fpic+copy+3.jpg</Location>' +
      '<Bucket>ihammer-dev</Bucket>' +
      '<Key>clubs/images/pic copy 3.jpg</Key>' +
      '<ETag>"971d696d8ef20fbe43387c817f83dc52"</ETag>' +
      '</PostResponse>'
    );
    $httpBackend.flush();
  });

  it('should get Policy for multiple files', function() {
    var file1 = new Blob(['<content>'], {
      type: 'image/jpeg'
    });
    file1.name = 'abc.jpeg';

    var file2 = new Blob(['<content>'], {
      type: 'image/bmp'
    });
    file2.name = 'xyz.bmp';

    var files = [file1, file2];

    createDirective();

    files.forEach(function(file) {
      $httpBackend.expectGET('/api/s3Policy?mimeType=' + file.type)
        .respond({
          s3Policy: 'base64Policy',
          s3Signature: 'signature',
          AWSAccessKeyId: 'config.accessKeyId'
        });
    });

    $rootScope.onFileSelect(files);

    files.forEach(function(file) {
      $httpBackend.expectPOST('https://ihammer-dev.s3.amazonaws.com/')
        .respond(201,
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<PostResponse>' +
        '<Location>https://ihammer-dev.s3.amazonaws.com/clubs%2Fimages%2Fpic+copy+3.jpg</Location>' +
        '<Bucket>ihammer-dev</Bucket>' +
        '<Key>clubs/images/' + file.name + '</Key>' +
        '<ETag>"971d696d8ef20fbe43387c817f83dc52"</ETag>' +
        '</PostResponse>');
    });

    $httpBackend.flush();
  });

  describe('Progress and Abort', function() {
    beforeEach(function() {
      var file1 = new Blob(['<content>'], {
        type: 'image/jpeg'
      });
      file1.name = 'abc.jpeg';

      var file2 = new Blob(['<content>'], {
        type: 'image/bmp'
      });
      file2.name = 'xyz.bmp';

      var files = [file1, file2];

      createDirective();

      files.forEach(function(file) {
        $httpBackend.expectGET('/api/s3Policy?mimeType=' + file.type)
          .respond({
            s3Policy: 'base64Policy',
            s3Signature: 'signature',
            AWSAccessKeyId: 'config.accessKeyId'
          });
      });

      $rootScope.onFileSelect(files);

      files.forEach(function(file) {
        $httpBackend.expectPOST('https://ihammer-dev.s3.amazonaws.com/')
          .respond(201,
          '<?xml version="1.0" encoding="UTF-8"?>' +
          '<PostResponse>' +
          '<Location>https://ihammer-dev.s3.amazonaws.com/clubs%2Fimages%2Fpic+copy+3.jpg</Location>' +
          '<Bucket>ihammer-dev</Bucket>' +
          '<Key>clubs/images/' + file.name + '</Key>' +
          '<ETag>"971d696d8ef20fbe43387c817f83dc52"</ETag>' +
          '</PostResponse>');
      });

    });
    it('should update the progress bar', function() {

      expect($rootScope.files[0].progress).toBe(0);
      expect($rootScope.files[1].progress).toBe(0);

      $httpBackend.flush();

      expect($rootScope.files[0].progress).toBe(100);
      expect($rootScope.files[1].progress).toBe(100);
    });

    it('should allow aborting existing downloads', function() {
      expect($rootScope.abort).toBeDefined();

      $httpBackend.flush();

      expect($rootScope.upload.length).toBe(2);
      expect($rootScope.upload[0].abort).toBeDefined();
      expect($rootScope.upload[1].abort).toBeDefined();
    });

  });

});
