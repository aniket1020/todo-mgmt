var express = require('express');
var mysql = require('mysql');
var todoRouter = express.Router();

var db = mysql.createConnection({
	host: 'localhost',
	user: 'admin',
	password: 'password',
	database: 'todo_db',
	insecureAuth: true
})

db.connect((err) => {
	if(err) throw err;
	console.log("Connection successful");
})
/*
.then(db.query('Create table if not exists user_id(int)(assign_id int not null primary key auto_increment, title varchar(100), body va1rchar(100), time_cr timestamp default current_timestamp, time_rem int not null);', (err) => {
	if(err) throw err;
	console.log("Created table MyAssignment [if not exists]");
}));
*/


//http://localhost:3000/todo
todoRouter.route('/')
	.get((req, res, next) => {
		db.query('select * from '+req.user_id+';', (err,result) => {
			if(err) throw err;
			console.log("Fetching data from todo_db");
			res.statusCode	=	200;
			res.setHeader('Content-Type','application/json');
			res.json(result);
		})

	})
	.post((req, res, next) => {
		db.query("insert into user_id values ();", (err) => {
			if(err) throw err;
			else {
				res.end("Inserted Successfully");
				console.log("Inserted into the table successfully");
			}
		})
	})


module.exports = todoRouter;