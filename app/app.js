var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var reviews = require('./routes/reviews');
var fetch = require('./routes/fetch');


passport.use(new LocalStrategy(
	function(username, password, done) {
		return done(null, true);
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