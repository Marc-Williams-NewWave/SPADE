'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('devops', {
                parent: 'dashboards',
                url: '/devops',
                data: {
                    roles: []
                },
                resolve: {
                	resolveUser:['UserService', function (userService) {
                        return userService.getUser();
                    }],
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/dashboards/devops/main/devops.html',
                        controller: 'DevOpsController'
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
