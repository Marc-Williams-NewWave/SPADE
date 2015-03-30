<<<<<<< HEAD

'use strict'
angular.module('spadeApp').controller('StatsController', [ "$scope", "$http", function($scope, $http){
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
	
	$scope.slaves = [
			{
				"hostname": "first-host",
				"id": "first-id"
			},
			{
				"hostname": "second-host",
				"id": "second-id"
			}
	];
	$scope.tasks = [
	     			{
	     				cpuPercent: 12.5,
	     				memPercent: 2,
	     				diskPercent: 10,
	     				slaveId: "first-id",
	     				podName: "mongodb"
	     			},
	     			{
	     				cpuPercent: 30,
	     				memPercent: 2,
	     				diskPercent: 10,
	     				slaveId: "first-id",
	     				podName: "wildfly"
	     			},
	     			{
	     				cpuPercent: 12.5,
	     				memPercent: 2,
	     				diskPercent: 10,
	     				slaveId: "second-id",
	     				podName: "apache"
	     			}
	     	];
//	function drawCharts(){
//		var data = [];
//		for (var i =0; i < $scope.slaves.length; i++){
//			data = [];
//			var slave = $scope.slaves[i];
//			
//			color = 'rgb(' + Math.floor(Math.random() * 255) 
//				+ ',' + Math.floor(Math.random() * 255) 
//				+ ',' + Math.floor(Math.random() * 255) + ')';
//			for (var j=0; j < $scope.tasks.length; j++){
//				var task = $scope.tasks[j];
//				console.log()
//				if (task.slaveId === slave.id){
//					console.log(task.slaveId)
//					console.log(slave.id)
//					data.push({label: task.podName, value: task.cpuPercent, color: color, suffix: "%"});
//				}
//			}
//		}
//		return data;
//	}
	
	function drawCharts(){
		var data = [];
		for (var i=0; i < $scope.slaves.length; i++){
			var slave = $scope.slaves[i];
			slave.data = [];
			console.log(i);
			var total = 0;
=======
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
>>>>>>> remotes/origin/Dev-Brandon
			for (var j=0; j < $scope.tasks.length; j++){
				var color = 'rgb(' + Math.floor(Math.random() * 255) 
				+ ',' + Math.floor(Math.random() * 255) 
				+ ',' + Math.floor(Math.random() * 255) + ')';
				var task = $scope.tasks[j];
				console.log()
				if (task.slaveId === slave.id){
					console.log(task.slaveId)
					console.log(slave.id)
<<<<<<< HEAD
					total += task.cpuPercent;
					slave.data.push({label: task.podName, value: task.cpuPercent, color: color, suffix: "%"});
				}
			}
			slave.data.push({label: "unused", value: 100-total, color: "grey"});
			//slave.data.reverse();
	}
		return data;
	}
	$scope.options = {thickness: 25};
	$scope.drawCharts = drawCharts();
	
//	$scope.data = [
//	               {label: "one", value: 12.2, color: "red"}, 
//	               {label: "two", value: 45, color: "#00ff00"},
//	               {label: "three", value: 10, color: "rgb(0, 0, 255)"}
//	             ];
	
	
//	$scope.percent = 12.5;
//    $scope.options = {
//        animate:{
//            duration:1000,
//            enabled:true
//        },
//        barColor:'#2C3E50',
//        scaleColor:'#DFEe0E0',
//        lineWidth:5,
//        lineCap:'circle'
//    };
}])
.service("ChartService", function(){
	
})
.directive("firstone", [ "$scope", function($scope){
	return {
	template: "<pie-chart data='data' options='options'></pie-chart>",
	scope: {
		slave: '=slave',
		tasks: '=tasks'
	},
	link: [ "$scope", function($scope,element,attrs){
		var data = [];
	
			var slave = attrs.slave;
			console.log(slave);
			color = 'rgb(' + Math.floor(Math.random() * 255) 
				+ ',' + Math.floor(Math.random() * 255) 
				+ ',' + Math.floor(Math.random() * 255) + ')';
			for (var j=0; j < attrs.tasks.length; j++){
				var task = attrs.tasks[j];
				console.log()
				if (task.slaveId === slave.id){
					console.log(task.slaveId)
					console.log(slave.id)
					data.push({label: task.podName, value: task.cpuPercent, color: color, suffix: "%"});
				}
			}
	
		return data;
		
	}]
	}
}]);
=======
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
>>>>>>> remotes/origin/Dev-Brandon
