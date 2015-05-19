'use strict'

angular.module('spadeApp')
.controller('DevopsController',	["$scope", "$state", "resolvedSelect", function($scope, $state, resolvedSelect) {
	$scope.devProjects = [];
	$scope.devProjects.push("Select Project");
	for (var i = 0; i < resolvedSelect.length; i++) {
		$scope.devProjects.push(resolvedSelect[i].name);
		console.log(resolvedSelect[i].name);
	}
	console.log($scope.devProjects);

	$('select.selectpicker').on('change', function(){
		var selected = $('.selectpicker option:selected').text();
		console.log(selected);
		$state.go("devopsDash",{id:selected});

//		$location.path('/dashboard/'+selected);

	});
}])
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