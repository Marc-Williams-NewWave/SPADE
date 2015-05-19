'use strict';


angular.module('spadeApp')
	.config(function ($stateProvider) {
        $stateProvider
            .state('authors', {
                parent: 'devops',
                url: '/authors',
                data: {
                    roles: []
                },
                resolve:{
                    resolveAuthors: ['AuthorService', function (authorService) {
                        return authorService.query().$promise;
                    }]
                },
                views: {
                    'content@': {
                    	templateUrl: 'scripts/app/dashboards/devops/author/author.html',
                        controller: 'AuthorController'
                    }
                }
//                ,
//                resolve: {
//                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
//                        $translatePartialLoader.addPart('stats');
//                        return $translate.refresh();
//                    }]
//                }
            });
    });;
