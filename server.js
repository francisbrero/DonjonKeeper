//Define the port to listen to
var PORT = process.env.PORT || 1983;
//Include retify.js framework
var express  = require('express');
var server      = express();
 
// var options = {
//   serverName: 'My server',
//   accept: [ 'application/json' ]
// }

server.configure(function() {
	server.use(express.static(__dirname + '/public')); 		// set the static files location
	server.use(express.logger('dev')); 						// log every request to the console
	server.use(express.bodyParser()); 							// pull information from html in POST
	server.use(express.methodOverride()); 						// simulate DELETE and PUT
});
 
//Include db_conn file
var db_conn = require('./db_conn');
 
//IMPORT RESOURCES
var eventsResource = require('./events');
var client = eventsResource.setAndConnectClient(db_conn.client);



// routes ======================================================================
// require('./routes.js')(server);

//DEFINE THE URIs THE SERVER IS RESPONDING TO
	server.get('/GET/status', function(req, res) {   
	  var events = new eventsResource.Events() ;
	  //Get all events from DB
	  events.GET(function(result){
	     
	    var allEvents = result;
	 
	    //If no events exist return 200 and and empty JSON
	    if(allEvents.length == 0) {
	      res.send(200, []);
	      return;
	    }else res.send(200, result);
	  });    
	 
	});

	server.get('/GET/currentstatus', function(req, res) {
	   
	  var events = new eventsResource.Events() ;
	 
	  //Get last events from DB
	  events.GETc(function(result){
	     
	    var allEvents = result;
	 
	    //If no events exist return 200 and and empty JSON
	    if(allEvents.length == 0) {
	      res.send(200, []);
	      return;
	    }else res.send(200, result);
	  });    
	 
	});

	server.get('/POST/open', function(req, res) {
	   
	  var events = new eventsResource.Events() ;
	   
	  //POST event to DB
	  events.POST(function(result){
	     
	    var allEvents = result;
	 
	    //If no events exist return 200 and and empty JSON
	    if(allEvents.length == 0) {
	      res.send(200, []);
	      return;
	    }else res.send(200, result);
	  });
	});

	server.get('/POST/close', function(req, res) {
	   
	  var events = new eventsResource.Events() ;
	   
	  //POST event to DB
	  events.POSTc(function(result){
	     
	    var allEvents = result;
	 
	    //If no events exist return 200 and and empty JSON
	    if(allEvents.length == 0) {
	      res.send(200, []);
	      return;
	    }else res.send(200, result);
	  });
	}); 

	// application -------------------------------------------------------------
	 server.get('*', function(req, res) {
		 res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
server.listen(PORT, '0.0.0.0');
console.log("listening "+PORT);