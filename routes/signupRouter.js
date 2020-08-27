var express = require('express');
var mysql = require('mysql');
var signupRouter = express.Router();

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

//http://localhost:3000/signup
signupRouter.route('/')
.post((req,res,err)	=>	{
	var userId;
	db.query('insert into user_table (firstname,lastname,username,member_of_org,isadmin) values '+"('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.username+"','"+req.body.member_of_org+"',"+req.body.isadmin+");",
	(err,results)	=>	{
		if(err)	throw err;
		console.log("Insterted into the user_table")
		console.log(results);
		userId	=	results.insertId;
		userId	=	'user_'	+	userId;
		console.log('==>'+userId);
		db.query('create table if not exists '+userId+' (assign_id int not null primary key auto_increment, title varchar(100), body varchar(100), time_cr timestamp default current_timestamp, time_rem int not null);',
		(err, results)	=>	{
		if(err)	throw err;
		console.log("Created Unique User Table")
		res.status(200).send({err:false,data:results,message:'Created Unique User Table'});
})
	})
})

module.exports = signupRouter;