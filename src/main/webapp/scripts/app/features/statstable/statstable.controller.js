'use strict'
angular.module('spadeApp').controller('StatsTableController', ["$scope", "$http", "resolvePods", function($scope, $http, resolvePods) {
	$scope.pods = resolvePods.items;
	$scope.headers = [
	    "Name",
	    "Id",
	    "Project",
	    "Stack",
	    "Containers",
	    "Host",
	    "Endpoints",
	    "Status"
	];
//	$scope.pods = [
//{ "id" : "spade-web-ls6k1", "uid" : "176defd9-d4b8-11e4-a0ad-fa163e3c002e", "creationTimestamp" : "2015-03-27T19:33:06Z", "selfLink" : "/api/v1beta2/pods/spade-web-ls6k1?namespace=default", "resourceVersion" : 37839, "namespace" : "default", "generateName" : "spade-web-", "annotations" : { "k8s_mesosphere_io/bindingHost" : "mesos-slave-2", "k8s_mesosphere_io/executorId" : "KubeleteExecutorID", "k8s_mesosphere_io/offerId" : "20150325-153337-806819607-5050-1451-O130149", "k8s_mesosphere_io/slaveId" : "20150211-155400-806819607-5050-4880-S11", "k8s_mesosphere_io/taskId" : "17ae140c-d4b8-11e4-a826-fa163e3c002e" }, "labels" : { "app" : "apache", "image" : "sewatech/modcluster", "stack": "spade-demo", "name" : "apache", "os" : "ubuntu", "project" : "demo", "type" : "apache-pod" }, "desiredState" : { "manifest" : { "version" : "v1beta2", "id" : "", "volumes" : null, "containers" : [ { "name" : "apache", "image" : "sewatech/modcluster", "ports" : [ { "hostPort" : 31080, "containerPort" : 80, "protocol" : "TCP" } ], "resources" : { "limits" : { "cpu" : "1" } }, "cpu" : 1000, "terminationMessagePath" : "/dev/termination-log", "imagePullPolicy" : "PullIfNotPresent", "capabilities" : {  } } ], "restartPolicy" : { "always" : {  } }, "dnsPolicy" : "ClusterFirst" } }, "currentState" : { "manifest" : { "version" : "", "id" : "", "volumes" : null, "containers" : null, "restartPolicy" : {  } }, "status" : "Running", "Condition" : [ { "kind" : "Ready", "status" : "Full" } ], "host" : "mesos-slave-2", "hostIP" : "23.23.23.51", "podIP" : "172.17.0.3", "info" : { "POD" : { "state" : { "running" : { "startedAt" : "2015-03-27T19:33:05Z" } }, "ready" : false, "restartCount" : 0, "podIP" : "172.17.0.3", "image" : "kubernetes/pause:latest", "imageID" : "docker://6c4579af347b649857e915521132f15a06186d73faa62145e3eeeb6be0e97c27", "containerID" : "docker://f421865b88398783b2560e764228afff9b62b8aa7caf76adfe766fd0bbb5d38e" }, "apache" : { "state" : { "running" : { "startedAt" : "2015-03-27T19:33:42Z" } }, "ready" : true, "restartCount" : 0, "image" : "sewatech/modcluster", "imageID" : "docker://004cb48fda8617a08b696c102ef8a9576f09817902fdfd5dd0d968c3863ad9eb", "containerID" : "docker://338d98e9e264e59cbc4522d4b16b47d5c8fb8feddf13744c1fdeabdd559ca167" } } } },
//{ "id" : "mongodb-controller-oh43e", "uid" : "ad81edc9-d48a-11e4-a0ad-fa163e3c002e", "creationTimestamp" : "2015-03-27T14:08:00Z", "selfLink" : "/api/v1beta2/pods/mongodb-controller-oh43e?namespace=default", "resourceVersion" : 33756, "namespace" : "default", "generateName" : "mongodb-controller-", "annotations" : { "k8s_mesosphere_io/bindingHost" : "mesos-slave-5", "k8s_mesosphere_io/executorId" : "KubeleteExecutorID", "k8s_mesosphere_io/offerId" : "20150325-153337-806819607-5050-1451-O116549", "k8s_mesosphere_io/slaveId" : "20150211-155400-806819607-5050-4880-S16", "k8s_mesosphere_io/taskId" : "adac52a7-d48a-11e4-a826-fa163e3c002e" }, "labels" : { "name" : "mongodb", "stack": "spade-demo", "project" : "mongo" }, "desiredState" : { "manifest" : { "version" : "v1beta2", "id" : "", "volumes" : [ { "name" : "data-mount", "source" : { "hostDir" : null, "emptyDir" : {  }, "persistentDisk" : null, "gitRepo" : null } } ], "containers" : [ { "name" : "mongodb", "image" : "mongo", "ports" : [ { "hostPort" : 31020, "containerPort" : 27017, "protocol" : "TCP" }, { "hostPort" : 31030, "containerPort" : 28017, "protocol" : "TCP" } ], "resources" : {  }, "volumeMounts" : [ { "name" : "data-mount", "mountPath" : "/var/data/mongo" } ], "terminationMessagePath" : "/dev/termination-log", "imagePullPolicy" : "PullIfNotPresent", "capabilities" : {  } } ], "restartPolicy" : { "always" : {  } }, "dnsPolicy" : "ClusterFirst" } }, "currentState" : { "manifest" : { "version" : "", "id" : "", "volumes" : null, "containers" : null, "restartPolicy" : {  } }, "status" : "Running", "Condition" : [ { "kind" : "Ready", "status" : "Full" } ], "host" : "mesos-slave-5", "hostIP" : "23.23.23.62", "podIP" : "172.17.0.2", "info" : { "POD" : { "state" : { "running" : { "startedAt" : "2015-03-27T14:08:05Z" } }, "ready" : false, "restartCount" : 0, "podIP" : "172.17.0.2", "image" : "kubernetes/pause:latest", "imageID" : "docker://6c4579af347b649857e915521132f15a06186d73faa62145e3eeeb6be0e97c27", "containerID" : "docker://21e8ee49ac6585845a33a94c2aa93ed3ff3ca70210ce9865ca2ea0cf209fa517" }, "mongodb" : { "state" : { "running" : { "startedAt" : "2015-03-27T14:08:28Z" } }, "ready" : true, "restartCount" : 0, "image" : "mongo", "imageID" : "docker://05976bd2eb65f3869b657f070a6f07ca3f6b16927238970a7796e5f4f3b2e64c", "containerID" : "docker://9c8022da53765d201eacc1233b39c30aaedb60cfee0ad2f9005c3430732cbf1d" } } } },
//{ "id" : "spade-db-0133o", "uid" : "17692738-d4b8-11e4-a0ad-fa163e3c002e", "creationTimestamp" : "2015-03-27T19:33:05Z", "selfLink" : "/api/v1beta2/pods/spade-db-0133o?namespace=default", "resourceVersion" : 37835, "namespace" : "default", "generateName" : "spade-db-", "annotations" : { "k8s_mesosphere_io/bindingHost" : "mesos-slave-4", "k8s_mesosphere_io/executorId" : "KubeleteExecutorID", "k8s_mesosphere_io/offerId" : "20150325-153337-806819607-5050-1451-O130150", "k8s_mesosphere_io/slaveId" : "20150211-155400-806819607-5050-4880-S13", "k8s_mesosphere_io/taskId" : "17a836fb-d4b8-11e4-a826-fa163e3c002e" }, "labels" : { "app" : "mongodb", "image" : "partlab/ubuntu-mongodb", "stack": "spade-demo", "name" : "mongodb", "os" : "ubuntu", "project" : "demo", "type" : "mongodb-pod" }, "desiredState" : { "manifest" : { "version" : "v1beta2", "id" : "", "volumes" : null, "containers" : [ { "name" : "mongodb", "image" : "partlab/ubuntu-mongodb", "ports" : [ { "hostPort" : 31017, "containerPort" : 27017, "protocol" : "TCP" } ], "resources" : { "limits" : { "cpu" : "1" } }, "cpu" : 1000, "terminationMessagePath" : "/dev/termination-log", "imagePullPolicy" : "PullIfNotPresent", "capabilities" : {  } } ], "restartPolicy" : { "always" : {  } }, "dnsPolicy" : "ClusterFirst" } }, "currentState" : { "manifest" : { "version" : "", "id" : "", "volumes" : null, "containers" : null, "restartPolicy" : {  } }, "status" : "Running", "Condition" : [ { "kind" : "Ready", "status" : "Full" } ], "host" : "mesos-slave-4", "hostIP" : "23.23.23.61", "podIP" : "172.17.0.4", "info" : { "POD" : { "state" : { "running" : { "startedAt" : "2015-03-27T19:33:05Z" } }, "ready" : false, "restartCount" : 0, "podIP" : "172.17.0.4", "image" : "kubernetes/pause:latest", "imageID" : "docker://6c4579af347b649857e915521132f15a06186d73faa62145e3eeeb6be0e97c27", "containerID" : "docker://d32312de11d198ca377e633d38aec13b4b23bf1258f444976c1dc6bce3f8540c" }, "mongodb" : { "state" : { "running" : { "startedAt" : "2015-03-27T19:33:06Z" } }, "ready" : true, "restartCount" : 0, "image" : "partlab/ubuntu-mongodb", "imageID" : "docker://ed600c32a4841bbc87aefd1600cf91efab7b4e457e0bd5abe10372c481592613", "containerID" : "docker://c0113cb8a95e5c09d67af471668275f5c85e522ba5a704f824a9ec3956e2533c" } } } },
//{ "id" : "spade-app-hh2gd", "uid" : "17734a7d-d4b8-11e4-a0ad-fa163e3c002e", "creationTimestamp" : "2015-03-27T19:33:06Z", "selfLink" : "/api/v1beta2/pods/spade-app-hh2gd?namespace=default", "resourceVersion" : 37843, "namespace" : "default", "generateName" : "spade-app-", "annotations" : { "k8s_mesosphere_io/bindingHost" : "mesos-slave-1", "k8s_mesosphere_io/executorId" : "KubeleteExecutorID", "k8s_mesosphere_io/offerId" : "20150325-153337-806819607-5050-1451-O130151", "k8s_mesosphere_io/slaveId" : "20150211-155400-806819607-5050-4880-S10", "k8s_mesosphere_io/taskId" : "17b45155-d4b8-11e4-a826-fa163e3c002e" }, "labels" : { "app" : "wildfly", "image" : "bradams/devops:wildfly-ubuntu", "stack": "spade-demo", "name" : "jboss", "os" : "ubuntu", "project" : "demo", "type" : "jboss-pod" }, "desiredState" : { "manifest" : { "version" : "v1beta2", "id" : "", "volumes" : null, "containers" : [ { "name" : "jboss", "image" : "bradams/devops:wildfly-ubuntu", "ports" : [ { "hostPort" : 31081, "containerPort" : 8080, "protocol" : "TCP" }, { "hostPort" : 31090, "containerPort" : 9990, "protocol" : "TCP" } ], "resources" : { "limits" : { "cpu" : "1" } }, "cpu" : 1000, "terminationMessagePath" : "/dev/termination-log", "imagePullPolicy" : "PullIfNotPresent", "capabilities" : {  } } ], "restartPolicy" : { "always" : {  } }, "dnsPolicy" : "ClusterFirst" } }, "currentState" : { "manifest" : { "version" : "", "id" : "", "volumes" : null, "containers" : null, "restartPolicy" : {  } }, "status" : "Running", "Condition" : [ { "kind" : "Ready", "status" : "Full" } ], "host" : "mesos-slave-1", "hostIP" : "23.23.23.50", "podIP" : "172.17.0.3", "info" : { "POD" : { "state" : { "running" : { "startedAt" : "2015-03-27T19:33:06Z" } }, "ready" : false, "restartCount" : 0, "podIP" : "172.17.0.3", "image" : "kubernetes/pause:latest", "imageID" : "docker://6c4579af347b649857e915521132f15a06186d73faa62145e3eeeb6be0e97c27", "containerID" : "docker://07e3dbe164f0a3424b17839eebf83a8dcd68cec5dc01925fe9ff492b1cd0f8b8" }, "jboss" : { "state" : { "running" : { "startedAt" : "2015-03-27T19:35:00Z" } }, "ready" : true, "restartCount" : 0, "image" : "bradams/devops:wildfly-ubuntu", "imageID" : "docker://66eecf419cc9430b483976d92e81a1da9df105c259b1ffc8da51dec3f277df1d", "containerID" : "docker://85bcdbc18c85c78a96a4c900616089b8d968028541dcd8498f50ad13a67061e2" } } } }
//	];
	
	$scope.displayedPods = [].concat($scope.pods);
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
.directive('mdTable', function () {
  return {
    restrict: 'E',
    scope: { 
      headers: '=', 
      content: '=', 
      sortable: '=', 
      filters: '=',
      customClass: '=customClass',
      thumbs:'=', 
      count: '=' 
    },
    controller: function ($scope,$filter,$window) {
      var orderBy = $filter('orderBy');
      $scope.tablePage = 0;
      $scope.nbOfPages = function () {
        return Math.ceil($scope.content.length / $scope.count);
      },
      	$scope.handleSort = function (field) {
          if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
      			    return new Array(num);
      };
      $scope.goToPage = function (page) {
        $scope.tablePage = page;
      };
    },
    template: angular.element(document.querySelector('#md-table-template')).html()
  }
})
.directive('mdColresize', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true
          
        });},100);
      });
    }
  }
})
.filter('startFrom',function (){
  return function (input,start) {
    start = +start;
    return input.slice(start);
  }
});