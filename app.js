var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var localIpV4Address = require("local-ipv4-address");

http.createServer(function (req, res) {
	if (req.url == '/fileupload') {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var oldpath = files.filetoupload.path;
			var newpath = 'C:/Users/Lucas Rocha/Desktop/lan uploader/fileupload/' + files.filetoupload.name;
			process.stdout.write("\nFile received -> " + files.filetoupload.name);
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err;
				res.writeHead(301, {
					Location: 'localhost:3000'
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
}).listen(3000);

localIpV4Address().then(function (ipAddress) {
	console.log("My IP address is " + ipAddress);
});