'use strict';

angular.module('spadeApp')
.controller('AuthorController', function ($scope, resolvedAuthor, Author1) {

        $scope.authors = resolvedAuthor;

        $scope.create = function () {
            Author.save($scope.author,
                function () {
                    $scope.authors = Author.query();
                    $('#saveAuthorModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            $scope.author = Author.get({id: id});
            $('#saveAuthorModal').modal('show');
        };

        $scope.delete = function (id) {
            Author.delete({id: id},
                function () {
                    $scope.authors = Author.query();
                });
        };

        $scope.clear = function () {
            $('#saveAuthorModal').modal('show');

          //  $scope.author = {name: null, phone: null, id: null};
        };
    });
