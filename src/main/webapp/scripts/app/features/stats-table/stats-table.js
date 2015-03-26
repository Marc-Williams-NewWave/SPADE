'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('stats-table', {
                parent: 'features',
                url: '/stats-table',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/stats-table/stats-table.html',
                        controller: 'StatsTableController'
                    }
                },
                resolve: {
                    resolvePods:['PodService', function (podService) {
                        return podService.getPods();
                    }] 
                },
//                ,
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('stats');
//                        return $translate.refresh();
//                    }]
//                }
            });
    });
