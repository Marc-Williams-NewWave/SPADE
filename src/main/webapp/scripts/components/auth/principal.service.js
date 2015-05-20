'use strict';

angular.module('spadeApp')
.factory('RoleService', function ($http) {
	 return {
		    getRoles: function() {
	        var promise = $http.get('spade/api/roles')
	             	.then(function (response) {
	             		var lookup = {};
	            		for (var i = 0, len = response.data.items.length; i < len; i++) {
	            		    lookup[response.data.items[i]._id] = response.data.items[i];
	            		}
	                 return lookup;
	             });
	             return promise;
	         }
		 }	 
	})
    .factory('Principal', function Principal($q, $http, Account, RoleService) {
        var _identity,
            _authenticated = false;

//        var allRoles = $http.get("/spade/api/roles")
//        	.then(function(response) {
//        		console.log("Roles");
//        		
//        		var lookup = {};
//        		for (var i = 0, len = response.data.items.length; i < len; i++) {
//        		    lookup[response.data.items[i]._id] = response.data.items[i];
//        		}
//        		console.log(lookup);
//        		return lookup;
//        });
        var allRoles;
        RoleService.getRoles().then(function(response){
        	allRoles = response;
        });
        console.log(allRoles);
        return {
            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function () {
                return _authenticated;
            },
            hasPermission: function (perm) {
                if (!_authenticated || !_identity.roles) {
                    return false;
                }

                for (var i = 0; i < _identity.roles.length; i++) {
                	var role = allRoles[_identity.roles[i]];
                    for (var j = 0; j < role.permissions.length; j++){
                    	var p = role.permissions[j];
                    	if(p._id === perm){
                    		return true;
                    	}
                    }
                }
            },
            hasAnyPermission: function (perms) {
                if (!_authenticated || !_identity.roles) {
                    return false;
                }

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) {
                        return true;
                    }
                }

                return false;
            },
            isInRole: function (role) {
                if (!_authenticated || !_identity.roles) {
                    return false;
                }

                return _identity.roles.indexOf(role) !== -1;
            },
            isInAnyRole: function (roles) {
                if (!_authenticated || !_identity.roles) {
                    return false;
                }

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) {
                        return true;
                    }
                }

                return false;
            },
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity !== null;
            },
            identity: function (force) {
                var deferred = $q.defer();

                if (force === true) {
                    _identity = undefined;
                }

                // check and see if we have retrieved the identity data from the server.
                // if we have, reuse it by immediately resolving
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                // retrieve the identity data from the server, update the identity object, and then resolve.
                Account.get().$promise
                    .then(function (account) {
                        _identity = account.data;
                        _authenticated = true;
                        deferred.resolve(_identity);
                    })
                    .catch(function() {
                        _identity = null;
                        _authenticated = false;
                        deferred.resolve(_identity);
                    });
                return deferred.promise;
            }
        };
    });
