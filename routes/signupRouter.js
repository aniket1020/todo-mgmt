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
	//Insert into the user_table (the DB for all users)
	db.query('insert into user_table (firstname,lastname,username,member_of_org,isadmin) values '+"('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.username+"','"+req.body.member_of_org+"',"+req.body.isadmin+");",
	(err,results)	=>	{
		if(err)	throw err;
		console.log("Insterted into the user_table");
		userId	=	results.insertId;
		userId	=	'user_'	+	userId;
		db.query("update user_table set table_name = '"+userId+"' where userid = "+results.insertId);
		//Create Individual table for each user to store assignments
		db.query('create table if not exists '+userId+' (assign_id int not null primary key auto_increment, title varchar(100), body varchar(100), time_cr timestamp default current_timestamp, time_rem int not null, status boolean default false, overdue boolean default false);',
		(err, results)	=>	{
		if(err)	throw err;
		console.log("Created Unique User Table")
		res.status(200).send({err:false,data:results,message:'Created Unique User Table'});
		//Trigger to update time_cr on PUT request
	})
	})
})

module.exports = signupRouter;