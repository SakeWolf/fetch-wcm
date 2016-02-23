var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.get('/', function (request, response) {
	response.render('index', {title: 'Wolf Chords', message: 'hOI! i\'m hTML!'});
});

var reviews = require('./routes/reviews');
app.use('/reviews', reviews);

var fetch = require('./routes/fetch');
app.use('/fetch', fetch);

module.exports = app;