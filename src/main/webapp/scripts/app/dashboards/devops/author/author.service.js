'use strict';

angular.module('spadeApp').factory('Author1', function ($resource) {
        return $resource('app/rest/authors/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': { method: 'GET'}
        });
    });
