describe('Directive: photoupload', function() {

  // load the controller's module
  beforeEach(module('badgerApp'));
  beforeEach(module('ihammer.templates'));
  var $httpBackend;
  var $rootScope;
  var $compile;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.whenGET('/api/config').respond({
      awsConfig: {
        bucket: 'ihammer-dev'
      }
    });
    $httpBackend.flush();

    // Compile a piece of HTML containing the directive
    $compile("<photoupload></photoupload>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();

  }));

  afterEach(function() {
  });

//   it('should get Policy for one file', function() {
//     var file = new Blob(['<content>'], {
//       type: 'image/jpeg'
//     });
//     file.name = 'abc.jpeg';
//     var files = [file];
//     $httpBackend.whenGET('/api/s3Policy?mimeType=' + files[0].type)
//       .respond({
//         s3Policy: 'base64Policy',
//         s3Signature: 'signature',
//         AWSAccessKeyId: 'config.accessKeyId'
//       });

//     $rootScope.onFileSelect(files);

//     $httpBackend.whenPOST('https://ihammer-dev.s3.amazonaws.com/')
//       .respond(201,
//       '<?xml version="1.0" encoding="UTF-8"?>' +
//       '<PostResponse>' +
//       '<Location>https://ihammer-dev.s3.amazonaws.com/clubs%2Fimages%2Fpic+copy+3.jpg</Location>' +
//       '<Bucket>ihammer-dev</Bucket>' +
//       '<Key>clubs/images/pic copy 3.jpg</Key>' +
//       '<ETag>"971d696d8ef20fbe43387c817f83dc52"</ETag>' +
//       '</PostResponse>'
//     );
//     $httpBackend.flush();
//   });

});
