// Open.js
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
  query = client.query('insert into donjonkeeper (status, dateModified) values (1, now())', function(err, result){
    if(err) return console.error(err);    
	console.log(result.rows);
	client.end();
  });
});