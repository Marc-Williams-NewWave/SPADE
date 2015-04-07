'use strict';

angular.module('spadeApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
        function logout(){
        	Auth.logout();
        }
    })
    .controller('LogoutCtrl', function ($scope, $state, Auth) {
        $scope.logout = function (){
        	Auth.logout();
        	$state.go('login');
        }
    });
