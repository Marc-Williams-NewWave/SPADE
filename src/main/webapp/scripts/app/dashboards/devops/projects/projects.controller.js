'use strict';

angular.module('spadeApp')
	.controller('DevOpsProjectsController', function ($scope, resolveProjects, DevOpsProjectsService ,resolveSelect, $mdDialog) {

        $scope.projects = resolveSelect;

        $scope.createProj = function () {
        	DevOpsProjectServce.save($scope.saveProject,
                function () {
                    $scope.projects = DevOpsProjectServce.query();
                    $('#saveProjectsModal').modal('hide');
                   // $scope.clear();
                });
        };

        $scope.updateProj = function (id) {
            $scope.projects = DevOpsProjectServce.get({id: id});
            $('#saveProjectsModal').modal('show');
        };

        $scope.deleteProj = function (id) {
        	DevOpsProjectServce.delete({id: id},
                function () {
                    $scope.projects = DevOpsProjectServce.query();
                });
        };

        $scope.clearProj = function () {
            $('#saveProjectsModal').modal('show');

            $scope.project = {name: null, lastBuildDate: null, id: null};
        };
        
//        $('#saveProjectsModal').modal('show');

        $scope.spadeInfo = function(ev) {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .title("SPADE")
		        .content("DevOps Projects (Placeholder)")
		        .ariaLabel("DevOps Info")
		        .ok("Close")
		        .targetEvent(ev)
		    );
		  };
        
    })
    .factory('DevOpsProjectsService', function ($resource) {
        return $resource('app/rest/projectss/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': { method: 'GET'}
        });
    })
    .factory('SelectService', function ($http) {
	 return {
	    findAllProj: function() {
        var promise = $http.get('spade/api/projects')//$http.get('app/rest/projectss')
             	.then(function (response) {
             		console.log(response.data);
                 return response.data.items;
             });
             return promise;
         }
	 }	 
});
