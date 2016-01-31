(function() {
    "use strict";

    angular.module('app')
    .factory('playlistService', playlistService);

    playlistService.$inject = ['$http', '$q', 'configService'];

    function playlistService($http, $q, configService) {
        var service = {
            addVideo:    addVideo,
            create:      create,
            deleteVideo: deleteVideo,
            retrieve:    retrieve,
            retrieveAll: retrieveAll
        };
        return service;

        function addVideo(playlist, video) {
            var updatePromise = $q.defer();
            var url = configService.baseUrl + "playlists/" + playlist.id;

            $http.put(url, {
                playlist: playlist,
                video: video
            })
            .then(function(response) {
                updatePromise.resolve(angular.extend({}, response.data.playlist));
            }, function(response) {
                updatePromise.reject(response.data);
            });

            return updatePromise.promise;
        }

        function create(title) {
            var createPromise = $q.defer();
            var url = configService.baseUrl + "playlists/create";

            $http.post(url, {title: title})
            .then(function(response) {
                createPromise.resolve(angular.extend({}, response.data.playlist));
            }, function(response) {
                createPromise.reject(response.data);
            });

            return createPromise.promise;
        }

        function deleteVideo(videoId) {
            var deletePromise = $q.defer();
            var url = configService.baseUrl + "videos/" + videoId;

            $http.delete(url)
            .then(function(response) {
                deletePromise.resolve(response.data);
            }, function(response) {
                deletePromise.reject(response.data);
            });

            return deletePromise.promise;
        }

        function retrieve(playlistId) {
            var retrievePromise = $q.defer();
            var url = configService.baseUrl + "playlists/get/" + playlistId;

            $http.get(url)
            .then(function(response) {
                retrievePromise.resolve(angular.extend({}, response.data.playlist));
            }, function(response) {
                retrievePromise.reject(response.data);
            });

            return retrievePromise.promise;
        }

        function retrieveAll() {
            var retrieveAllPromise = $q.defer();
            var url = configService.baseUrl + "playlists/all";

            $http.get(url)
            .then(function(response) {
                retrieveAllPromise.resolve(angular.extend({}, response.data.playlists));
            }, function(response) {
                retrieveAllPromise.reject(response.data);
            });

            return retrieveAllPromise.promise;
        }
    }
})();
