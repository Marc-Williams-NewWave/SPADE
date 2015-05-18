'use strict';

angular.module('spadeApp').controller('TopbarController',
		function($scope, $rootScope, $state, $cookies, Auth, Principal) {

			$scope.logout = function() {
				Auth.logout();
				$cookies.currentUser = {};
				$cookies.currentProj = {};
				$rootScope.currentUser = {};
				$rootScope.currentProj = {};
				$state.go('login');
			}
			$scope.isAuthenticated = Principal.isAuthenticated;
			$scope.isInRole = Principal.isInRole;
			$scope.$state = $state;
		})
