var mongoose = require('mongoose')
	, moment = require('moment');

var UserSchema = mongoose.Schema({
	name : String,          //User's name
    email : String,         //User's email
    source : String,        //Source the user registered through
    creation_ip : String,   //IP of first creation
    last_ip : String,       //IP of last connection
    created_time : Number   //The time on the node server at user registration
});

UserSchema.pre('save', function(next){
	if(!this.created_time){
		this.created_time = moment().unix();
	}
	next();
});

var User = mongoose.model('User', UserSchema);
module.exports = User;