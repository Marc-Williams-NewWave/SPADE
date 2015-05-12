'use strict';

angular.module('spadeApp').controller('ProjectsController', function ($scope, resolvedProjects, Projects) {

        $scope.projectss = resolvedProjects;

        $scope.create = function () {
            Projects.save($scope.projects,
                function () {
                    $scope.projectss = Projects.query();
                    $('#saveProjectsModal').modal('hide');
                   // $scope.clear();
                });
        };

        $scope.update = function (id) {
            $scope.projects = Projects.get({id: id});
            $('#saveProjectsModal').modal('show');
        };

        $scope.delete = function (id) {
            Projects.delete({id: id},
                function () {
                    $scope.projectss = Projects.query();
                });
        };

        $scope.clear = function () {
            $('#saveProjectsModal').modal('show');

            $scope.projects = {name: null, lastBuildDate: null, id: null};
        };
        
//        $('#saveProjectsModal').modal('show');

    });
