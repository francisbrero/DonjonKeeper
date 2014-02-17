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
  query = client.query('SELECT status AS currentStatus from donjonkeeper order by dateModified DESC limit 1');
  query.on('row', function(result) {
    console.log(result);

    if (!result) {
      return res.send('No data found');
    } else {
      res.send('Current Status: ' + result.rows[0].currentStatus);
    }
  });
});

//returns current status
/*function changeStatus(onDone){
 pg.connect(connectionString, function(err, client, done) {
  //client.query('SELECT status from donjonkeeper order by dateModified DESC limit 1', function(err, result) {
  client.query('insert into donjonkeeper (status, dateModified) values (0, now())', function(err, result) {
    done();
    if(err) return console.error(err);    
	console.log(result.rows);
	onDone();
   });
  });
}
*/
// Close db connections
function disconnectAll() {
    pg.end();
}