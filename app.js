var MongoClient = require('mongodb').MongoClient;
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var Guid = require("Guid");
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + "/public"));

function collection(collection) {  
	MongoClient.connect('mongodb://127.0.0.1:27017/formbuilder', function(err, db) {
		if(err) throw err;
		callback(db.collection(collection));
	});
}

app.post("/user/login", function(req, res) {
	request("https://graph.facebook.com/v2.1/me?access_token=" + req.body.accessToken, function(error, response, body) {
		console.log(body);
	});
	var accessToken = Guid.raw();
	res.send(accessToken)
});

app.listen(3000, function() {
	console.log("Server listening on port 3000.");
});