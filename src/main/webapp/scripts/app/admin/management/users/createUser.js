'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('createUser', {
                parent: 'management',
                url: '/createUser',
                data: {
                    roles: [], 
                    pageTitle: 'Create User'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/admin/management/createUser.html',
                        controller: 'CreateUserController'
                    }
                },
                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('iaas');
//                        return $translate.refresh();
//                    }]
                	resolveLDAPUsers:['LDAPService', function (ldapService) {
                        return ldapService.getLDAPUsers();
                    }],
                	resolveRoles:['RolesService', function (rolesService) {
                        return rolesService.getRoles();
                    }],
                    resolvePermissions:['PermissionsService', function (permService) {
                        return permService.getPerms();
                    }]
                }
            });
    });
