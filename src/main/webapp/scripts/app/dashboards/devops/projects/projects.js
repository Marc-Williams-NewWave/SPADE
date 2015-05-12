'use strict';
angular.module('spadeApp')
        .config(function ($stateProvider) {
        $stateProvider
            .state('projects', {
                parent: 'features',
                url: '/projects',
                data: {
                    roles: []
                },
                resolve:{
                    resolvedProjects: ['Projects', function (Projects) {
                        return Projects.query().$promise;
                    }]
                },
                views: {
                    'content@': {
                    	templateUrl: 'scripts/app/dashboards/devops/projects/projects.html',
                        controller: 'ProjectsController'
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
    });;;
