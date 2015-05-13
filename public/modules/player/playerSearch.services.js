"use strict";

angular.module('app')
.factory('youtubeSearch', youtubeSearch);

youtubeSearch.$inject = ['configService', '$http', '$q'];

function youtubeSearch(configService, $http, $q) {
    var service = {
        search: search
    };
    return service;

    function search(query) {
        var searchPromise = $q.defer();
        var url        = 'https://www.googleapis.com/youtube/v3/search?';
        var key        = 'key=' + configService.youtubeKey;
        var part       = '&part=snippet';
        var maxResults = '&maxResults=1';

        query      = '&q=' + query;
        url = url + key + part + maxResults + query;

        $http.get(url)
        .success(function(response) {
            var result = response.items[0];
            searchPromise.resolve(angular.extend({}, result));
        })
        .error(function(response) {
            searchPromise.reject(response.data);
        });

        return searchPromise.promise;
    }
}