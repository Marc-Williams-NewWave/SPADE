'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('devopsDash', {
                parent: 'devops',
                url: '/dashboard',
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
                        templateUrl: 'scripts/app/dashboards/devops/dashboard/devopsDash.html',
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
