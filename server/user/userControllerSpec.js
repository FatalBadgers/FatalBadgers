// Here lies the tests for userController

'use strict';

var expect = require('chai').expect;
var request = require('request');
var express = require('express');
var User = require('./userController.js');


describe('Controller: UserCtrl', function () {
  beforeEach(function(){
    // Expire any active token
    // Delete cookies
  });

  it('Should should not allow an unidentifed user reach a privileged page', function(){
    // checkAuth Test
  });

  it('Should add a new user to database', function(){
    // Signup Test
  });


  it('It should give access to restricted pages', function(){
    // Login Test
  });
});


// --- Example ---
// describe('Link creation: ', function() {

//     it('Only shortens valid urls, returning a 404 - Not found for invalid urls', function(done) {
//       request(app)
//         .post('/links')
//         .send({
//           'url': 'definitely not a valid url'})
//         .expect(404)
//         .end(done);
//     });

//     describe('Shortening links:', function() {

//       it('Responds with the short code', function(done) {
//         request(app)
//           .post('/links')
//           .send({
//             'url': 'http://www.roflzoo.com/'})
//           .expect(200)
//           .expect(function(res) {
//             expect(res.body.url).to.equal('http://www.roflzoo.com/');
//             expect(res.body.code).to.be.ok;
//           })
//           .end(done);
//       });

//       it('New links create a database entry', function(done) {
//         request(app)
//           .post('/links')
//           .send({
//             'url': 'http://www.roflzoo.com/'})
//           .expect(200)
//           .expect(function(res) {
//             Link.findOne({'url' : 'http://www.roflzoo.com/'})
//               .exec(function(err,link){
//                 if(err) console.log(err);
//                 expect(link.url).to.equal('http://www.roflzoo.com/');
//               });
//           })
//           .end(done);
//       });

//       it('Fetches the link url title', function(done) {
//         request(app)
//           .post('/links')
//           .send({
//             'url': 'http://www.roflzoo.com/'})
//           .expect(200)
//           .expect(function(res) {
//             Link.findOne({'url' : 'http://www.roflzoo.com/'})
//               .exec(function(err,link){
//                 if(err) console.log(err);
//                 expect(link.title).to.equal('Rofl Zoo - Daily funny animal pictures');
//               });
//           })
//           .end(done);
//       });

//     }); // 'Shortening Links'
