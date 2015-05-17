"use strict";

angular.module('app')
.factory('playlistService', playlistService);

playlistService.$inject = ['$http', '$q'];

function playlistService($http, $q) {
    var service = {
        retrieve: retrieve
    };
    return service;

    function retrieve(playlistId) {
        var retrievePromise = $q.defer();
        var url = "http://localhost:8000/playlists/get/" + playlistId;

        $http.get(url)
        .then(function(response) {
            retrievePromise.resolve(angular.extend({}, response.data.playlist));
        }, function(response) {
            retrievePromise.reject(response.data);
        });

        return retrievePromise.promise;
    }
}