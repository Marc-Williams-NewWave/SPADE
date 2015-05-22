'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('features', {
                abstract: true,
                parent: 'site',
                data: {
                    roles: [],
                    requireLogin: true
                }
            });
    });
