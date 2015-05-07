var appPath = "/app/www-data/";
var express = require('express');
var cool = require('cool-ascii-faces');
var pg = require('pg');
var app = express();
var path  = require('path');
var fs = require('fs');

//set up underscore + html rendering
var cons = require('consolidate');
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, appPath + 'views'));
var __ = require('underscore'); //two underscores


var dbURL = "postgres://rpfdcadokaxnvb:B7AFleOzmHR3dRLa4qWV0n4XjA@ec2-54-163-227-94.compute-1.amazonaws.com:5432/d8t4juohs69msb";
app.set('port', (process.env.PORT || 5000));

app.use('/static', express.static(__dirname + appPath + 'static'));
var auth = false;
/** default landing **/
app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname + appPath + 'views/index.html'));
  res.render(path.join(__dirname + appPath + 'views/index.html'), {content:"loading..."});
});

/** for populating the landing page **/
app.get('/main', function(req, res) {
  //console.log(req.body.params)
  if(auth) {
    var obj;
    fs.readFile('test_files/MOCK_DATA.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.render(path.join(__dirname + appPath + 'views/includes/main_dashboard.html'), { "chimes":obj });
    });
  }
  else {
    res.render(path.join(__dirname + appPath + 'views/includes/main_intro.html'), {title:"hello world"});
  }

  auth = true;
  setTimeout(function(){auth=false;}, 300000);//ten minute timeout
});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});






app.get('/db', function (request, response) {
  var client = new pg.Client({
    user: "rpfdcadokaxnvb",
    password: "B7AFleOzmHR3dRLa4qWV0n4XjA",
    database: "d8t4juohs69msb",
    port: 5432,
    host: "ec2-54-163-227-94.compute-1.amazonaws.com",
    ssl: true
  });

  client.connect(function(err) {
  	
  	/*client = new pg.Client({
  		"user":"rpfdcadokaxnvb",
  		"password": "B7AFleOzmHR3dRLa4qWV0n4XjA",
  		"database": "d8t4juohs69msb",
  		"port": "5432",
  		"host": "ec2-54-163-227-94.compute-1.amazonaws.com"

  	});*/

    client.query('SELECT * FROM test_table', function(err, result) {
      console.log('got here')

      if (err)
       { console.error(err); response.send("Error " + err); client.end();}
      else
       { response.send(result.rows); client.end();}
    });
  });
})