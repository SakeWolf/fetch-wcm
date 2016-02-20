var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.get('/', function (request, response) {
	response.render('index', {title: 'StarpowerFM', message: 'hOI! i\'m hTML!'});
});

var blog = require('./routes/blog');
app.use('/blog', blog);

module.exports = app;