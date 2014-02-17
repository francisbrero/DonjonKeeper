// hello.js
var express = require("express");
var logfmt = require("logfmt");
var pg = require('pg');
var app = express();
var port = Number(process.env.PORT || 5000);
var connectionString = process.env.DATABASE_URL;

// Log
app.use(logfmt.requestLogger());

//Start the app
app.listen(port, function() {
  console.log("Listening on " + port);
});

// Main
app.get('/', function(req, res) {
  client = new pg.Client(connectionString);
  client.connect();
  query = client.query('SELECT status AS currentstatus from donjonkeeper order by dateModified DESC limit 1',function(err, result) {
    if(result.rows[0].currentstatus == 0) {
      res.send('currently Closed' + 'http://donjonkeeper.herokuapp.com/Open.js');
    }
    if(result.rows[0].currentstatus == 1) {
      res.send('currently Open');
    }	else {
      res.send('currently unknown');
	  console.log(result.rows[0].currentstatus);
	  console.log(result.rows[0]);
    }
  client.end();
  });
});

// change the status of the door
function changestatus(status){
	client = new pg.Client(connectionString);
	client.connect();
	query = client.query('insert into donjonkeeper (status, dateModified) values ('+ status + ', now())', function(err, result){
		if(err) return console.error(err);    
		console.log(result.rows);
	});
	client.end();
}


// Close db connections
function disconnectAll() {
    pg.end();
}