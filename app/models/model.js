var pg = require('pg');
var connString = "postgres://rpfdcadokaxnvb:B7AFleOzmHR3dRLa4qWV0n4XjA@ec2-54-163-227-94.compute-1.amazonaws.com:5432/d8t4juohs69msb?ssl=true";
var exports = module.exports;


/**

	MODEL STRUCTURE

	TABLES:
		- chimes (title, time, description)
		- users (first_name, last_name, email, password)
		- rings (host, chime) //host and chime are foreign keys, a host "rings" and chime.


**/



/**	MODEL FUNCTIONS:

	addChime(data, callback)	//adds a chime with given data params and a callback function
	getUserChimes


**/

exports.test = function() {
	//this starts initializes a connection pool
	//it will keep idle connections open for a (configurable) 30 seconds
	//and set a limit of 20 (also configurable)
	pg.connect(connString, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  
	  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
	    //call `done()` to release the client back to the pool
	    done();

	    if(err) {
	      return console.error('error running query', err);
	    }
	    console.log(result.rows[0].number);
	    //output: 1
	  });
	});


};


exports.addChime = function(data, next) {

	pg.connect(connString, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }

	  var title = data.title;
	  var day = data.day;
	  var month = data.month;
	  var description = data.description;

	  user = 1; //everyone is bill, bill is love - bill is life.

	  //insert new chime
	  client.query('INSERT INTO chimes (title, day, month, description) values ($1::text, $2::int, $3::text, $4::text) RETURNING id', 
	  	[title, day, month, description], function(err, result) {
	    //call `done()` to release the client back to the pool
	    //done();

	    if(err) {
	    	next(false)
	      return console.error('error running query', err);
	    }

	    var chime_id = result.rows[0].id;

	    //insert into rings relationship
	    client.query('INSERT INTO rings (host, chime) values ($1::int, $2::int)', 
	  	[user, chime_id], function(err, result) {
	  		done();
	  		if(err) {
		    	next(false)
		      return console.error('error running query', err);
		    }
		    next(true); //success
	  	});

	    //output: 1
	  });

	});
};



exports.getUserChimes = function(user_id, next) {

	var getChimesQuery = ' SELECT * FROM users, chimes, rings where users.id=rings.host and chimes.id=rings.chime';



	pg.connect(connString, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  
	  client.query(getChimesQuery, [], function(err, result) {
	    //call `done()` to release the client back to the pool
	    done();

	    if(err) {
	    	next({});
	      return console.error('error running query', err);
	    }

	    var data = []

	    for(var i = 0; i < result.rows.length; i++) {
	    	var curr = {};
	    	curr.first_name = result.rows[i].first_name;
	    	curr.last_name = result.rows[i].last_name;
	    	curr.title = result.rows[i].title;
	    	curr.day = result.rows[i].day;
	    	curr.month = result.rows[i].month;
	    	curr.description = result.rows[i].description;

	    	data.unshift(curr);
	    }
	   
	    next(data);
	    //output: 1
	  });
	});

};









//eo file