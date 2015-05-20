'use strict'

angular.module('spadeApp')
.controller('DevOpsController',	["$scope", "$state", "$mdDialog", "resolveSelect", function($scope, $state, $mdDialog, resolveSelect) {
	$scope.devProjects = [];
	//$scope.devProjects.push("Select Project");
	for (var i = 0; i < resolveSelect.length; i++) {
		if(resolveSelect[i].projName !== "demo"){
			$scope.devProjects.push(resolveSelect[i].projName);
		}
		console.log(resolveSelect[i].projName);
	}
	console.log($scope.devProjects);

	$('select.selectpicker').on('change', function(){
		var selected = $('.selectpicker option:selected').text();
		console.log(selected);
		$state.go("devopsDash",{id:selected});

//		$location.path('/dashboard/'+selected);

	});
	
	$scope.setCurrentProject = function(project){
		console.log(project);
		$state.go("devopsDash", { id : project });
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
}]).factory('SelectService', function ($http) {
	 return {
		    findAllProj: function() {
	        var promise = $http.get('spade/api/projects')//$http.get('app/rest/projectss')
	             	.then(function (response) {
	             		console.log(response.data);
	                 return response.data.items;
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