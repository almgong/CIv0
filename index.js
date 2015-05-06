var express = require('express');
var cool = require('cool-ascii-faces');
var pg = require('pg');
var app = express();
var dbURL = "postgres://vjrmoujjwcwgxj:zQc6UzPbRjZRruNC7Eu6xlfK38@ec2-54-163-225-41.compute-1.amazonaws.com:5432/d53tdu4mk8ifog";

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  //response.send('Hello World!');
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


app.get('/db', function (request, response) {
  pg.connect(dbURL, function(err, client, done) {
  	console.log(err)
  	console.log(client)
  	
  	client = new pg.Client({
  		"user":"vjrmoujjwcwgxj",
  		"password": "zQc6UzPbRjZRruNC7Eu6xlfK38",
  		"database": "d53tdu4mk8ifog",
  		"port": "5432",
  		"host": "ec2-54-163-225-41.compute-1.amazonaws.com"

  	});

    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result.rows); }
    });
  });
})