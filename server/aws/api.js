'use strict';
var config = require('./aws.json');

exports.getClientConfig = function(req, res, next) {
  return res.json(200, {
    awsConfig: {
      bucket: config.bucket
    }
  });
};
