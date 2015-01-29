exports.getClientConfig = function(req, res, next) {
  return res.json(200, {
    awsConfig: {
      bucket: process.env.BUCKET
    }
  });
};
