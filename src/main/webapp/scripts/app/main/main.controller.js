'use strict';

angular.module('spadeApp').controller('MainController', function($scope, Principal, $http) {

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
			var json = {
					"api" : "v0.0.4",
					"time" : 1425659436363,
					"label" : "extra",
					"items" : [ {
						"name" : "demo",
						"description" : "Demo Project",
						"environments" : [],
						"users" : [],
						"images" : [ "partlab/ubuntu-mongodb",
								"bradams/devops:cluster", "sewatech/modcluster" ]
					},{
						"name" : "dr.suess",
						"description" : "Sam's Sample",
						"environments" : [],
						"users" : [],
						"images" : [ "partlab/ubuntu-mongodb",
								"bradams/devops:cluster", "sewatech/modcluster" ]
					},{
						"name" : "DC",
						"description" : "Justice League",
						"environments" : [],
						"users" : [],
						"images" : [ "partlab/ubuntu-mongodb",
								"bradams/devops:cluster", "sewatech/modcluster" ]
					} ]
				};
			$scope.projects = json.items;
			Principal.identity().then(function(account) {
				$scope.account = account;
				$scope.isAuthenticated = Principal.isAuthenticated;
			});
		});
