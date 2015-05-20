'use strict';

angular.module('spadeApp')
.controller('AuthorController', function ($scope, resolveAuthors, AuthorService) {

        $scope.authors = resolveAuthors;

        $scope.create = function () {
            AuthorService.save($scope.author,
                function () {
                    $scope.authors = Author1.query();
                    $('#saveAuthorModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.updateAuthor = function (id) {
            $scope.author = AuthorService.get({id: id});
            $('#saveAuthorModal').modal('show');
        };

        $scope.deleteAuthor = function (id) {
            AuthorService.delete({id: id},
                function () {
                    $scope.authors = Author1.query();
                });
        };

        $scope.clearAuthor = function () {
            $('#saveAuthorModal').modal('show');

          //  $scope.author = {name: null, phone: null, id: null};
        };
    })
    .factory('AuthorService', function ($resource) {
        return $resource('spade/api/devops/authors/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': { method: 'GET'}
        });
    });
