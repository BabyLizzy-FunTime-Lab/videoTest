const express = require('express'),
		pug = require('pug'),
		bodyParser = require('body-parser'); 

const server = express();

// Serving static files
server.use('/public', express.static(__dirname + '/public'));
server.use(express.static('public'));

// Useing bodyparser
server.use(bodyparser.urlencoded({extended:true}));
server.use(bodyparser.json());

// Using Pug
server.set("view engine", "pug");

// Root
server.get('/', function(req, res) {
	res.render("main");
});





server.listen(8000, function (req, res) {
	console.log("Server running on 8000")
});
