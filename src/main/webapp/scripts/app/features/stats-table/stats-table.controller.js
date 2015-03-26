'use strict'
angular.module('spadeApp')
.controller('StatsTableController',	["$scope", "$http", "resolvePods",	function($scope, $http, resolvePods) {
	
	$scope.pods = resolvePods.items;
	
}])
.factory('PodService', function($http) {
	return {
		getPods : function() {
			var promise = $http.get("http://192.168.4.8:8080/spade/api/pods")
			.then(function(response) {
				return response.data;
			});

			return promise;
		}
	}
})