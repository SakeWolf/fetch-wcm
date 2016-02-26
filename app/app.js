var express = require('express');
var app = express();
var mongoose = require('mongoose');
var dbConfig = require('./db.js');
var User = require('./models/user.js');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var reviews = require('./routes/reviews');
var fetch = require('./routes/fetch');

var isValidPassword = function (user, password) {
	return bcrypt.compareSync(password, user.password);
};

mongoose.connect(dbConfig.url);

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({'username': username}, function(error, user) {
			if (error) return done(error);
			if (!user || !isValidPassword(user, password)) {
				return done(null, false);
			} else {
				return done(null, user);
			}
		});
	}
));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'guitar dog',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'jade');
app.use('/reviews', reviews);
app.use('/fetch', fetch);

app.get('/', function (request, response) {
	response.render('index', {title: 'Wolf Chords', message: 'hOI! i\'m hTML!'});
});

module.exports = app;