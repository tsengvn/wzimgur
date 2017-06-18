var superagent = require('superagent');
var fs = require('fs');
var nconf = require('nconf');
var url = require('url');

const END_POINT = 'https://api.imgur.com/3/';
const CLIENT_ID = 'Client-ID 93f99ef66435292';
const CLIENT_SECRET = '8a8bbc8be553d86a75d2221eb971924ec6b6dfb3'
const ALBUM_ID = 'E6Y5p'

nconf.use('file', { file: './setting.json' });
nconf.load();

var get_public = function (req, res) {
	superagent
		.get(END_POINT + 'album/' + ALBUM_ID + '/images?sort=time')
		.set('Authorization', CLIENT_ID)
		.end(function(err, res2){
	     	if (err || !res2.ok) {
	     		console.log('get_public : error ' + err)
	     		res.send(err)
	     	} else {
	     		console.log('get_public : success')
	       		res.send(res2.body)
	     	}
	   	});
};

var get_image = function (req, res) {
	superagent
		.get(END_POINT + "image/" + req.params.imageid)
		.set('Authorization', CLIENT_ID)
		.end(function(err, res2){
	     	if (err || !res2.ok) {
	     		console.log('get_image : error ' + err)
	     		res.send(err)
	     	} else {
	     		console.log('get_image : success')
	       		res.send(res2.body)
	     	}
	   	});
};

var post_image = function (req, res) {
	console.log(req);
	login(function(loginErr, loginRes) {
		console.log(loginRes.body)
		saveToken(loginRes.body.access_token, loginRes.body.refresh_token)

		title = req.body.title
		if (!title) {
			title = 'No title'
		}

		description = req.body.description
		if (!description) {
			description = 'No description'
		}

		try {
			superagent
			.post(END_POINT + "image/")
			.attach('image', req.files.file.path)
			.field('album', ALBUM_ID)
			.field('title', title)
			.field('description', description)
			.set('Authorization', "Bearer " + getToken())
			.end(function(err, res2){
				fs.unlink(req.files.file.path)
		     	if (err || !res2.ok) {
		     		console.log('post_image : error ' + err)
		     		res.send(err)
		     	} else {
		     		console.log('post_image : success')
		       		res.send(res2.body)
		     	}
		   	});
		} catch (err) {
			console.log('post_image : error ' + err)
			res.statusCode = 400;
			res.send(err)
		}

	});

};

var login = function (callback) {
	superagent
		.post("https://api.imgur.com/oauth2/token")
		.field("grant_type", 'refresh_token')
		.field('client_id', '93f99ef66435292')
		.field('client_secret', CLIENT_SECRET)
		.field('refresh_token', nconf.get('refresh_token'))
		.end(callback);
}

var saveToken = function (access_token, refresh_token) {
	nconf.set('access_token', access_token);
	nconf.set('refresh_token', refresh_token);
	nconf.save(function (err) {
		if (err) {
			console.error(err.message);
			return;
		}
		console.log('Configuration saved successfully.');
	  });
};

var getToken = function () {
	return nconf.get('access_token');
}

var get_thumbnail = function (req, res) {
	var query = url.parse(req.url, true).query;

	// console.log(query.imageId)
	// console.log(query)

	superagent
		.get("http://i.imgur.com/" + query.imageId + query.size + ".jpeg")
		.end(function(err, res2){
	     	if (err || !res2.ok) {
	     		console.log('get_thumbnail : error ' + err)
	     		res.send(err)
	     	} else {
	     		console.log('get_thumbnail : success')
					res.setHeader('content-type', 'image/jpeg');
	       	res.send(res2.body)
	     	}
	   	});
}

module.exports.get_public = get_public;
module.exports.get_image = get_image;
module.exports.post_image = post_image;
module.exports.get_thumbnail = get_thumbnail;
