(function() {
    "use strict";

    class PlaylistService {
        constructor ($http, configService) {
            Object.assign(this, { $http, configService });

            this.currentPlaylist = {};
        }

        addVideo (playlist, video) {
            let url = this.configService.baseUrl + "playlists/" + playlist.id;

            return this.$http.put(url, {
                playlist: playlist,
                video: video
            })
                .then((response) => {
                    return Object.assign({}, response.data.playlist);
                });
        }

        clearPlaylist () {
            this.currentPlaylist = {};
        }

        create (title) {
            let url = this.configService.baseUrl + "playlists/create";

            return this.$http.post(url, { title: title })
                .then((response) => {
                    return Object.assign({}, response.data.playlist);
                });
        }

        deleteVideo (videoId) {
            let url = this.configService.baseUrl + "videos/" + videoId;

            return this.$http.delete(url)
                .then((response) => {
                    return response.data;
                });
        }

        retrieve (playlistId) {
            let url = this.configService.baseUrl + "playlists/get/" + playlistId;

            return this.$http.get(url)
                .then((response) => {
                    Object.assign(this.currentPlaylist, response.data.playlist);
                    return this.currentPlaylist;
                });
        }

        retrieveAll () {
            let url = this.configService.baseUrl + "playlists/all";

            return this.$http.get(url)
                .then((response) => {
                    return Object.assign({}, response.data.playlists);
                });
        }

        getCurrentPlaylist () {
            return this.currentPlaylist;
        }
    }

    angular.module('app')
    .factory('playlistService', PlaylistService);

    PlaylistService.$inject = ['$http', 'configService'];
})();
