'use strict';

var express = require('express');
var controller = require('./mocks.controller.js');

var router = express.Router();

router.get('/workers', controller.workers);

router.get('/clients', controller.clients);

router.get('/worker-reviews', controller.workerReviews);

router.get('/client-reviews', controller.clientReviews);

router.get('/jobs', controller.jobs);

router.get('/workers-open-jobs', controller.workersOpenJobs);

module.exports = router;
