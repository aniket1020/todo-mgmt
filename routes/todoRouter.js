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

//http://localhost:3000/todo
todoRouter.route('/')
	.get((req, res) => {
		db.query('select * from user_'+req.query.userid+';', (err,results) => {
			if(err) throw err;
			console.log("Fetching data from todo_db");
			res.status	=	200;
			res.json(results);
		})
	})
	.post((req, res) => {
		console.log(req.body.userid);
		db.query("insert into user_"+req.body.userid+" (title, body, time_rem) values ('"+req.body.title+"','"+req.body.body+"','"+req.body.time_rem+"');", (err,results) => {
			if(err) throw err;
			else {
				res.status(200).send({err:false,data:results,message:'Inserted into the table successfully'});
				console.log("Inserted into the table successfully");
			}
		})
	})
	.delete((req,res)	=>	{
		db.query("delete from user_"+req.body.userid+" where assign_id	=	"+req.body.assign_id+";", (err,results) => {
			if(err) throw err;
			else {
				res.status(200).send({err:false,data:results,message:'Delete from the table successfully'});
				console.log("Delete from the table successfully");
			}
		})
	})

module.exports = todoRouter;