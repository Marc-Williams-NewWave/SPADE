'use strict';

angular.module('spadeApp').controller('TopbarController',
		function($scope, $rootScope, $state, $cookies, Auth, Principal) {

			$scope.logout = function() {
				Auth.logout();
				$cookies.currentUser = 'undefined';
				$cookies.currentProj = 'undefined';
				$rootScope.currentUser = 'undefined';
				$rootScope.currentProj = 'undefined';
				$state.go('login');
			}
			$scope.isAuthenticated = Principal.isAuthenticated;
			$scope.isInRole = Principal.isInRole;
			$scope.$state = $state;
		})
