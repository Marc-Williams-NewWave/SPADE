'use strict'
angular.module('spadeApp')
.controller('StatsTableController',
		["$scope", "$http", "$modal", "$filter", "$mdDialog", "$mdToast", "$state", "Auth", "resolvePods", "ngTableParams", 
		function($scope, $http, $modal, $filter, $mdDialog, $mdToast, $state, Auth, resolvePods, ngTableParams) {
	
			$scope.pageName = "Table View";
			$scope.switchPages = { "Resource":"stats", "Table":"statstable" };
			
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
                $state.go($state.current, {}, { "reload": true })
            }, function (reason) {
            	$scope.create.reason = reason;
            	$state.go($state.current, {}, { "reload": true })
            });
    };
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
	//var displayedPods = [].concat($scope.pods);
	$scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter: {
            //stack: 'M'       // initial filter
        },
        sorting: {
            //name: 'asc'     // initial sorting
        }
    }, {
        total: $scope.pods.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var filteredData = params.filter() ?
                    $filter('filter')($scope.pods, params.filter()) :
                    $scope.pods;
            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    $scope.pods;

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
	
	$scope.changeSelection = function(pod) {
		if (pod.$selected){
			$scope.selectedPod = pod;
		} else {
			$scope.selectedPod = {};
		}
//		alert(pod.$selected);
//		alert($scope.selectedPod.$selected);
//		for (item in $scope.pods){
//			if (item.$selected==true){
//				alert(item.$selected);
//			} else {
//				alert(item.$selected);
//			}
//		}
	}
	$scope.toastPosition = {
		    bottom: false,
		    top: false,
		    left: false,
		    right: true
	};
	$scope.getToastPosition = function() {
		    return Object.keys($scope.toastPosition)
		      .filter(function(pos) { return $scope.toastPosition[pos]; })
		      .join(' ');
	};
	$scope.showSimpleToast = function() {
	    $mdToast.show(
	      $mdToast.simple()
	        .content('Server Deleted!')
	        .position($scope.getToastPosition())
	        .hideDelay(2000)
	    );
	};
	
	$scope.showAlert = showAlert;
    
    function showAlert() {
       var confirm = $mdDialog.confirm()
          .title('Deletion Confirmed')
          .content('Server has been deleted')
          .ok('Close')
        $mdDialog
            .show( confirm ).then(function(){
            	$state.go($state.current, {}, { "reload": true })
            })
            
      }
	
	$scope.confirmDel = function(ev, pod) {
		if (pod === undefined || pod === null || pod.$selected === undefined){
			var confirm = $mdDialog.confirm()
		      //.parent(angular.element(document.body))
		      .title("No Server Selected")
		      .content("There is nothing selected")
		      .ariaLabel("Deleting resource")
		      .ok("Back")
		      .targetEvent(ev);
		    $mdDialog.show(confirm)
		      .then(function() {
		      $mdDialog.hide();
		    }, function() {
		      $mdDialog.hide();
		    });
		} else {
	    var confirm = $mdDialog.confirm()
	      //.parent(angular.element(document.body))
	      .title("Confirm deletion?")
	      .content("This operation cannot be undone")
	      .ariaLabel("Deleting resource")
	      .ok("Delete")
	      .cancel("Cancel")
	      .targetEvent(ev);
	    $mdDialog.show(confirm)
	      .then(function() {
	      $scope.delPod(pod);
	      $scope.showAlert();
	    }, function() {
	      $mdDialog.hide();
	    });
		}
	  };
	$scope.delPod = function(pod){
		var req = {
				 method: "DELETE",
				 url: "http://192.168.4.8:8080/spade/api/demo/controllers/" + pod.labels.controller
		};
//		alert(pod.labels.controller);
		$http(req).then(function(response) {
			$scope.delRes = response.data;
			console.log(response.data);
		});
	}
	$scope.statusColors = {
			"Running":"green",
			"Pending":"yellow",
			"Failed":"red"
	};
	$scope.logout = function () {
        Auth.logout();
        $state.go('login');
    };
//	$scope.statusColor = function(status){
//		var style;
//		switch (status){
//		case "Running":
//			style = "fill:green";
//			break;
//		case "Pending":
//			style = "fill:yellow";
//			break;
//		case "Failed":
//			style = "fill:red";
//			break;
//		default: "fill:yellow"
//		}
//		alert(style);
//		return style;
//	}
	
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
});