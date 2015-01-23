// Create mock data for workers table
exports.workers = function(req, res) {
  res.json([
    {
      id: 1,
      name: 'Yan Fan',
      email: 'theyanfan@gmail.com',
      location: 'San Francisco, CA',
      avg_rating: 3
    },
    {
      id: 2,
      name: 'Tim Martin',
      email: 'timothy.m.martin@gmail.com',
      location: 'San Francisco, CA',
      avg_rating: 3
    },
    {
      id: 3,
      name: 'Kevin Primat',
      email: 'kxprim@gmail.com',
      location: 'San Francisco, CA',
      avg_rating: 3
    }
  ]);
};

// Create mock data for clients table
exports.clients = function(req, res) {
  res.json([
    {
      id: 1,
      name: 'Apartment building owner',
      email: 'apartment@gmail.com',
      location: 'San Francisco, CA',
      avg_rating: 3
    },
    {
      id: 2,
      name: 'iPhone owner',
      email: 'iPhoneOwner@gmail.com',
      location: 'San Francisco, CA',
      avg_rating: 3
    },
    {
      id: 3,
      name: 'Homeowner',
      email: 'homeowner@gmail.com',
      location: 'San Francisco, CA',
      avg_rating: 3
    }
  ]);
};

// Create mock data for client_reviews table
exports.workerReviews = function(req, res) {
  res.json([
    {
      id: 1,
      comment: 'Yan was great!',
      rating: 3,
      id_workers: 1
    },
    {
      id: 2,
      comment: 'Tim was great!',
      rating: 3,
      id_workers: 2
    },
    {
      id: 3,
      comment: 'Kevin was great!',
      rating: 3,
      id_workers: 3
    }
  ]);
};

// Create mock data for workers_open_jobs
exports.clientReviews = function(req, res) {
  res.json([
    {
      id: 1,
      comment: 'Apartment building owner paid on time!',
      rating: 3,
      id_clients: 1
    },
    {
      id: 2,
      comment: 'iPhone owner was gave clear instructions!',
      rating: 3,
      id_clients: 2
    },
    {
      id: 3,
      comment: 'Homeowner was great!',
      rating: 3,
      id_clients: 3
    }
  ]);
};

// Create mock data for worker_reviews_table
exports.jobs = function(req, res) {
  res.json([
    {
      id: 1,
      title: "Do electrical work",
      id_workers: null,
      id_clients: 1,
      budget: 1000,
      summary: "Wire ceiling in one bedroom for dome lights.",
      skills_needed: "certified electrician",
      status: "open"
    },
    {
      id: 2,
      title: "iPhone screen cracked",
      id_workers: 2,
      id_clients: 2,
      budget: 50,
      summary: "Need to replace my cracked iPhone screen.",
      skills_needed: "experienced in iPhone repair",
      status: "in_progress"
    },
    {
      id: 3,
      title: "Carpentry work",
      id_workers: 3,
      id_clients: 3,
      budget: 2000,
      summary: "Need a shed built in backyard.",
      skills_needed: "experienced carpenter",
      status: "complete"
    }
  ]);
};

// Create mock data for workers_open_jobs table
exports.workersOpenJobs = function(req, res) {
  res.json([
    {
      id: 1,
      id_workers: 1,
      id_jobs: 1
    },
    {
      id: 2,
      id_workers: 2,
      id_jobs: 1
    },
    {
      id: 3,
      id_workers: 3,
      id_jobs: 1
    }
  ]);
};
