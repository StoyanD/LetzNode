//Letz
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , favicons = require('connect-favicons')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

var mongoUri = process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URL || 'mongodb://localhost/letz';
//location  local ::   grep dbpath /etc/mongodb.conf
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('Connection to db established : ' + mongoUri);
});

app.configure('development', function(){
	console.log('app in development mode');
	app.locals.pretty = true;
	app.use(express.errorHandler());
	app.use(express.logger('dev'));
});

app.configure('production', function(){
	console.log('app in production mode');
    app.enable('view cache');
});

app.configure(function(){
	// all environments
	app.set('port', process.env.PORT || 3000);//master branch
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
