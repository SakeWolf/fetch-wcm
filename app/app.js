(function() {
	var express = require('express');
	var app = express();

	app.get('/', function(request, response) {
		response.send('Hi!');
	});
	
	console.log("Initializing server on port 3000...");
	app.listen(3000);
})();
