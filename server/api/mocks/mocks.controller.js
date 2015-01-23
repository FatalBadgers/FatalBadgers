// Create mock data for workers table
exports.workers = function(req, res) {
  res.json([
    {
      id: 1,
      name: 'Yan Fan',
      email: 'theyanfan@gmail.com',
      location: 'San Francisco, CA',

    }
  ]);
};

// Create mock data for clients table
exports.clients = function(req, res) {
  res.json([
    {
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }
  ]);
};

// Create mock data for workers_open_jobs table
exports.workersOpenJobs = function(req, res) {
  res.json([
    {
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }
  ]);
};

// Create mock data for client_reviews table
exports.clientReviews = function(req, res) {
  res.json([
    {
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }
  ]);
};

// Create mock data for workers_open_jobs
exports.workerReviews = function(req, res) {
  res.json([
    {
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }
  ]);
};

// Create mock data for worker_reviews_table
exports.workerReviews = function(req, res) {
  res.json([
    {
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }
  ]);
};
