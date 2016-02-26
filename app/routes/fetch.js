var express = require('express');
var passport = require('passport');
var router = express.Router();

var isAuthenticated = function (request, response, next) {
	if(request.isAuthenticated()) {
		return next();
	} else {
		response.redirect('/notfound');
	}
};

router.use('/hub', isAuthenticated);

router.route('/')
.get(function (request, response) {
	response.render('fetchlogin', {});
})
.post(
	passport.authenticate('local', {successRedirect: '/fetch/hub', failureRedirect: '/fetch'})
);

router.route('/hub')
.get(function (request, response) {
	response.render('fetchhub', {});
});


module.exports = router;