var express = require('express');
var cool = require('cool-ascii-faces');
var pg = require('pg');
var app = express();
var path  = require('path');

var dbURL = "postgres://rpfdcadokaxnvb:B7AFleOzmHR3dRLa4qWV0n4XjA@ec2-54-163-227-94.compute-1.amazonaws.com:5432/d8t4juohs69msb";
var appPath = "/app/www-data/"
app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(__dirname + appPath + 'static'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + appPath + 'views/index.html'));
});





app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});









app.get('/db', function (request, response) {
  pg.connect(dbURL, function(err, client, done) {
    console.log(process.env.DATABASE_URL)
  	//console.log(err)
  	//console.log(client)
  	
  	/*client = new pg.Client({
  		"user":"rpfdcadokaxnvb",
  		"password": "B7AFleOzmHR3dRLa4qWV0n4XjA",
  		"database": "d8t4juohs69msb",
  		"port": "5432",
  		"host": "ec2-54-163-227-94.compute-1.amazonaws.com"

  	});*/

    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result.rows); }
    });
  });
})