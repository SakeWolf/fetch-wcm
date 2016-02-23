var express = require('express');

var bodyParser = require('body-parser');

var router = express.Router();

router.route('/')
.get(function (request, response) {
	response.render('login', {});
});

module.exports = router;