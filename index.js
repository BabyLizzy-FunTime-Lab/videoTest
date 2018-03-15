const express = require('express'),
		pug = require('pug'),
		fs = require('fs'),
		bodyParser = require('body-parser'); 

const server = express();

// Serving static files
server.use('/public', express.static(__dirname + '/public'));
server.use(express.static('public'));

// Useing bodyparser
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

// Using Pug
server.set("view engine", "pug");

// Root
server.get('/', function(req, res) {
	res.render("main");
});

// This get req comes from the videoplayer once it loads
server.get('/LizzyVideo', function(req, res) {
	res.send("./videoArchive/LizzyBeachFirstTime.mp4")

})




// Server start
server.listen(8000, function (req, res) {
	console.log("Server running on 8000")
});
