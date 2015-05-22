'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/home',
                data: {
                    roles: [],
                    requireLogin: true
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'MainController'
                    }
                },
                resolve: {
                	resolveCurrentUser:['CurrentUserService', function (userService) {
                        return userService.getUser();
                    }],
                    resolveCurrentProj:['CurrentProjService', function (projService) {
                        return projService.getProj();
                    }],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            });
    });
