/**
 * 
 */

angular.module('spadeApp').controller('StatsController', function($scope, $http){
	$scope.hello = "world";
	$scope.something = 'somethingelse';
	$http.get("http://192.168.0.95:8080/spade/api/proj")
	.success(function(data) {
			console.log(data);
			$scope.info = data;
		})
		
	.error(function(data, status, headers, config) {
		$scope.info = data;
		$scope.projects = data.items;

		console.log(data.items);
		console.log(data);
		console.log(status);
		console.log(headers);
		console.log(config);
});
});