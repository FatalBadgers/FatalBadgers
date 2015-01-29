//handle error if aws.json does not exist
try {
  config = require('./aws/aws.json')
}
catch(e) {
  console.log('aws.json not found');
}

exports.getClientConfig = function(req, res, next) {
  return res.json(200, {
    awsConfig: {
      bucket: process.env.BUCKET || config.bucket
    }
  });
};
