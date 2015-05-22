'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboards', {
                abstract: true,
                parent: 'site',
                data: {
                    roles: [],
                    requireLogin: true
                }
            });
    });
