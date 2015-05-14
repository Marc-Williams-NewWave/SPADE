'use strict';

angular.module('spadeApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
        function logout(){
        	Auth.logout();
        }
    });
