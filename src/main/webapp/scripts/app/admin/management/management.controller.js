'use strict';

angular.module('spadeApp')
	 .controller('ManagementController', function($scope, $state, $cookies, $mdDialog, resolveUsers, resolveRoles, Principal, Auth, $http) {

	
	$scope.currentUser = $cookies.currentUser;
	$scope.currentProj = $cookies.currentProj;
	
	$scope.setCurrentProject = function(proj){
		$scope.currentProj = proj;
		$cookies.currentProj = proj;
	}
	
	function updateRoles(user){	
		var newRoles = $scope.roles;
		
		for (var r in user.roles){
			newRoles = newRoles.filter(function(item){
				return item._id != user.roles[r]._id;
			});
			console.log(newRoles);
		}
		return newRoles;
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
		  
		  //$scope.roles = [ "admin_role", "brad_role", "chris_role", "devin_role", "eric_role" ]
		  $scope.roles = resolveRoles;
		  $scope.displayRoles = [];
		  $scope.selectedUser = {};
		  function selectUser(user){
			  console.log(user);
			  var temp = JSON.parse(user);
			  console.log(temp);
			  $scope.displayRoles = updateRoles(temp);
			  //$scope.selectedUser.selected = true;
		  }
		  
		  $scope.selectUser = selectUser;
		  
		  // Need to implement this for users
//		  $scope.changeSelection = function(pod) {
//				if (pod.$selected){
//					$scope.selectedPod = pod;
//				} else {
//					$scope.selectedPod = {};
//				}
//			}
		  
		  $scope.addRole = function(user, role){
			  var temp = JSON.parse(user);
			  console.log(temp);
			  console.log(role);
			  temp.roles.push(role);
			  console.log(temp);
			  $http.post("http://localhost:8081/spade/api/users/", temp)
				.then(function(response) {
					console.log(response.data.items);
				});
			  // Send off updated user info to back end
		  }
		  
		  $scope.permissions = [
		                     { _id: "DASHBOARD_VIEW", selected: true },
		                     { _id: "RESOURCE_CREATE", selected: false },
		                     { _id: "RESOURCE_VIEW", selected: false },
		                     { _id: "CODE_DEPLOY", selected: false },
		                     { _id: "STATS_VIEW", selected: false },
		                     { _id: "METRICS_VIEW", selected: false },
		                     { _id: "BILLING_VIEW", selected: false },
		                     { _id: "REQUIREMENTS_VIEW", selected: false }
		                   ];
		  
		  $scope.users = resolveUsers.map(function(item){
			  console.log(item);
				return item;
			});
		  console.log($scope.users);
			$scope.logout = function () {
	            Auth.logout();
	            $state.go('login');
	        };
			
			Principal.identity().then(function(account) {
				$scope.account = account;
				$scope.isAuthenticated = Principal.isAuthenticated;
			});
		})
		.factory('UsersService', function ($http) {
			return {
				getUsers: function() {
					var temp = $http.get("http://localhost:8081/spade/api/users")
					.then(function(response) {
						console.log(response.data.items);
						return response.data.items;
					});
//					var promise = temp.map(function(item){
//						return JSON.parse(item);
//					});
             return temp;
         }
	 }
	 
	 })
	 .factory('RolesService', function ($http) {
			return {
				getRoles: function() {
					var temp = $http.get("http://localhost:8081/spade/api/roles")
					.then(function(response) {
						console.log(response.data.items);
						return response.data.items;
					});
//					var promise = temp.map(function(item){
//						return JSON.parse(item);
//					});
             return temp;
         }
	 }
	 
	 });
