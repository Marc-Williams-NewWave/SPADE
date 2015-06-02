'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('netops', {
                parent: 'dashboards',
                url: '/netops',
                data: {
                    roles: []
                },
                resolve: {
                	
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/dashboards/netops/main/netops.html',
                        controller: 'NetOpsController'
                    }
                }
//                ,
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('stats');
//                        return $translate.refresh();
//                    }]
//                }
            });
//            .state('devopsDash', {
//            	parent: 'devops',
//                url: '/dashboard/:id',
//                resolve:{
//                	   resolveDonut :function($route,Admin,$stateParams){
//                		   return Admin.findIssues($stateParams.id);
//                       	
//                       },
//                       resolvedCont:function($route,Admin,$stateParams){
//                    	   return Admin.findCont($stateParams.id);
//                 	
//                       },
//                       resolvedBuild:function($route,Admin,$stateParams){
//                    	   return Admin.findBuild($stateParams.id);
//          	
//                       },
//                       resolvecheckin:function($route,Admin,$stateParams){
//                    	   return Admin.findCheckins($stateParams.id);
//            	
//                       },
//                       resolvedRel:function($route,Admin,$stateParams){
//                    	   return Admin.findRel($stateParams.id);
//          	
//                       }    
//                },
//                views: {
//                	'content@': {
//                		templateUrl: 'scripts/app/dashboards/devops/dashboard/devopsDash.html',
//                        controller: 'AdminController',
//                	}
//                }
//           
//            });
    });