'use strict'

angular.module('spadeApp')
.controller('DevOpsDashController',function($scope,resolveRel,resolveCheckIn,resolveBuild,
		resolveCont,$rootScope,$stateParams,$http,resolveIssues){
	
	$scope.project = $stateParams.id;
	
	var issues = resolveIssues;
	$scope.compliancyChartData = {
			data: issues,
			colors: [
			         '#0BA462',
			         '#B22222',
			         '#FC4747',
			         '#B31212'
			         ]
	}
	
        	var releaseData = [];
        	var contributorData = [];
        
        		for (var i = 0; i < resolveCont.length; i++) {
                	
                    var item = resolveCont[i];
    					contributorData.push({
    						"name" : item.author.login.substring(0,15),
    						"commits" : item.total,
    					});
    					
    				}
            	
            	$scope.xCont = 'name';
      	        $scope.yCont = ['commits'];
      	        $scope.contLabels = ['Commits'];
      	        $scope.contributorsChartData = contributorData;

           
        	
        	
        		  var buildData = [];
        		  for (var i = 0; i < resolveBuild.length; i++) {
                	
                    var item = resolveBuild[i];
                       buildData.push({
    						"number" : item.number+item.result.substring(0,1),
    						"time" : item.duration,
    					});
    					
    				}
            	
            	$scope.xBuild = 'number';
      	        $scope.yBuild = ['time'];
      	        $scope.buildLabels = ['Duration'];
      	        $scope.buildChartData = buildData;

           
        	var previousItem = "";
    		var count = 1;
        	
    		 if(resolveRel.length==2)
        	   {
        	    if(resolveRel[0].published_at == resolveRel[1].published_at) 
        	    	{
        	    	releaseData.push({
    					"d" : resolveRel[0].published_at,
    					"visits" : 1,
    				});
        	    	}
        	    else
        	    	{
        	    	releaseData.push({
    					"d" : resolveRel[1].published_at,
    					"visits" : 1,
    				});
        	    	releaseData.push({
    					"d" : resolveRel[0].published_at,
    					"visits" : 1,
    				});
        	    	
        	    	}
        	   }
    		    
    		    
    		    $scope.xRelease = 'd';
    	        $scope.yRelease = ['visits'];
    	        $scope.releaseLabels = ['Releases'];
    	        $scope.releaseChartData = releaseData;
        	
    	        var checkinData = resolveCheckIn;
        		
        		$scope.xCheckin = 'date';
    	        $scope.yCheckin = ['checkin'];
    	        $scope.checkinLabels = ['Check-ins'];
    	        $scope.checkinChartData = checkinData;
    	        
})
.factory('DevOpsFunctions', function ($http) {
	 return {
		   findCont: function(name) {
			  var promise = $http.get('spade/api/devops/contributor', {params: {name: name}}).then(function (response) {
				  console.log("GET Contributor");
                  return response.data;
              });
              return promise;
          },
          findBuild: function(name) {
        	  var promise = $http.get('spade/api/devops/builds', {params: {name: name}}).then(function (response) {
        		  console.log("GET Builds");
                  return response.data;
              });
              return promise;
          },
          findCheckins:function(name){
        	  var promise = $http.get('spade/api/devops/checkin', {params: {name: name}}).then(function (response) {
        		  console.log("GET Check Ins");
                  return response.data;
              });
              return promise;
          },
          findRel: function(name) {
        	  var promise = $http.get('spade/api/devops/releases', {params: {name: name}}).then(function (response) {
        		  console.log("GET Releases");
                  return response.data;
              });
              return promise;
          },
          
          findIssues: function(name) {
        	  var promise = $http.get('spade/api/devops/issues', {params: {name: name}}).then(function (response) {
        		  console.log("GET Issues");
                  return response.data;
              });
              return promise;
          },
	 }

});