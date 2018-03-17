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
	const path = 'videoArchive/LizzyBeachFirstTime.mp4';
	const range = req.headers.range;
	console.log(req.headers.range);

	// Get the filesize of the file to be transmitted. 
	fs.stat(path, function(err, stats) {
		if(err){
			// This err should res with a 404.
			console.log("Could not find file.");
		} else {
			const fileSize = stats.size;


			if(range){

				const parts = range.replace(/bytes=/, "").split("-")
			    const start = parseInt(parts[0], 10)
			    const end = parts[1]
			      ? parseInt(parts[1], 10)
			      : fileSize-1

			    const chunksize = (end-start)+1
			    const file = fs.createReadStream(path, {start, end})
			    const head = {
			      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			      'Accept-Ranges': 'bytes',
			      'Content-Length': chunksize,
			      'Content-Type': 'video/mp4',
		    	}

		    	res.writeHead(206, head)
		    	file.pipe(res)


			} else {
				const head = {
					'Content-Length': fileSize,
					'Content-Type': 'video/mp4',
				}
				res.writeHead(200, head);
				fs.createReadStream(path).pipe(res);
			}
		}
	});


})




// Server start
server.listen(8000, function (req, res) {
	console.log("Server running on 8000")
});
