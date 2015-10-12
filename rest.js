var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();

	app.use(bodyParser.urlencoded({ extended: false }));
	
var DBNAME ="socialQuiz.db"

///////////////////// on start up create new DB /////////////////////
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(DBNAME);

db.serialize(function() {

	db.run("DROP TABLE if exists social_details");
	//create tables
  	db.run("CREATE TABLE if not exists social_details (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT,fName TEXT,lName TEXT, avatar TEXT)");

	//insert some stuff
	db.run("INSERT INTO social_details('user','fName','lName','avatar') VALUES ('djmason9','Darren','Mason','https://avatars1.githubusercontent.com/u/327110')");
	db.run("INSERT INTO social_details('user','fName','lName','avatar') VALUES ('tdog','Todd','Thompson','http://www.air-cosmos.com/img/unknown-avatar.png')");
	db.run("INSERT INTO social_details('user','fName','lName','avatar') VALUES ('rj','Rijad','Dizdarevic','http://www.air-cosmos.com/img/unknown-avatar.png')");
	db.run("INSERT INTO social_details('user','fName','lName','avatar') VALUES ('pauly','Paul','Deisinger','http://www.air-cosmos.com/img/unknown-avatar.png')");
	
	//select and loop results
	db.each("SELECT  id,user from social_details", function(err, row) {
      console.log(row.id + ": " + row.user);
  	});
});

db.close();

///////////////////// REST API /////////////////////


app.post('/addUser', jsonParser, function (req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
    if (!req.body) return res.sendStatus(400);

  	addUser(req,res);

});


app.get('/listUsers', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    
	var json = callDb(res);
});

app.get('/', function (req, res) {
   res.send('Base call this does NOTIHNG');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

})


///////////////////// DataBase /////////////////////
function addUser(req,res){
	//open db
	var db = new sqlite3.Database(DBNAME);
	
	var body = req.body;
	
	db.serialize(function() {
		db.run("INSERT INTO social_details('user','fName','lName') VALUES ('" + body.userName + "','" + body.fName + "','" + body.lName + "')");
		res.send(body.userName);
	});
	
	db.close();
}

function callDb(res){
	//open db
	var db = new sqlite3.Database(DBNAME);
	
	db.serialize(function() {

		db.all("SELECT  user, avatar from social_details", function(err, rows) {  		
			res.send( JSON.stringify(rows));
		});
  
	});

db.close();

}




