'use strict';

/* Services */

angular.module('spadeApp')
.factory('Admin', function ($http) {
	 return {
	
		 
		    findCont: function(name) {
          	
	            
              var promise = $http.get('app/rest/contributor', {params: {name: name}}).then(function (response) {
                  return response.data;
              });
              return promise;
          },
          findBuild: function(name) {
            	
	            
              var promise = $http.get('app/rest/builds', {params: {name: name}}).then(function (response) {
                  return response.data;
              });
              return promise;
          },
          findCheckins:function(name){
        	  
        	  var promise = $http.get('app/rest/checkin', {params: {name: name}}).then(function (response) {
                  return response.data;
              });
              return promise;
          },
          findRel: function(name) {
            	
	            
              var promise = $http.get('app/rest/releases', {params: {name: name}}).then(function (response) {
                  return response.data;
              });
              return promise;
          },
          
          findIssues: function(name) {
          	
	            
              var promise = $http.get('app/rest/issues', {params: {name: name}}).then(function (response) {
                  return response.data;
              });
              return promise;
          },
	 
	 }
	
	  
}).factory('SelectService', function ($http) {
	 return {
	
		 
		    findAllProj: function() {
         	
	            
             var promise = $http.get('app/rest/projectss').then(function (response) {
                 return response.data;
             });
             return promise;
         }
	 }
	 
	 }).factory('Admin1', function ($resource) {
	
	  return $resource('app/rest/releases', {}, {
	        'get': { method: 'GET', params: {}, isArray: true}
	    });
	  
}).factory('ThreadDumpService', function ($http) {
        return {
            dump: function() {
                var promise = $http.get('dump').then(function(response){
                    return response.data;
                });
                return promise;
            }
        };
    });