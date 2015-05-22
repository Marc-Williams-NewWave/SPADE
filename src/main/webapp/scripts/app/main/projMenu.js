'use strict';

angular.module('spadeApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('projMenu', {
                parent: 'site',
                url: '/projMenu',
                data: {
                    roles: [], 
                    pageTitle: 'modal.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/projMenu.html',
                        controller: 'ProjMenuController'
                    }
                },
                resolve: {
                	resolveCurrentProj:['CurrentProjService', function (projService) {
                        return projService.getProj();
                    }],
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('iaas');
//                        return $translate.refresh();
//                    }]

                    resolveImages:['ImageService', function (imageService) {
                    	return imageService.getImages();
//                        return slaveService.getSlaves();
                    }]
                }
            });
    });
