var express = require('express');
var passport = require('passport');
var router = express.Router();

var isAuthenticated = function (request, response, next) {
	if(request.isAuthenticated()) {
		return next();
	} else {
		response.redirect('/fetch');
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

router.use('/hub', isAuthenticated);

router.route('/')
.get(function (request, response) {
	response.render('fetchlogin', {title: 'Wolf Chords - Fetch Login'});
})
.post(
	passport.authenticate('local', {successRedirect: '/fetch/hub', failureRedirect: '/fetch'})
);

router.route('/hub')
.get(function (request, response) {
	response.render('fetchhub', {title: 'Wolf Chords - Fetch Hub'});
});

router.route('/all')
.get(function (request, response) {
	response.json(sampleArticles);
});


module.exports = router;