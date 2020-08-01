var express = require('express');
var mysql = require('mysql');
var todoRouter = express.Router();

todoRouter.route('/')
.get((req,res,next)	=>	{
	res.statusCode	=	200;
	res.setHeader('Content-Type','application/json');
	res.end("Welcome");
})

module.exports = todoRouter;