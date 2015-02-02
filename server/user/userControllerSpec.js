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