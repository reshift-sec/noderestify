var restify = require('restify');
var server = restify.createServer({
		name: 'CRUD with Restify'
	});
var fs = require('fs');
var mysql = require('./mysql.js');
var api = require('./api');

server.use(function crossOrigin(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	return next();
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/listUsers', api.getUsers);
server.get('/viewUser/:id', api.viewUser);
server.post('/register', api.registerUser);
server.put('/update/:id', api.updateUser);
server.del('/delete/:id', api.deleteUser);

server.listen('8888', function(){
	console.log('Connected on 8888');
});