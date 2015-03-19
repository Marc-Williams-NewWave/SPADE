/**
 * 
 */

angular.module('spadeApp').controller('StatsController', function($scope, $http){
	$scope.hello = "world";
	$scope.something = 'somethingelse';
	$http.get("http://192.168.0.95:8080/spade/api/slaves")
	.success(function(data) {
			console.log(data);
			//$scope.slaves_info = data;
			$scope.slaves = data.items;
		})
		
	.error(function(data, status, headers, config) {
		$scope.slaves_info = data;
		$scope.slaves = data.items;

		console.log(data.items);
		console.log(data);
		console.log(status);
		console.log(headers);
		console.log(config);
	});
	
	
	
	$http.get("http://192.168.0.95:8080/spade/api/pods")
	.success(function(data) {
			console.log(data);
			//$scope.pods_info = data;
			$scope.pods = data.items;
		})
		
	.error(function(data, status, headers, config) {
		$scope.pods_info = data;
		$scope.pods = data.items;

		console.log(data.items);
		console.log(data);
		console.log(status);
		console.log(headers);
		console.log(config);
	});
	
});