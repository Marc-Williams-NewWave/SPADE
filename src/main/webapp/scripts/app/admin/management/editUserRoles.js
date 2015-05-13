'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('editUserRoles', {
                parent: 'management',
                url: '/editUserRoles',
                data: {
                    roles: [], 
                    pageTitle: 'Edit User Roles'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/admin/management/editUserRoles.html',
                        controller: 'EditUserRolesController'
                    }
                },
                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('iaas');
//                        return $translate.refresh();
//                    }]
                	resolveRoles:['RolesService', function (rolesService) {
                        return rolesService.getRoles();
                    }],
                    resolvePermissions:['PermissionsService', function (permService) {
                        return permService.getPerms();
                    }]
                }
            });
    });
