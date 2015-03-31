'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('stats', {
                parent: 'features',
                url: '/stats',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/stats/stats.html',
                        controller: 'StatsController'
                    }
                },
                resolve: {
                    resolveSlaves:['SlaveService', function (slaveService) {
                        return slaveService.getSlaves();
                    }],
                    resolveTasks:['TaskService', function (taskService) {
                        return taskService.getTasks();
                    }],
                    resolvePods:['PodService', function (podService) {
                        return podService.getPods();
                    }]
                },
            });
    });
