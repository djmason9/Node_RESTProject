var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('basic.db');

db.serialize(function() {


	//create tables
  db.run("CREATE TABLE if not exists social_details (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT,fName TEXT,lName TEXT)");

//insert some stuff
  db.run("INSERT INTO social_details('user','fName','lName') VALUES ('djmason9','Darren','Mason')");
 db.run("INSERT INTO social_details('user','fName','lName') VALUES ('tdog','Todd','Thompson')");
  db.run("INSERT INTO social_details('user','fName','lName') VALUES ('rj','Rijad','Dizdarevic')");
   db.run("INSERT INTO social_details('user','fName','lName') VALUES ('pauly','Paul','Deisinger')");
   

//select and loop results
	db.each("SELECT  id,user from social_details", function(err, row) {
      console.log(row.id + ": " + row.user);
  });
  
  
  
});

db.close();