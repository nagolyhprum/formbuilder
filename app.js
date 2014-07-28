var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + "/public"));
app.listen(3000, function() {
	console.log("Server listening on port 3000.");
});