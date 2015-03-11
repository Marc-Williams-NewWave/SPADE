'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('iaas', {
                parent: 'features',
                url: '/iaas',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/iaas/iaas.html',
                        controller: 'IaasController'
                    }
                }
                ,
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('iaas');
                        return $translate.refresh();
                    }]
                }
            });
    });
