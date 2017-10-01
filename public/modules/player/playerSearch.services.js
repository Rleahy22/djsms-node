(function() {
    "use strict";

    angular.module('app')
    .factory('youtubeSearch', youtubeSearch);

    youtubeSearch.$inject = ['configService', '$http', '$q', 'lodash'];

    function youtubeSearch(configService, $http, $q, _) {
        var service = {
            search: search
        };

        return service;

        function search(query) {
            var searchPromise = $q.defer();
            var url           = 'https://www.googleapis.com/youtube/v3/search?';
            var key           = 'key=' + configService.youtubeKey;
            var part          = '&part=snippet';
            var maxResults    = '&maxResults=5';

            query = '&q=' + query;
            url   = url + key + part + maxResults + query;

            $http.get(url)
            .then(function(response) {
                _.each(response.data.items, function(item) {
                    if (item.id.kind === "youtube#video") {
                        searchPromise.resolve(angular.extend({}, item));
                    }
                });
            })
            .catch(function(response) {
                searchPromise.reject(response.data);
            });

            return searchPromise.promise;
        }
    }
})();
