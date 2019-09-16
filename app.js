var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var localIpV4Address = require("local-ipv4-address");

let rawdata = fs.readFileSync('server_config.json');
let config = JSON.parse(rawdata);

http.createServer(function (req, res) {
	if (req.url == '/fileupload') {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var oldpath = files.filetoupload.path;
			var newpath = config.path + files.filetoupload.name;
			process.stdout.write("\nFile received -> " + files.filetoupload.name);
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err;
				res.writeHead(301, {
					Location: 'localhost:' + config.port
				});
				res.end();
			});
		});
	} else {
		// process.stdout.write(ip.address());
		res.writeHead(200, {
			'Content-Type': 'text/html'
		});

		var file = fs.createReadStream('lib/html/index.html');
		file.pipe(res);
	}
}).listen(config.port);

localIpV4Address().then(function (ipAddress) {
	console.log("My IP address is " + ipAddress);
});