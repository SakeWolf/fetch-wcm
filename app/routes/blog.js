var express = require('express');

var router = express.Router();

router.route('/')
.get(function(request, response) {
	response.json('Congra-tem-lations!');
});

router.route('/review')
.get(function(request, response) {
	response.render('review', {title: 'StarpowerFM', review: 'An album review!'});
});

module.exports = router;