// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
//var mongoose = require('mongoose'); 					// mongoose for mongodb
var pg 		= require('pg');			//postgre
var URL		= process.env.DATABASE_URL;
var port = process.env.PORT || 8080;
var restify = require('restify');		// for rest postgre



pg.connect(URL, function(err, client) {
  var query = client.query('SELECT * FROM donjonkeeper order by ');

  query.on('row', function(row) {
    console.log(JSON.stringify(row));
  });
});



// configuration ===============================================================

//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io
var client = pg.connect(URL);


app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

// define model ================================================================
// var Todo = mongoose.model('Todo', {
	// text : String,
	// done : Boolean
// });

var Door = pg.model('Door', {
	status : String,
	datemodified : Timestamp
});

app.use(restify.bodyParser({ mapParams: false }));
//IMPORT RESOURCES
var eventsResource = require('./events');
eventsResource.setAndConnectClient(client);

// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});
	
	// get all status entries
	app.get('/api/status', function(req, res) {

		// use mongoose to get all todos in the database
		Door.find(function(err, status) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(status); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);