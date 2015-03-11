'use strict';

angular.module('spadeApp').controller('IaasController',
		function($scope, Principal) {

			$scope.users = [ 
			{
				id : 1,
				name : "Tricia",
				nickname : "Sugar Pie",
				projects: [{"name":"A"},{"name":"C"},{"name":"B"},{"name":"B"},{"name":"B"},{"name":"B"}]	
				} ];

			$scope.name = "Bob";

			Principal.identity().then(function(account) {
				$scope.account = account;
				$scope.isAuthenticated = Principal.isAuthenticated;
			});
		});
