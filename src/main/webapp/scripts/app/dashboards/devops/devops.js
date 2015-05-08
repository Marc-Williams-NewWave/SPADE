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
                        templateUrl: 'scripts/app/dashboards/devops/devops.html',
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
            });
    });
