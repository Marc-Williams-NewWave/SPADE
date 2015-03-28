'use strict'
angular.module('spadeApp')
.controller('StatsTableController',	["$scope", "$http", "resolvePods",	function($scope, $http, resolvePods) {
	
	$scope.pods = resolvePods.items;
	
	$scope.headers = [
	    "Server Name",
	    "Project",
	    "Containers",
	    "Host",
	    "Endpoints",
	    "Status",
	    "CPU"
	];
	
	$scope.rowCollection = [
	    {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
	    {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
	    {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
	];
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