var http = require('http');
var currentdate = require('./myfirstmodule')

http.createServer(function (req, res) {

 res.writeHead(200, {'Content-Type': 'text/html'});
 res.write('The current date nd time is: ' + currentdate.myDateTime());
 res.end('Hello World!');
 
}).listen(8080);