(function() {
    "use strict";

    class PlayerCtrl {
        constructor ($stateParams, youtubeSearch, playlistService, _, websocketService) {
            Object.assign(this, {
                $stateParams, youtubeSearch, playlistService, _, websocketService
            });

            this.playlistId = $stateParams.playlistId;
            this.searchResult = {};
            this.updatedPlaylist = undefined;
            this.websocket = websocketService;

            this.websocket.on('text', function (data) {
                addSocketVideoToPlaylist(data.video);
            });
        }

        $onInit () {
            this.playlistService.retrieve(this.playlistId)
            .then((result) => {
                this.playlist = result;
            });
        }

        $onDestroy () {
            this.playlistService.clearPlaylist();
        };

        addSocketVideoToPlaylist (textSearchResult) {
            this.playlist.videos.push(textSearchResult);
            this.playlistService.addVideo(this.playlist, textSearchResult)
            .then((result) => {
                this.playlist = result
            });
        }

        addVideoToPlaylist () {
            this.playlist.videos.push(this.searchResult);
            this.playlistService.addVideo(this.playlist, this.searchResult)
            .then((result) => {
                this.searchText = null;
                this.searchResult = null;
                this.playlist = result;
            });
        }

        deleteVideo (videoId, event) {
            if (event.stopPropagation) { event.stopPropagation(); }
            if (event.preventDefault) { event.preventDefault(); }
            event.cancelBubble = true;
            event.returnValue = false;

            this.playlistService.deleteVideo(videoId)
            .then(() => {
                _.remove(this.playlist.videos, (video) => {
                    return video.id === videoId;
                });
            });
        }

        playVideo (index) {
            this.playlist.activeVideo = index;
        }

        search () {
            if (this.searchText) {
                this.youtubeSearch.search(this.searchText)
                    .then((result) => {
                        console.info('COMP:', result);
                        this.searchResult = {
                            thumbnail: result.snippet.thumbnails.default.url,
                            title: result.snippet.title,
                            videoid: result.id.videoId
                        };
                    });
            } else {
                this.searchResult = null;
            }
        }
    }

    const componentRegistry = {
        bindings: {},
        controller: PlayerCtrl,
        templateUrl: '/public/modules/player/player.html'
    };

    componentRegistry.$inject = [
        '$stateParams',
        'youtubeSearch',
        'playlistService',
        'lodash',
        'websocketService'
    ];

    angular.module('app')
    .component('player', componentRegistry);
})();
