//to look at a mongo db (from the command line)
//mongo
//use formbuilder
//db.collection.find()

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
	MongoClient.connect('mongodb://127.0.0.1:27017/formbuilder', function(error, db) {
		if(error) {
			callback(error);
		} else {
			callback(error, db.collection(collection));
		}
	});
}

function authenticate(accessToken, callback) {
	collection("users", function(error, users) {
		if(error) {
			callback(error);
		} else {
			users.findAndModify({
				expire : {
					$gt : new Date()
				},
				accessToken : accessToken
			}, [], {
				$set : { expire : new Date(new Date().getTime() + (1000 * 60 * 60 * 1)) }
			}, {}, function(error, user) {
				if(error || !user) {
					callback(error || "Invalid access token.");	
				} else {
					callback(error, user, users);
				}
			});
		}
	});
}

app.post("/user/login", function(req, res) {
	request("https://graph.facebook.com/v2.1/me?access_token=" + req.body.accessToken, function(error, response, body) {
		if(error) {
			res.send({error : error});
		} else {
			var accessToken = Guid.raw();
			var expire = new Date(new Date().getTime() + (1000 * 60 * 60 * 1));
			collection("users", function(error, users) {
				body = JSON.parse(body);
				users.findAndModify({$set:{facebook:body.id}}, [], {accessToken:accessToken,expire:expire}, {}, function(error, user) {
					if(!user) {
						users.insert({
							accessToken : accessToken,
							expire : expire,
							fullname : body.full_name,
							facebook : body.id,
							inserted : new Date()
						}, function(error){
							if(error) {
								res.send({error : error});
							} else {
								res.send({data : {
									accessToken : accessToken,
									fullname : body.fullname,
									id : body.id
								}});
							}
						});
					} else {
						res.send({data : {
							accessToken : accessToken,
							fullname : user.fullname,
							id : user.id
						}});
					}
				});
			});
		}
	});
});

app.post("/user/finder", function(req, res) {
	
});



app.post("/project/version", function(req, res) {
	var accessToken = req.body.accessToken,
		data = req.body.data,
		name = req.body.name,
		description = req.body.description,
		projectID = req.body.projectID;
	authenticate(accessToken, function(error, user, users) {
		if(!error) {
			var userid = user._id;
			collection("projects", function(error, projects) {
				if(error) {
					res.send({error:error});
				} else {
					if(data && projectID) {
						//save(data,pid)
						projects.findAndModify({_id:projectID}, [], {$set:{versions:{$push: data}}}, {}, function(error, project) {
							res.send({data : project.versions.length});
						});
					} else if(projectID) {
						//branch(pid, accessToken)
						projects.find({_id:projectID}).toArray(function(error,p){
							if(error){
								res.send({error:error})
							}
							else{
								projects.insert({
									versions : p[0].versions[p[0].versions.length - 1],
									inserted : new Date(),
									permission: [userid]
								}, function(error, projects){
									if(error) {
										res.send({error : error});
									} else {
										res.send({data : projects[0]});
									}
								});
							}
						})
					} else if(data) {
						//create(data, project, accessToken)
						projects.insert({
							name : name,
							description : description,
							versions : [data],
							inserted : new Date(),
							permission: [userid]
						}, function(error, projects){
							if(error) {
								res.send({error : error});
							} else {
								res.send({data : projects[0]});
							}
						});
					} else {		
						//load(accessToken)
						projects.find({permission:userid}).toArray(function(errror, projects){
							if(error){
								res.send({error:error});
							} else{
								res.send({data:projects});
							}
						})
					}
				}
			});
		} else {
			res.send({error:error});
		}
	});
});

app.post("/project/permission", function(req, res) {
	var accessToken = req.body.accessToken,
		user = req.body.user,
		level = req.body.level,
		projectID = req.body.projectID;
	authenticate(accessToken, function(error, user, users) {
		if(!error) {
			var userid = user._id;
			collection("projects", function(error, projects) {
				if(error) {
					res.send({error:error});
				} else {
					if(projectID && user && path){
						//DO SOCKET HERE
							projects.find({permission:userid, _id: projectID}).toArray(function(errror, p){
								if(p){
									var d = 0
									for(var i = 0; i<p.permissions.length; i++){
										if(p.permissions[i].equals(user)){
											d = 1
											p.pemissions.splice(i,1);
											break;
										}
									}
									
									if(!d){
										p.permissions.push{user};
									}
									
									projects.save(p function(error, p){
										if(error){
											res.send({error:error});
										}
										else{
											res.send({data: d}); //LOGAN SUCKS
										}
									});
									
								} else{
									res.send({error:error});
								}
						})
					}
					else {
						res.send({error:"Invalid action."});
					}
				}
			});
		} else {
			res.send({error:error});
		}
	});
});

app.listen(3000, function() {
	console.log("Server listening on port 3000.");
});