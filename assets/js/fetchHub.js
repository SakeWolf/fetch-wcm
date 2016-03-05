(function() {
	var app = angular.module('fetchHub', []);

	app.controller('HubController', ['$scope', 'HubService', function ($scope, Hub) {
		$scope.loadAll = function () {
			Hub.parseAll()
			.then(function(response) {
				$scope.entries = response.data;
			});
		};
	}]);

	app.factory('HubService', ['$http', function ($http) {
		return {
			parseAll: function() {
				return $http.get('/fetch/all');
			}
		};
	}]);
})();