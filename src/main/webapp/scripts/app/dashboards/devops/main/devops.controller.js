'use strict'

angular.module('spadeApp')
.controller('DevOpsController',	["$scope", "$state", "$http", "$mdDialog", "resolveUser", "Principal", function($scope, $state, $http, $mdDialog, resolveUser, Principal) {
	$scope.projects = [];
	$scope.devProjects = [];
	$scope.currentUser = resolveUser;
	console.log($scope.currentUser);
	for (var p in $scope.currentUser.projects){
		var proj = $scope.currentUser.projects[p];
		console.log(proj);
		  $http.get("spade/api/projects/"+proj)
			.then(function(response) {
				console.log(response.data);
				$scope.projects.push(response.data.items[0]);
//				$scope.info = data;
			});
	}
	
	//$scope.devProjects.push("Select Project");
	for (var i = 0; i < $scope.projects.length; i++) {
		console.log(i);
		if($scope.projects[i].projName !== "demo"){
			$scope.devProjects.push($scope.projects[i].projName);
		}
		console.log($scope.projects[i].projName);
	}
	console.log($scope.projects);
	console.log($scope.devProjects);

	$('select.selectpicker').on('change', function(){
		var selected = $('.selectpicker option:selected').text();
		console.log(selected);
		$state.go("devopsDash",{id:selected});

//		$location.path('/dashboard/'+selected);

	});
	
	$scope.hasPermission = Principal.hasPermission;
	
	$scope.setCurrentProject = function(project){
		console.log(project);
		$state.go("devopsDash", { id : project.projName });
	};
	
	$scope.spadeInfo = function(ev) {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .title("Project Code Metrics")
	        .content("DevOps Project Selection")
	        .ariaLabel("Code Metrics Info")
	        .ok("Close")
	        .targetEvent(ev)
	    );
	  };
}])
.factory('UserService', function ($http, $cookies) {
			return {
				getUser: function() {
					var promise = $http.get("spade/api/users/"+$cookies.currentUser)
					.then(function(response) {
						console.log(response.data.items[0]);
						return response.data.items[0];
					});
             return promise;
         }
	 }
	 
	 })
.directive('selectpicker', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.selectpicker($parse(attrs.selectpicker)());
          element.selectpicker('refresh');
          
          scope.$watch(attrs.ngModel, function (newVal, oldVal) {
            scope.$parent[attrs.ngModel] = newVal;
            scope.$evalAsync(function () {
              if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
              element.selectpicker('refresh');
            });
          });
          
          scope.$on('$destroy', function () {
            scope.$evalAsync(function () {
              element.selectpicker('destroy');
            });
          });
        }
      };
    }]);