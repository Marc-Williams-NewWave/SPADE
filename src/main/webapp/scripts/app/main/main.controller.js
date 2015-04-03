'use strict';

angular.module('spadeApp').controller('MainController', function($scope, $state, Principal, Auth, $http,templateService) {


			$http.get("http://192.168.4.8:8080/spade/api/proj")
				.success(function(data) {
						console.log(data);
						$scope.projects = data.items;
//						$scope.info = data;
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
					}]
				};
//			$scope.projects = json.items;
			
//			var json = {
//					"api" : "v0.0.4",
//					"time" : 1425659436363,
//					"label" : "extra",
//					"items" : [ {
//						"name" : "demo",
//						"description" : "Demo Project",
//						"environments" : [],
//						"users" : [],
//						"images" : [ "partlab/ubuntu-mongodb",
//								"bradams/devops:cluster", "sewatech/modcluster" ]
//					}]}
//			
//			$scope.projects = json.items;
			
			
//			$scope.defaultPod2 = {
//         			name : '',
//         			os: 'None Selected',
//                   	app : 'None Selected',
//                   	replicas : 0
//                   };
//        	 console.log($scope.defaultPod2);
//        	 
//        	 
//        	 $scope.templateFactoryService = templateService;
//        	 
//        	 
//        	 $scope.templateFactoryService.addItem($scope.defaultPod2);

			$scope.logout = function () {
	            Auth.logout();
	            $state.go('login');
	        };
			
			Principal.identity().then(function(account) {
				$scope.account = account;
				$scope.isAuthenticated = Principal.isAuthenticated;
			});
		});
