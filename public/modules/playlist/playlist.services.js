(function() {
    "use strict";

    class PlaylistService {
        constructor ($http, configService) {
            Object.assign(this, { $http, configService });

            this.config = this.configService.getConfig();

            this.currentPlaylist = {};
        }

        addVideo (playlist, video) {
            let url = this.config.baseUrl + "playlists/" + playlist.id;

            return this.$http.put(url, {
                playlist: playlist,
                video: video
            })
                .then((response) => {
                    return Object.assign({}, response.data.playlist);
                });
        }

        clearPlaylist () {
            for (var key in this.currentPlaylist){
                if (this.currentPlaylist.hasOwnProperty(key)){
                    delete this.currentPlaylist[key];
                }
            }
        }

        create (title) {
            let url = this.config.baseUrl + "playlists/create";

            return this.$http.post(url, { title: title })
                .then((response) => {
                    return Object.assign({}, response.data.playlist);
                });
        }

        deleteVideo (videoId) {
            let url = this.config.baseUrl + "videos/" + videoId;

            return this.$http.delete(url)
                .then((response) => {
                    this.currentPlaylist.videos.forEach((video, index) => {
                        if (video.videoId === videoId) {
                            this.currentPlaylist.videos.splice(index, 0);
                        }
                    });

                    return response.data;
                });
        }

        retrieve (playlistId) {
            let url = this.config.baseUrl + "playlists/get/" + playlistId;

            return this.$http.get(url)
                .then((response) => {
                    Object.assign(this.currentPlaylist, response.data.playlist);
                    return this.currentPlaylist;
                });
        }

        retrieveAll () {
            let url = this.config.baseUrl + "playlists/all";

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
