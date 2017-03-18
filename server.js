var express = require('express');
var app = express();
var imgur = require("./imgur")

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


app.get('/', function (req, res) {
	res.send('Hello to the Challenge')
  	
})

app.get('/image', function (req, res) {
  	imgur.get_public(req, res)
})

app.get('/image/:imageid', function(req, res) {
	imgur.get_image(req, res)
});

app.post('/image', multipartMiddleware, function (req, res) {
	imgur.post_image(req, res)
});

var server = app.listen(8081, function (){
	var host = server.address().address
	var port = server.address().port

	console.log('Example API running in http://%s:%s', host, port)
})