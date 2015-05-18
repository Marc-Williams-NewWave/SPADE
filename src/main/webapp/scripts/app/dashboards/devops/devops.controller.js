'use strict'

angular.module('spadeApp')
.controller('DevopsController',	["$scope", "$state", "resolvedSelect", function($scope, $state, resolvedSelect) {
	var projects = [];
	var project;
	projects.push("Select Project");
	for (var i = 0; i < resolvedSelect.length; i++) {
		projects.push(resolvedSelect[i].name);
	}

	$scope.colors = projects;

	$('select.selectpicker').on('change', function(){
		var selected = $('.selectpicker option:selected').text();
	
		$state.go("devopsDash",{id:selected});

//		$location.path('/dashboard/'+selected);

	});
}])
.controller('AdminController',function($scope,resolvedRel,resolvecheckin,resolvedBuild,resolvedCont,$rootScope,$route,$stateParams,$http,Admin,resolveDonut){

	var issues = resolveDonut;
	$scope.chart_options = {
			data:issues,
			colors: [
			         '#0BA462',
			         '#B22222',
			         '#FC4747',
			         '#B31212'
			         ]
	}
	
            var gitData = {
        		info : []
        	};
        	var gitData1 = {
        			info : []
        		};
        	var gitData2 = {
        			info : []
        		};
        	
        	var gitData3 = {
        			info : []
        		};
        	var x="";
        
        		for (var i = 0; i < resolvedCont.length; i++) {
                	
                    var item = resolvedCont[i];
    					gitData2.info.push({
    						"name" : item.author.login.substring(0,15),
    						"commits" : item.total,
    					});
    					
    				}
            	
            	  $scope.xkey = 'name';

      	        $scope.ykeys = ['commits'];

      	        $scope.labels = ['Commits'];
      	        
      	  

      	        $scope.myModelbar = gitData2.info;

           
        	
        	
        		  var buildData= {
        	        		info : []
        	        	};
        		  for (var i = 0; i < resolvedBuild.length; i++) {
                	
                    var item = resolvedBuild[i];
                       buildData.info.push({
    						"number" : item.number+item.result.substring(0,1),
    						"time" : item.duration,
    					});
    					
    				}
            	
            	$scope.xkey = 'number';

      	        $scope.ykeys = ['time'];

      	        $scope.labels = ['Duration'];
      	        
      	        $scope.myModelbarBuild = buildData.info;

           
        	var previousItem = "";
    		var count = 1;
        	
    		 if(resolvedRel.length==2)
        	   {
        	    if(resolvedRel[0].published_at == resolvedRel[1].published_at) 
        	    	{
        	    	gitData1.info.push({
    					"d" : resolvedRel[0].published_at,
    					"visits" : 1,
    				});
        	    	}
        	    else
        	    	{
        	    	gitData1.info.push({
    					"d" : resolvedRel[1].published_at,
    					"visits" : 1,
    				});
        	    	gitData1.info.push({
    					"d" : resolvedRel[0].published_at,
    					"visits" : 1,
    				});
        	    	
        	    	}
        	 
        	    
        	    
        	   }
    		    
    		    
    		        $scope.xkey = 'd';

    	        $scope.ykeys = ['visits'];

    	        $scope.labels = ['Releases'];

    	        $scope.myModelline = gitData1.info;
        	
        
        		
//        		$scope.xkey = 'date';
//
//    	        $scope.ykeys = ['checkin'];
//
//    	        $scope.labels = ['Check-ins'];
//
//    	        $scope.myModelline1 = resolvecheckin;
//
//      	        

          

        	

     

})
.factory('Admin1', function ($resource) {
	
	  return $resource('app/rest/releases', {}, {
	        'get': { method: 'GET', params: {}, isArray: true}
	  });
})
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
	
	  
})
.factory('SelectService', function ($http) {
	 return {
	
		 
		    findAllProj: function() {
         	
	            
             var promise = $http.get('app/rest/projectss').then(function (response) {
                 return response.data;
             });
             return promise;
         }
	 }
	 
})
.directive('selectpicker', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.selectpicker($parse(attrs.selectpicker)());
          element.selectpicker('refresh');
          
          scope.$watch(attrs.ngModel, function (newVal, oldVal) {
            scope.$parent[attrs.ngModel] = newVal;
            scope.$evalAsync(function () {
              if (!attrs.ngOptions || /track by/.test(attrs.ngOptions)) element.val(newVal);
              element.selectpicker('refresh');
            });
          });
          
          scope.$on('$destroy', function () {
            scope.$evalAsync(function () {
              element.selectpicker('destroy');
            });
          });
        }
      };
    }]).directive('barchart', function ($window) {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            var morris;
            angular.element($window).bind('resize', function () {
                if (morris) {
                    console.log('morris resized');
                    morris.redraw();
                }
            });

            attrs.$observe('value', function (val) {
                if (!morris) {
                    console.log('creating chart');
                    morris = Morris.Bar({
                        element: element,
                        data: angular.fromJson(val),
                        xkey: $scope[attrs.xkey],
                        ykeys: $scope[attrs.ykeys],
                        labels: $scope[attrs.labels],

                        horizontal:true,	
                        barRatio: 1.4,
                        xLabelAngle: 65,
                        hideHover: 'auto'
                    });
                } else {
                    console.log('setting chart values');
                    morris.setData(angular.fromJson(val));
                }
            });
        }
    };
}).directive('barchart1', function ($window) {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            var morris;
            angular.element($window).bind('resize', function () {
                if (morris) {
                    console.log('morris resized');
                    morris.redraw();
                }
            });

            attrs.$observe('value', function (val) {
                if (!morris) {
                    console.log('creating chart');
                    morris = Morris.Bar({
                        element: element,
                        data: angular.fromJson(val),
                        xkey: $scope[attrs.xkey],
                        ykeys: $scope[attrs.ykeys],
                        labels: $scope[attrs.labels],
                        barColors: function (row, series, type) {
                        	 var str= row.label;
                        	if(row.label.indexOf("S")> -1) return "#1AB244";
                        	else if(row.label.indexOf("F")> -1) return "#AD1D28";   	
                        	else return "#DEBB27";
                        	},
                        horizontal:true,	
                        barRatio: 1.4,
                        xLabelAngle: 65,
                        hideHover: 'auto'
                    });
                } else {
                    console.log('setting chart values');
                    morris.setData(angular.fromJson(val));
                }
            });
        }
    };
});
angular.module('angular-bootstrap-select', [])
.directive('linechart', function ($window) {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            var morris;
            angular.element($window).bind('resize', function () {
                if (morris) {
                    console.log('morris resized');
                    morris.redraw();
                }
            });

            attrs.$observe('value', function (val) {
                if (!morris) {
                    console.log('creating chart');
                    morris = Morris.Line({
                        element: element,
                        data: angular.fromJson(val),
                        xkey: $scope[attrs.xkey],
                        ykeys: $scope[attrs.ykeys],
                        labels: $scope[attrs.labels]
                    });
                } else {
                    console.log('setting chart values');
                    morris.setData(angular.fromJson(val));
                }
            });
        }
    };
});