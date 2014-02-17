var restify = require('restify');

module.exports = function(server) {
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
	server.get(/.*/, restify.serveStatic({
		'directory': '.',
		'default': 'index.html'
		})	
	);
};