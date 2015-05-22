'use strict';
angular.module('spadeApp')
        .config(function ($stateProvider) {
        $stateProvider
            .state('projects', {
                parent: 'devops',
                url: '/projects',
                data: {
                    roles: []
                },
                resolve:{
                    resolveProjects: ['DevOpsProjectsService', function (projService) {
                        return projService.query().$promise;
                    }],
                    resolveSelect: ['SelectService', function (selectService) {
                        return selectService.findAllProj();
                    }]
                },
                views: {
                    'content@': {
                    	templateUrl: 'scripts/app/dashboards/devops/projects/projects.html',
                        controller: 'DevOpsProjectsController'
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
    });
