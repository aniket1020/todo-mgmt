var express = require('express');
var mysql = require('mysql');
var loginRouter = express.Router();

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

//http://localhost:3000/login
loginRouter.route('/')
.post((req,res,err)	=>	{
	db.query("select * from user_table where username = '"+req.body.username+"';",
			(err,results)	=>	{
				if(err)	throw err;
				console.log(results[0]);
				res.status(200).send({err:false,data:results,message:'Data in DB'});
			}
		)
})


module.exports	=	loginRouter;