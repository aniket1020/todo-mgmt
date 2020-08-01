var express = require('express');
var mysql = require('mysql');
var todoRouter = express.Router();

var db = mysql.createConnection({
	host:'localhost',
	user:'admin',
	password:'password',
	database:'sample_project',
	insecureAuth : true
})

db.connect((err)	=>	{
	if(err)	throw err;
	console.log("Connection successful");
});

todoRouter.route('/')
.get((req,res,next)	=>	{
	res.statusCode	=	200;
	res.setHeader('Content-Type','application/json');
	res.end("Welcome");
})

module.exports = todoRouter;