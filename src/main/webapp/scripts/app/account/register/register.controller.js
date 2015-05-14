'use strict';

angular.module('spadeApp')
    .controller('RegisterController', function ($scope, $translate, $timeout, Auth, resolveProjects, resolveLDAPUsers) {
        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;
        $scope.errorUserExists = null;
        $scope.registerAccount = {};
        $timeout(function (){angular.element('[ng-model="registerAccount.login"]').focus();});
        $scope.projects = resolveProjects;
        $scope.ldapUsers = resolveLDAPUsers;
        
        $scope.register = function () {
            if ($scope.registerAccount.password !== $scope.confirmPassword) {
                $scope.doNotMatch = 'ERROR';
            } else {
                $scope.registerAccount.langKey = $translate.use();
                $scope.doNotMatch = null;
                $scope.error = null;
                $scope.errorUserExists = null;
                $scope.errorEmailExists = null;

                Auth.createAccount($scope.registerAccount).then(function () {
                    $scope.success = 'OK';
                    createMyUser();
                }).catch(function (response) {
                    $scope.success = null;
                    if (response.status === 400 && response.data === 'login already in use') {
                        $scope.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                        $scope.errorEmailExists = 'ERROR';
                    } else {
                        $scope.error = 'ERROR';
                    }
                });
            }
        };
        
        function createMyUser(){
        	var myUser = {};
        	myUser.login = $scope.registerAccount.login;
        	myUser.password = $scope.registerAccount.password;
        	myUser.default_project = $scope.registerAccount.defaultProject;
        	myUser.projects = [ $scope.registerAccount.defaultProject ];
        	myUser.ldap_user = $scope.registerAccount.ldapUser;
        	myUser.authorities = [ {_id : "ROLE_USER"} ];
        	
        	console.log(myUser);
        	
//        	$http.post("http://localhost:8081/spade/api/users", myUser)
//			.then(function(response) {
//				console.log(response.data.items);
//				return response.data.items;
//			});
        }
    })
    .factory('ProjectService', function ($http) {
			return {
				getProjects: function() {
					var promise = $http.get("http://localhost:8081/spade/api/projects")
					.then(function(response) {
						console.log(response.data.items);
						return response.data.items;
					});
					//console.log(promise);
//					var projects = [];
//					console.log(promise.projects);
//					for (var p in promise.projects){
//						  $http.get("http://localhost:8081/spade/api/projects/"+p.name)
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
