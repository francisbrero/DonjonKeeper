// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var logfmt = require("logfmt");
	var pg = require('pg'); 					// postgre
	var port = Number(process.env.PORT || 5000);

	// configuration =================

	var connectionString = process.env.DATABASE_URL;

	app.configure(function() {
		app.use(express.static(__dirname)); 		// set the static files location wherever we are for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT
	});
	
	
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	// listen (start app with node server.js) ======================================
	app.listen(port);
	console.log("App listening on port "+port);
	
	