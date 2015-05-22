'use strict';

angular.module('spadeApp')
	 .controller('MainController', function($scope, $rootScope, $state, $cookies, $mdDialog, $modal, resolveCurrentUser, resolveCurrentProj, Principal, Auth, $http, templateService) {

	//var currentUser = $cookies.get('currentUser');
	//var currentProj = $cookies.get('currentProj');
	$scope.currentUser = $cookies.currentUser;
	$scope.currentProj = $cookies.currentProj;
	$rootScope.currentUser = $cookies.currentUser;
	$rootScope.currentProj = $cookies.currentProj;
	
	//if (Principal.hasPermission("PERM_"))
	
	console.log($scope.currentUser+", "+$scope.currentProj);
	
	var app = this;
	app.closeAlert = function () {
        app.reason = null;
    };
	
	function launchMenu(){
		var projMenuModal = $modal.open({
			templateUrl: 'scripts/app/main/projMenu.html',
			controller: 'ProjMenuController',
			controllerAs: 'modal',
			resolve: {
            	resolveCurrentProj:['CurrentProjService', function (projService) {
                    return projService.getProj();
                }]
            }
		});

		projMenuModal.result
        	.then(function (data) {
        		app.closeAlert();
        		app.summary = data;
        	}, function (reason) {
        		app.reason = reason;
        	});
	};
	
	$scope.setCurrentProject = function(proj){
		$scope.currentProj = proj;
		$cookies.currentProj = proj;
		launchMenu();
	}
	
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
		  
//		  $http.get("spade/api/users/"+$scope.currentUser)
//			.success(function(data) {
//					console.log(data);
//					$scope.user = data.items[0];
//					console.log($scope.user.projects);
////					$scope.info = data;
//				});
		  //$scope.projects = ProjectService.getProjects();
		  $scope.user = resolveCurrentUser;
		  $scope.projects = [];
		  console.log($scope.user.projects);
			for (var p in $scope.user.projects){
				var proj = $scope.user.projects[p];
				console.log(proj);
				  $http.get("spade/api/projects/"+proj)
					.then(function(response) {
							console.log(response.data);
							$scope.projects.push(response.data.items[0]);
//							$scope.info = data;
					});
			}
		  
		  console.log($scope.projects);

			$scope.logout = function () {
	            Auth.logout();
	            $state.go('login');
	        };
			
			Principal.identity().then(function(account) {
				$scope.account = account;
				$scope.isAuthenticated = Principal.isAuthenticated;
			});
})
.controller('ProjMenuController', function($scope, $state, $cookies, $modalInstance, resolveCurrentProj, Principal) {
	$scope.hasPermission = Principal.hasPermission;
	$scope.dismiss = $modalInstance.dismiss;
	$scope.project = resolveCurrentProj;
	$scope.progress = false;
	console.log($scope.project.projName);
	
	$scope.checkForDevOps = function(){
		if ($scope.project.projName !== ""){
			return false;
		} else return true;
	};
	
	$scope.moveToDevOps = function(){
		console.log("Moving to DevOps");
		$scope.progress = true;
		$state.go('devopsDash', { id : $scope.project.projName});
	};
})
.factory('CurrentProjService', function ($http, $cookies) {
			return {
				getProj: function() {
					var promise = $http.get("spade/api/projects/"+$cookies.currentProj)
					.then(function(response) {
						console.log(response.data.items[0]);
						return response.data.items[0];
					});
             return promise;
         }
	 }
	 
	 })
.factory('CurrentUserService', function ($http, $cookies) {
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
	 
	 });
