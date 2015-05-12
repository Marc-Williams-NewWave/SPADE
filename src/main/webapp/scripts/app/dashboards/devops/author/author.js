'use strict';


angular.module('spadeApp')
	.config(function ($stateProvider) {
        $stateProvider
            .state('author', {
                parent: 'devops',
                url: '/author',
                data: {
                    roles: []
                },
                resolve:{
                    resolvedAuthor: ['Author1', function (Author) {
                        return Author.query().$promise;
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
