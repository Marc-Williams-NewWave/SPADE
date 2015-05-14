'use strict';

angular.module('spadeApp')
	 .controller('ManagementController', function($scope, $state, $cookies, $modal, $mdDialog, $filter, resolveLDAPUsers, resolveUsers, resolveRoles, resolvePermissions, resolveProjects, ngTableParams, Principal, Auth, $http) {

	
	$scope.currentUser = $cookies.currentUser;
	$scope.currentProj = $cookies.currentProj;
	
	$scope.setCurrentProject = function(proj){
		$scope.currentProj = proj;
		$cookies.currentProj = proj;
	}
	var app = this;
	app.closeAlert = function () {
        app.reason = null;
    };	

//	var passwdModal = $modal.open(
//    		{
//    	
//        templateUrl: 'scripts/app/admin/management/users/',
//        controller: 'ModalCtrl',
//        controllerAs: 'modal',
//    });
//
//    passwdModal.result
//        .then(function (data) {
//            app.closeAlert();
//            app.summary = data;
//        }, function (reason) {
//            app.reason = reason;
//        });
	app.createUser = function(){
    var newUserModal = $modal.open({
        templateUrl: 'scripts/app/admin/management/users/createUser.html',
        controller: 'CreateUserController',
        controllerAs: 'modal',
    });

    newUserModal.result
        .then(function (data) {
            app.closeAlert();
            app.summary = data;
        }, function (reason) {
            app.reason = reason;
        });
	};
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
		  $scope.users = resolveUsers.map(function(item){
			  console.log(item);
				return item;
		  });
		  $scope.ldapUsers = resolveLDAPUsers;
		  
		  $scope.projects = resolveProjects;
		  
		  $scope.permissions = resolvePermissions;
		  $scope.selectedPerms = [];
	      $scope.togglePerms = function (item, list) {
	        var idx = list.indexOf(item);
	        if (idx > -1) list.splice(idx, 1);
	        else list.push(item);
	      };
	      
		  console.log($scope.users);
			$scope.logout = function () {
	            Auth.logout();
	            $state.go('login');
	        };
			
			Principal.identity().then(function(account) {
				$scope.account = account;
				$scope.isAuthenticated = Principal.isAuthenticated;
			});
			
			$scope.headers = [
			          	    "Username",
			          	    "LDAP User",
			          	    "First Name",
			          	    "Last Name",
			          	    "Email",
			          	    "Default Project"
			          	];
			          	//var displayedPods = [].concat($scope.pods);
			$scope.tableParams = new ngTableParams({
			                  page: 1,            // show first page
			                  count: 10,          // count per page
			                  filter: {
			                      //stack: 'M'       // initial filter
			                  },
			                  sorting: {
			                      //name: 'asc'     // initial sorting
			                  }
			              }, {
			                  total: $scope.users.length, // length of data
			                  getData: function ($defer, params) {
			                      // use build-in angular filter
			                      var filteredData = params.filter() ?
			                              $filter('filter')($scope.users, params.filter()) :
			                              $scope.users;
			                      var orderedData = params.sorting() ?
			                              $filter('orderBy')(filteredData, params.orderBy()) :
			                              $scope.users;

			                      params.total(orderedData.length); // set total for recalc pagination
			                      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			                  }
			              });
			
			$scope.changePassword = function (user){
				
			};
			
			$scope.editUserRoles = function (user){
				
			};
			
			$scope.changeSelection = function(user) {
				if (user.$selected){
					$scope.selectedUser = user;
				} else {
					$scope.selectedUser = {};
				}
			}
		})
		.controller('EditUserRolesController', function($scope, $state, $cookies, $mdDialog, $filter, resolveUsers, resolveRoles, resolvePermissions, ngTableParams, Principal, Auth, $http) {

	
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
			  temp.roles.push({_id : role});
			  console.log(temp);
			  $http.post("http://localhost:8081/spade/api/users/", temp)
				.then(function(response) {
					console.log(response.data.items);
				});
			  // Send off updated user info to back end
		  }
		  
		  $scope.permissions = resolvePermissions;
		  console.log($scope.permissions);
//		  = [
//		                     { _id: "DASHBOARD_VIEW", selected: true },
//		                     { _id: "RESOURCE_CREATE", selected: false },
//		                     { _id: "RESOURCE_VIEW", selected: false },
//		                     { _id: "CODE_DEPLOY", selected: false },
//		                     { _id: "STATS_VIEW", selected: false },
//		                     { _id: "METRICS_VIEW", selected: false },
//		                     { _id: "BILLING_VIEW", selected: false },
//		                     { _id: "REQUIREMENTS_VIEW", selected: false }
//		                   ];
		  
		  $scope.selectedPerms = [];
	      $scope.togglePerms = function (item, list) {
	        var idx = list.indexOf(item);
	        if (idx > -1) list.splice(idx, 1);
	        else list.push(item);
	      };
	      
	      $scope.createRole = function (role, perms){
	    	  var newRole = { _id : "ROLE_"+role, permissions : perms };
	    	  console.log(newRole);
	    	  $http.post("http://localhost:8081/spade/api/roles/", newRole)
				.then(function(response) {
					console.log(response.data.items);
				});
	      };
		  
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
			
			$scope.changeSelection = function(user) {
				if (user.$selected){
					$scope.selectedUser = user;
				} else {
					$scope.selectedUser = {};
				}
			}
		})
		.controller('CreateUserController', function($scope, $state, $cookies, $mdDialog, $filter, resolveRoles, resolveLDAPUsers, resolvePermissions, ngTableParams, Principal, Auth, $http) {
			$scope.ldapUsers = resolveLDAPUsers;
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
	 .factory('LDAPUsersService', function ($http) {
			return {
				getUsers: function() {
					var temp = $http.get("http://localhost:8081/spade/api/test")
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
	 
	 })
	 .factory('PermissionsService', function ($http) {
			return {
				getPerms: function() {
					var promise = $http.get("http://localhost:8081/spade/api/permissions")
					.then(function(response) {
						console.log(response.data.items);
						return response.data.items;
					});
             return promise;
         }
	 }
	 
	 })
	 .factory('ProjectsService', function ($http) {
			return {
				getProjects: function() {
					var promise = $http.get("http://localhost:8081/spade/api/projects")
					.then(function(response) {
						console.log(response.data);
						return response.data.items;
				}); 
             return promise;
         }
	 }
	 
	 });
