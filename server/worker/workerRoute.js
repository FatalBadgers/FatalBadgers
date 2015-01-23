//this stores all of our express routes for workers

var express = require('express');
var workerController = require('./workerController');


//use express.Router() to create modular, mountable route handlers
//this way, we can go to ~~~.com/worker/profile, etc.

var router = express.Router();

router.get('/profile', function(req, res){
	//QUERY DATABASE FOR THE PROFILE OF THE WORKER

});

router.get('/editprofile', function(req, res){
	//QUERY DATABASE FOR THE PROFILE OF THE WORKER
})

router.get('/history', function(req, res){
	//QUERY DATABASE FOR THE JOB HISTORY
})


module.exports = router;

