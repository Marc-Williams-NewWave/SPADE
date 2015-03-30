'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('templates', {
                parent: 'features',
                url: '/templates',
                data: {
                    roles: [], 
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/features/templates/templates.html',
                        controller: 'TemplatesController'
                    }
                }
//                ,
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('monitor');
//                        return $translate.refresh();
//                    }]
//                }
            });
    });
