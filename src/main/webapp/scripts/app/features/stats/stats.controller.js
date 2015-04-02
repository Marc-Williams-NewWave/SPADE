'use strict'
angular.module('spadeApp').controller('StatsController', 
		[ "$scope", "$http", "$modal", "$state", "$timeout", "resolveSlaves", "resolveTasks", "resolvePods", 
        function($scope, $http, $modal, $state, $timeout, resolveSlaves, resolveTasks, resolvePods){

	$scope.slaves = resolveSlaves.items;
	function compare(a,b) {
		  if (a.hostname < b.hostname)
		     return -1;
		  if (a.hostname > b.hostname)
		    return 1;
		  return 0;
	}
	$scope.slaves.sort(compare);
	$scope.tasks = resolveTasks.items;
	$scope.pods = resolvePods.items;
	
	$scope.create = function () {
        var modalInstance = $modal.open({
            templateUrl: 'scripts/app/features/iaas/iaas.html',
            controller: 'ModalCtrl',
            controllerAs: 'modal'
        });

        modalInstance.result
            .then(function (data) {
                $scope.create.closeAlert();
                $scope.create.summary = data;
                $state.go('stats', { "reload": true })
            }, function (reason) {
            	$scope.create.reason = reason;
            	$state.go('stats', { "reload": true })
            });
    };
	
	$scope.options2 = {
            chart: {
                type: 'pieChart',
                height: 250,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showLabels: false,
                donut: true,
                donutRatio: 0.45,
                transitionDuration: 500,
                labelThreshold: 0.01,
                //showLegend: false,
                legend: {
                    margin: {
                        top: 5,
                        right: 30,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
	$scope.data = [
	               {
	                   label: "One",
	                   value: 5
	               },
	               {
	                   label: "Two",
	                   value: 2
	               },
	               {
	                   label: "Three",
	                   value: 9
	               },
	               {
	                   label: "Four",
	                   value: 7
	               },
	               {
	                   label: "Five",
	                   value: 4
	               },
	               {
	                   label: "Six",
	                   value: 3
	               },
	               {
	                   label: "Seven",
	                   value: .5
	               }
	           ];
	$scope.chartConfig = {
			refreshDataOnly: true
	}
	
	for (var i=0; i < $scope.slaves.length; i++){
		var slave = $scope.slaves[i];
		slave.cpuData = [];
		slave.memData = [];
		slave.diskData = [];

		console.log(i);
		var cpuTotal = 0;
		var memTotal = 0;
		var diskTotal = 0;
		for (var j=0; j < $scope.tasks.length; j++){
			var color = 'rgb(' + Math.floor(Math.random() * 255) 
			+ ',' + Math.floor(Math.random() * 255) 
			+ ',' + Math.floor(Math.random() * 255) + ')';
			var task = $scope.tasks[j];
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
		slave.memData.push({label: "unused", value: 100-memTotal, color: "grey"});
		slave.diskData.push({label: "unused", value: 100-diskTotal, color: "grey"});
}
	$scope.refresh = function () {
    	alert("TIMEOUT");
    	$scope.$apply();
    	//$scope.api.refresh();
    };
	function drawCharts(){
		for (var i=0; i < $scope.slaves.length; i++){
			var slave = $scope.slaves[i];
			slave.cpuData = [];
			slave.memData = [];
			slave.diskData = [];

			console.log(i);

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
			slave.memData.push({label: "unused", value: 100-memTotal, color: "grey"});
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