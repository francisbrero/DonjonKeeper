var Status = require('status');
var connectionString = process.env.DATABASE_URL;

// routes ======================================================================
	// api ---------------------------------------------------------------------
	// get Status
	app.get('/api/status', function(req, res) {
		// get current status from postgre
		client = new pg.Client(connectionString);
		client.connect();
		 query = client.query('SELECT status AS currentstatus from donjonkeeper order by dateModified DESC limit 1',function(err, result) {
			res.json(result.rows[0]);
		});
	});
	
	app.get('/api/bla', function(req, res) {		
			res.send('ta mere');		
	});
		
	// update status and send back status after creation
	app.post('/api/status', function(req, res) {

		// update status, information comes from AJAX request from Angular
		client = new pg.Client(connectionString);
		client.connect();
		console.log(req.body.text);
		query = client.query('insert into donjonkeeper (status, dateModified) values ('+ req.body.text +', now())', function(err, result){
		if(err) return console.error(err);    
		console.log(result.rows);
		client.end();
		});
	});
