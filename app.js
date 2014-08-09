var MongoClient = require('mongodb').MongoClient;
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var Guid = require("Guid");
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + "/public"));

function collection(collection, callback) {  
	MongoClient.connect('mongodb://127.0.0.1:27017/formbuilder', function(err, db) {
		callback(err, db.collection(collection));
	});
}

app.post("/user/login", function(req, res) {
	request("https://graph.facebook.com/v2.1/me?access_token=" + req.body.accessToken, function(error, response, body) {
		if(error) {
			res.send({
				error : error
			});
		} else {
			var accessToken = Guid.raw();
			var expire = new Date().getTime() + (1000 * 60 * 60 * 1);
			collection("user", function(err, user) {
				user.findAndModify({facebook:response.id}, [], {accessToken:accessToken,expire:expire}, {}, function(err, u) {
					if(!u) {
						user.insert({
							accessToken : accessToken,
							expire : expire,
							facebook : response.id,
							inserted : new Date()
						}, function(err){});
					}
					res.send({
						data : accessToken
					});
				});
			});
		}
	});
	
});

app.listen(3000, function() {
	console.log("Server listening on port 3000.");
});