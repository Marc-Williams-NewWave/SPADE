'use strict';

angular.module('spadeApp').controller(
		'MainController',
		function($scope, Principal, $http) {

			$http.get("http://192.168.0.95:8080/spade/api/proj")
				.success(function(data) {
						console.log(data);
						$scope.info = data;
					})
					
				.error(function(data, status, headers, config) {
					$scope.info = data;
					$scope.projects = data.items;

					console.log(data.items);
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
			});

//			$scope.projects = json.items;
			Principal.identity().then(function(account) {
				$scope.account = account;
				$scope.isAuthenticated = Principal.isAuthenticated;
			});
		});
