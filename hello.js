// hello.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Wazzup Bitch?! The garage door status is: ');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

// PostGre calls
var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  client.query('SELECT status from donjonkeeper order by dateModified DESC limit 1', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});