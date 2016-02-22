var express = require('express');

var bodyParser = require('body-parser');

var router = express.Router();

router.route('/')
.get(function(request, response) {
	response.render('review', {title: "Wolf Chords", review: "Content!"});
});

router.route('/:album')
.get(function(request, response) {
	var id = request.params.album;
	response.render('review', {title: "Wolf Chords", review: "Something!"});
});

module.exports = router;