//this has all of our SQL table attributes for worker
//WE NEED TO REQUIRE THE SQL DATABASE

var client = app.settings.client; // Client is set in Express settings

var table = 'workers';

var Worker = function() {

}

//create user from SQL
//need to check arguments with Scott's table
Worker.prototype.getProfile = function(id, name, location, summary, skills, rate){
	client.query(
		'SELECT'
//ENTER IN SQL query,
		'blahblahblah'
		function select(err, results, fields){
			if(err){
				throw err;
			} else{
				callback(null, results);
			}
		}
} 
