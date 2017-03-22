var express = require('express');
var imgur = require("./imgur")
var multipart = require('connect-multiparty');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
var db = require('./db');

var app = express();
var multipartMiddleware = multipart();

const hostname = 'localhost'
const port = process.env.PORT || 3000 

passport.use(new Strategy(
  function(token, cb) {
    db.users.findByToken(token, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

app.use(require('morgan')('combined'));


app.get('/', function (req, res) {
	res.send('Hello to the Challenge')
})

app.post('/login', multipartMiddleware, function (req, res){
	db.users.findByUsername(req.body.username, function(err, user) {
      	if (!user) { 
      		res.status(400);
      		res.send(null);
      	} else {
			res.send(user);
      	}
    });
})

app.get('/image', passport.authenticate('bearer', { session: false }), function (req, res) {
  	imgur.get_public(req, res)
})

app.get('/image/:imageid', passport.authenticate('bearer', { session: false }), function(req, res) {
	imgur.get_image(req, res)
});

app.post('/image', passport.authenticate('bearer', { session: false }), multipartMiddleware, function (req, res) {
	imgur.post_image(req, res)
});

var server = app.listen(port, function (){
	var host = server.address().address
	var port = server.address().port

	console.log('Example API running in http://%s:%s', host, port)
})