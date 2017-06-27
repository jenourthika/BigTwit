// server.js

// set up ======================================================================
// get all the tools we need
let path = require('path')
let express  = require('express')
let app      = express()
let port     = process.env.PORT || 3000;
let passport = require('passport');
let flash    = require('connect-flash');
let http = require('http');
let bodyParser = require('body-parser');
let util = require('util');



require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(bodyParser.json());
	app.use(express.urlencoded());
	app.use(express.json());
	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.cookieSession({ secret: 'tobo!', maxAge: 360*5 })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
