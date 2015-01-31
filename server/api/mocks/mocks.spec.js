var should = require('should');
var app = require('../../../server');
var request = require('supertest');

describe('GET /api/mocks', function() {

  it('should respond with JSON array for workers', function(done) {
    request(app)
      .get('/api/mocks/workers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array for clients', function(done) {
    request(app)
      .get('/api/mocks/clients')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array for worker reviews', function(done) {
    request(app)
      .get('/api/mocks/worker-reviews')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array for client reviews', function(done) {
    request(app)
      .get('/api/mocks/client-reviews')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array for jobs', function(done) {
    request(app)
      .get('/api/mocks/jobs')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with JSON array for workers_open_jobs', function(done) {
    request(app)
      .get('/api/mocks/workers-open-jobs')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });


 it('should respond with JSON array for history', function(done) {
  request(app)
    .get('/api/mocks/jobs')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.be.instanceof(Array);
      done();
    });
  });


 
});
