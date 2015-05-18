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
                    resolvedSelect:['SelectService', function (SelectService) {
                        return SelectService.findAllProj();
                    }]
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/dashboards/devops/selection/select.html',
                        controller: 'DevopsController'
                    }
                }
//                ,
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('stats');
//                        return $translate.refresh();
//                    }]
//                }
            }).state('dashboard', {

                url: '/dashboard/:id',
                resolve:{
                	   resolveDonut :function($route,Admin,$stateParams){
                       	return Admin.findIssues($stateParams.id);
                       	
                       },
                       
                       
                 resolvedCont:function($route,Admin,$stateParams){
                 	return Admin.findCont($stateParams.id);
                 	
                 },
          
          resolvedBuild:function($route,Admin,$stateParams){
          	return Admin.findBuild($stateParams.id);
          	
          },
          
          resolvecheckin:function($route,Admin,$stateParams){
            	return Admin.findCheckins($stateParams.id);
            	
            },
          resolvedRel:function($route,Admin,$stateParams){
          	return Admin.findRel($stateParams.id);
          	
          }
                
            },
                views: {
                	'content@': {
                		templateUrl: 'scripts/app/dashboards/devops/dashboard/devopsDash.html',
                        controller: 'AdminController',
                	}
                }
           
            });
    });
