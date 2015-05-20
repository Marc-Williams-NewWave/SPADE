'use strict';

angular.module('spadeApp')
.directive('barchart', function ($window) {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            var morris;
            angular.element($window).bind('resize', function () {
                if (morris) {
                    //console.log('morris resized');
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
                    //console.log('morris resized');
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
})
.directive('linechart', function ($window) {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            var morris;
            angular.element($window).bind('resize', function () {
                if (morris) {
                    //console.log('morris resized');
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
})
.directive('donutchart', function() {

    function createChart(el_id, options) {
      options.element = el_id;
      var r = new Morris.Donut(options);
      return r;
    }

    return {
      restrict: 'E',
      scope:  {
        options: '='
      },
      replace: true,
      template: '<div></div>',
      link: function(scope, element, attrs) {
        return createChart(attrs.id, scope.options)
      }
    }

  })
    .config(function ($stateProvider) {
        $stateProvider
        .state('devopsDash', {
        	parent: 'devops',
            url: '/dashboard/:id',
            resolve:{
            	   resolveIssues :function(DevOpsFunctions,$stateParams){
            		   return DevOpsFunctions.findIssues($stateParams.id);
                   	
                   },
                   resolveCont:function(DevOpsFunctions,$stateParams){
                	   return DevOpsFunctions.findCont($stateParams.id);
             	
                   },
                   resolveBuild:function(DevOpsFunctions,$stateParams){
                	   return DevOpsFunctions.findBuild($stateParams.id);
      	
                   },
                   resolveCheckIn:function(DevOpsFunctions,$stateParams){
                	   return DevOpsFunctions.findCheckins($stateParams.id);
        	
                   },
                   resolveRel:function(DevOpsFunctions,$stateParams){
                	   return DevOpsFunctions.findRel($stateParams.id);
      	
                   }    
            },
            views: {
            	'content@': {
            		templateUrl: 'scripts/app/dashboards/devops/dashboard/devopsDash.html',
                    controller: 'DevOpsDashController',
            	}
            }
       
        });
//            .state('devopsDash', {
//                parent: 'devops',
//                url: '/dashboard',
//                data: {
//                    roles: []
//                },
//                resolve: {
//                    resolvedSelect:['SelectService', function (SelectService) {
//                        return SelectService.findAllProj();
//                    }]
//                },
//                views: {
//                    'content@': {
//                        templateUrl: 'scripts/app/dashboards/devops/dashboard/devopsDash.html',
//                        controller: 'DevopsController'
//                    }
//                }
////                ,
////                resolve: {
////                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
////                        $translatePartialLoader.addPart('stats');
////                        return $translate.refresh();
////                    }]
////                }
//            });
    });
