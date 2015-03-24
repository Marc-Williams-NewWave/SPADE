
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
			//slave.data.reverse();
	}
		//return data;
	}
	$scope.options = {thickness: 50};
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
}])
.controller('AppCtrl', function ($scope, $log) {
    var tabs = [
      { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."},
      { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs."},
      { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
      { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
      { title: 'Five', content: "If you remove a tab, it will try to select a new one."},
      { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
      { title: 'Seven', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."},
      { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"},
      { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs."},
      { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!"}
    ];
    $scope.tabs = tabs;
    $scope.selectedIndex = 2;
    $scope.$watch('selectedIndex', function(current, old){
      if ( old && (old != current)) $log.debug('Goodbye ' + tabs[old].title + '!');
      if ( current )                $log.debug('Hello ' + tabs[current].title + '!');
    });
    $scope.addTab = function (title, view) {
      view = view || title + " Content View";
      tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
      for (var j = 0; j < tabs.length; j++) {
        if (tab.title == tabs[j].title) {
          $scope.tabs.splice(j, 1);
          break;
        }
      }
    };
  });