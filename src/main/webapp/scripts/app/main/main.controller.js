'use strict';

angular.module('spadeApp')
	 .controller('MainController', function($scope, $state, $cookies, $mdDialog, resolveProjects, ProjectService, Principal, Auth, $http, templateService) {

	//var currentUser = $cookies.get('currentUser');
	//var currentProj = $cookies.get('currentProj');
	$scope.currentUser = $cookies.currentUser;
	$scope.currentProj = $cookies.currentProj;
	
	console.log($scope.currentUser+", "+$scope.currentProj);
	
	$scope.spadeInfo = function(ev) {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .title("SPADE")
		        .content("NewWave’s Self-Service Portal And Dashboard Environment is a next generation provisioning, deployment, and monitoring dashboard. " +
		        		"SPADE manages the resources for each of your projects and allows you to monitor performance and metrics. \n" +
		        		"SPADE puts the power of infrastructure management in the hands of your team with just few clicks. " +
		        		"Applications built in container-based environments shift focus from technology maintenance to your business requirements. " +
		        		"Multi-container environments combined with DevOps methodology significantly reduce the time and cost needed for setup and maintenance.")
		        .ariaLabel("Spade Info")
		        .ok("Welcome to SPADE!")
		        .targetEvent(ev)
		    );
		  };
		  
//		  $http.get("http://localhost:8081/spade/api/users/"+$scope.currentUser)
//			.success(function(data) {
//					console.log(data);
//					$scope.user = data.items[0];
//					console.log($scope.user.projects);
////					$scope.info = data;
//				});
		  function popProjs(){
			  ProjectService.getProjects()
			  .then(function(response){
				$scope.projects = response;
			  });
		  }
		  //popProjs();
		  //$scope.projects = ProjectService.getProjects();
		  $scope.user = resolveProjects;
		  $scope.projects = [];
		  console.log($scope.user.projects);
			for (var p in $scope.user.projects){
				var proj = $scope.user.projects[p];
				console.log(proj);
				  $http.get("http://localhost:8081/spade/api/proj/"+proj)
					.then(function(data) {
							console.log(data.items[0]);
							$scope.projects.push(data.items[0]);
//							$scope.info = data;
					});
			}
		  
		  console.log($scope.projects);
//		  console.log($scope.user);
//		  alert($scope.user);
//		  $scope.projects = [];
//		  for (var p in $scope.user.projects){
//			  $http.get("http://localhost:8081/spade/api/proj/"+p.name)
//				.success(function(data) {
//						console.log(data.items[0]);
//						$scope.projects.push(data.items[0]);
////						$scope.info = data;
//					})
//					
//				.error(function(data, status, headers, config) {
//					$scope.info = data;
//					$scope.projects.push(data.items[0]);
//					
//					console.log(data.items);
//					console.log(data);
//					console.log(status);
//					console.log(headers);
//					console.log(config);
//			});
//		  }
		  
			

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
		})
		.factory('ProjectService', function ($http, $cookies) {
			return {
				getProjects: function() {
					var promise = $http.get("http://localhost:8081/spade/api/users/"+$cookies.currentUser)
					.then(function(response) {
						console.log(response.data.items[0]);
						return response.data.items[0];
					});
					//console.log(promise);
//					var projects = [];
//					console.log(promise.projects);
//					for (var p in promise.projects){
//						  $http.get("http://localhost:8081/spade/api/proj/"+p.name)
//							.then(function(data) {
//									console.log(data.items[0]);
//									projects.push(data.items[0]);
////									$scope.info = data;
//							});
//					}
             return promise;
         }
	 }
	 
	 });
