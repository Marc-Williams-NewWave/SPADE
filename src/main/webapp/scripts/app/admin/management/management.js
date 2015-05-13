'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('management', {
                parent: 'site',
                url: '/management',
                data: {
                    roles: ["ROLE_ADMIN"],
//                    requireLogin: true
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/admin/management/management.html',
                        controller: 'ManagementController'
                    }
                },
                resolve: {
                	resolveUsers:['UsersService', function (usersService) {
                        return usersService.getUsers();
                    }],
                    resolveRoles:['RolesService', function (rolesService) {
                        return rolesService.getRoles();
                    }],
                    resolvePermissions:['PermissionsService', function (permsService) {
                        return permsService.getPerms();
                    }],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            });
    });
