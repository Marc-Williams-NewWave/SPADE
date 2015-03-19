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
	
	var slaves = [];
	
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
	
	$http.get("http://192.168.0.95:8080/spade/api/tasks")
	.success(function(data) {
			console.log(data);
			//$scope.pods_info = data;
			$scope.tasks = data.items;
		})
		
	.error(function(data, status, headers, config) {
		$scope.tasks_info = data;
		$scope.tasks = data.items;

		console.log(data.items);
		console.log(data);
		console.log(status);
		console.log(headers);
		console.log(config);
	});
	
	function getTaskPercent(tasks,pod){
		for (task in tasks){
			var taskId = task.id;
			console.log(taskId);
			var slaveId = pod.attributes.k8s_mesosphere_io/taskId;
			console.log(slaveId)
			if (taskId === slaveId){
				$scope.percent = task.cpuPercent;
			}
		}
	}
	
	$scope.percent = 12.5;
    $scope.options = {
        animate:{
            duration:1000,
            enabled:true
        },
        barColor:'#2C3E50',
        scaleColor:'#DFEe0E0',
        lineWidth:5,
        lineCap:'circle'
    };
});