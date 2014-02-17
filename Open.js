// Open.js
var express = require("express");
var logfmt = require("logfmt");
var pg = require('pg');
var app = express();
var port = Number(process.env.PORT || 5000);
var connectionString = process.env.DATABASE_URL;
var http = require("http");
var url = require("url");

// Log
app.use(logfmt.requestLogger());

//Start the app
app.listen(port, function() {
  console.log("Listening on " + port);
});



function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
  app.listen(port, function() {
  console.log("Listening on " + port);
 });
  console.log("Server has started.");
}

exports.start = start;

function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;

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