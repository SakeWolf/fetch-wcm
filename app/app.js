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

var isValidPassword = function (user, password) {
	return bcrypt.compareSync(password, user.password);
};

var isAuthenticated = function (request, response, next) {
	if(request.isAuthenticated()) {
		return next();
	} else {
		response.redirect('/');
	}
};

var sampleArticles = [{
	type: "review",
	createdOn: new Date(2016, 1, 1, 0, 0, 0, 0),
	title: "Moth - Chairlift",
	content: "This is a review for \"Moth\" by Chairlift! It's not bad!",
	cover: "link!",
	albumTitle: "Moth",
	artist: "Chairlift",
	label: "Columbia",
	releaseDate: "January 22, 2016",
	rating: "7+",
	recommended: true
}, {
	type: "article",
	createdOn: new Date(2016, 1, 1, 0, 10, 0, 0),
	title: "Album spotlight Janurary 2016",
	content: "This would be a list of albums I <b>really</b> enjoyed in January 2016!"
}, {
	type: "review",
	createdOn: new Date(2016, 1, 1, 0, 15, 0, 0),
	title: "Adore Life - Savages",
	content: "This is a review for \"Adore\" by Savages! I think it could've been better...",
	cover: "link!",
	albumTitle: "Adore Life",
	artist: "Savages",
	label: "Matador",
	releaseDate: "January 22, 2016",
	rating: "7-",
	recommended: false
}, {
	type: "article",
	createdOn: new Date(2016, 1, 1, 0, 5, 0, 0),
	title: "The Art of Ambient Music",
	content: "This would be an article about how I enjoy ambient music!"
}];

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

app.use(express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'guitar dog',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'jade');

app.use('/hub', isAuthenticated);

app.route('/')
.get(function (request, response) {
	response.render('fetchlogin', {title: 'Wolf Chords - Fetch Login'});
})
.post(
	passport.authenticate('local', {successRedirect: '/hub', failureRedirect: '/'})
);

app.route('/hub')
.get(function (request, response) {
	response.render('fetchhub', {title: 'Wolf Chords - Fetch Hub'});
});

app.route('/all')
.get(function (request, response) {
	response.json(sampleArticles);
});

app.get('/notfound', function (request, response) {
	response.render('notfound', {title: 'Wolf Chords - Not Found'});
});

app.use(function (request, response) {
	response.status(404);
	response.render('notfound', {});
});


module.exports = app;