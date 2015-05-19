'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('devopsDash', {
        	parent: 'devops',
            url: '/dashboard/:id',
            resolve:{
            	   resolveIssues :function(DevOpsFunctions,$stateParams){
            		   return DevOpsFunctions.findIssues($stateParams.id);
                   	
                   },
                   resolvedCont:function(DevOpsFunctions,$stateParams){
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
