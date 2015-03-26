
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
			slave.memData.push({label: "unused", value: 100-memTotal, color: "white"});
			slave.diskData.push({label: "unused", value: 100-diskTotal, color: "grey"});
	}
	}
	$scope.options = {thickness: 30};
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

//.directive("firstone", [ "$scope", function($scope){
//	return {
//	template: "<pie-chart data='data' options='options'></pie-chart>",
//	scope: {
//		slave: '=slave',
//		tasks: '=tasks'
//	},
//	link: [ "$scope", function($scope,element,attrs){
//		var data = [];
//	
//			var slave = attrs.slave;
//			console.log(slave);
//			color = 'rgb(' + Math.floor(Math.random() * 255) 
//				+ ',' + Math.floor(Math.random() * 255) 
//				+ ',' + Math.floor(Math.random() * 255) + ')';
//			for (var j=0; j < attrs.tasks.length; j++){
//				var task = attrs.tasks[j];
//				console.log()
//				if (task.slaveId === slave.id){
//					console.log(task.slaveId)
//					console.log(slave.id)
//					data.push({label: task.podName, value: task.cpuPercent, color: color, suffix: "%"});
//				}
//			}
//	
//		return data;
//		
//	}]
//	}
//}])
.factory('SlaveService', function ($http) {
	 return {
		    getSlaves: function() {
         	var promise = $http.get("http://192.168.0.95:8080/spade/api/slaves")
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
         	var promise = $http.get("http://192.168.0.95:8080/spade/api/pods")
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
         	var promise = $http.get("http://192.168.0.95:8080/spade/api/tasks")
         	.then(function(response) {
         		return response.data;
         	});
         	
             return promise;
         }
	 }
	 
	 })
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