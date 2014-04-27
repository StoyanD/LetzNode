var User = require('../data/models/user/user.js');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};


/**
 * Register email addresses to be notified when the app is launched
 */
exports.register = function(req, res){
	console.log('Email registered : ' + req.body.email);
	var val = {email : req.body.email, creation_ip : req.ip};
	console.log(req.ip);
	User.find({email : val.email}, function(err, persons){
		console.log(persons.length);
		if(err){
			res.json({'saved': 'false',
				'message': 'search_err'}).send();
		}else if(persons.length > 0){
			res.json({'saved': 'false',
				'message': 'duplicate'}).send();
			
		}else{
			var user = new User(val);
			user.save();
			res.json({'saved': 'true',
				'message': 'success'}).send();
		}
	});
	
};

