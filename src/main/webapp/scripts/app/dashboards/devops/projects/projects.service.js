'use strict';

angular.module('spadeApp').factory('Projects', function ($resource) {
        return $resource('app/rest/projectss/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': { method: 'GET'}
        });
    });
