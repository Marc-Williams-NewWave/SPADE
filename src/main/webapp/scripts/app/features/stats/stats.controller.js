'use strict'

angular.module('spadeApp').controller('StatsController', [ "$scope", "$http", "resolveSlaves", "resolveTasks", "resolvePods", function($scope, $http, resolveSlaves, resolveTasks, resolvePods){

	$scope.slaves = resolveSlaves.items;
	$scope.tasks = resolveTasks.items;
	$scope.pods = resolvePods.items;
	
	for (var i=0; i < $scope.slaves.length; i++){
		var slave = $scope.slaves[i];
		slave.cpuData = [];
		slave.memData = [];
		slave.diskData = [];
		var cpuTotal = 0;
		var memTotal = 0;
		var diskTotal = 0;
		for (var j=0; j < $scope.tasks.length; j++){
			var color = 'rgb(' + Math.floor(Math.random() * 255) 
			+ ',' + Math.floor(Math.random() * 255) 
			+ ',' + Math.floor(Math.random() * 255) + ')';
			var task = $scope.tasks[j];
			console.log()
			if (task.slaveId === slave.id){
				cpuTotal += task.cpuPercent;
				memTotal += task.memPercent;
				diskTotal += task.diskPercent;
				slave.cpuData.push({label: task.podName, value: task.cpuPercent, color: color, suffix: "%"});
				slave.memData.push({label: task.podName, value: task.memPercent, color: color, suffix: "%"});
				slave.diskData.push({label: task.podName, value: task.diskPercent, color: color, suffix: "%"});
			}
		}
		slave.cpuData.push({label: "unused", value: 100-cpuTotal, color: "grey"});
		slave.memData.push({label: "unused", value: 100-memTotal, color: "white"});
		slave.diskData.push({label: "unused", value: 100-diskTotal, color: "grey"});
}
	function drawCharts(){
		for (var i=0; i < $scope.slaves.length; i++){
			var slave = $scope.slaves[i];
			slave.cpuData = [];
			slave.memData = [];
			slave.diskData = [];
			var cpuTotal = 0;
			var memTotal = 0;
			var diskTotal = 0;
			for (var j=0; j < $scope.tasks.length; j++){
				var color = 'rgb(' + Math.floor(Math.random() * 255) 
				+ ',' + Math.floor(Math.random() * 255) 
				+ ',' + Math.floor(Math.random() * 255) + ')';
				var task = $scope.tasks[j];
				console.log()
				if (task.slaveId === slave.id){
					console.log(task.slaveId)
					console.log(slave.id)

					cpuTotal += task.cpuPercent;
					memTotal += task.memPercent;
					diskTotal += task.diskPercent;
					slave.cpuData.push({label: task.podName, value: task.cpuPercent, color: color, suffix: "%"});
					slave.memData.push({label: task.podName, value: task.memPercent, color: color, suffix: "%"});
					slave.diskData.push({label: task.podName, value: task.diskPercent, color: color, suffix: "%"});
				}
			}
			slave.cpuData.push({label: "unused", value: 100-cpuTotal, color: "grey"});
			slave.memData.push({label: "unused", value: 100-memTotal, color: "white"});
			slave.diskData.push({label: "unused", value: 100-diskTotal, color: "grey"});
	}
	}
	$scope.options = {thickness: 30};
	$scope.drawCharts = drawCharts();
}])
.factory('SlaveService', function ($http) {
	 return {
		    getSlaves: function() {
         	var promise = $http.get("http://192.168.4.8:8080/spade/api/slaves")
         	.then(function(response) {
         		return response.data;
         	});
         	
             return promise;
         }
	 }
	 
})
.factory('PodService', function ($http) {
	 return {
		    getPods: function() {
         	var promise = $http.get("http://192.168.4.8:8080/spade/api/pods")
         	.then(function(response) {
         		return response.data;
         	});
         	
             return promise;
         }
	 }
	 
})
.factory('TaskService', function ($http) {
	 return {
		    getTasks: function() {
         	var promise = $http.get("http://192.168.4.8:8080/spade/api/tasks")
         	.then(function(response) {
         		return response.data;
         	});
         	
             return promise;
         }
	 }
	 
});