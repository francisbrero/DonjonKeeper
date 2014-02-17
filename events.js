//Events object 
function Events(){};
//exported through exports.Events
exports.Events = Events;
 
//DB client is passed and inititialized from outside...
exports.setAndConnectClient = function(_client){
  client = _client;  //assign it to the module's client var  
  client.connect();  //connect to DB...
}

//GET All status! 
Events.prototype.GET = function(callback){
   var allEvents = [];  
   var query =  client.query('SELECT * FROM donjonkeeper order by datemodified desc', function(err, result){
      allEvents = result.rows;
      //return an empty object if no events exist
      if(allEvents.length == 0) {
         callback([]); 
      }else callback(allEvents);
    });        
}

//GET status! 
Events.prototype.GETc = function(callback){
   var allEvents = [];  
   var query =  client.query('select * from donjonkeeper order by datemodified desc limit 1', function(err, result){
      allEvents = result.rows;
      //return an empty object if no events exist
      if(allEvents.length == 0) {
         callback([]); 
      }else callback(allEvents);
    });        
}

//POST OPen! 
Events.prototype.POST = function(callback){
   var allEvents = [];
   var sql = "insert into donjonkeeper (status, datemodified) values (\'open\', now());";
   var query =  client.query(sql, function(err, result){
      //return an empty object if no events exist
	  console.log(sql);
      if(!err) {
         callback([]); 
      }else {
		var readquery =  client.query('SELECT * FROM donjonkeeper order by datemodified desc limit 1', function(err, result){
		allEvents = result.rows;
		//return an empty object if no events exist
		if(allEvents.length == 0) {
         callback([]); 
		}else callback(allEvents);
		});
	  }
    });         
}

//POST close! 
Events.prototype.POSTc = function(callback){
   var allEvents = [];
   console.log('wasabi');
   var sql = 'insert into donjonkeeper (status, datemodified) values (\'closed\', now());';
   var query =  client.query(sql, function(err, result){
      //return an empty object if no events exist
	  console.log(sql);
      if(!err) {
         callback([]); 
      }else {
		var readquery =  client.query('SELECT * FROM donjonkeeper order by datemodified desc limit 1', function(err, result){
		allEvents = result.rows;
		//return an empty object if no events exist
		if(allEvents.length == 0) {
         callback([]); 
		}else callback(allEvents);
		});
	  }
    });   	
}