//require postgre driver
var pg = require('pg');    
//config file contains DB credentials, schema...
var config = require('./config.json');   
 
// var conString = "tcp://"+config.db.username+":"+config.db.password+"@"+config.db.host+":"+config.db.port+"/"+config.db.name;
var conString = "tcp://postgres://ehmqotboduibbs:-tiMAWm9OeV2U3Wy2vPnVBoVd5@ec2-54-204-32-91.compute-1.amazonaws.com:5432/d68jfimno7scnp";
var client = new pg.Client(conString);
 
if(!client){
  console.log("Starting client to DB "+conString+ " failed")
}else{
  console.log("Started client to  DB"+client.host+"/"+client.database);
}
 
exports.client = client;