var express = require('express');

var passport = require('passport');

var router = express.Router();

router.route('/')
.get(function (request, response) {
	response.render('login', {});
})
.post(
	passport.authenticate('local', {successRedirect: '/fetch/hub', failureRedirect: '/fetch'})
);

router.route('/hub')
.get(function (request, response) {
	response.render('index', {title: "Fetch Hub", message: "For admin eyes only!"});
});

module.exports = router;