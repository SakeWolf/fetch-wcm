var express = require('express');
var app = express();

app.use(express.static('public'));

var blog = require('./routes/blog');
app.use('/blog', blog);

module.exports = app;