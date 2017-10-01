(function() {
    'use strict';

    class SongListController {
        constructor (playlistService) {
            Object.assign(this, { playlistService });
        }

        $onInit () {
            this.playlist = this.playlistService.getCurrentPlaylist();
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
            this.playlistService.currentPlaylist.activeVideo = index;
        }
    }

    const componentRegistry = {
        bindings: {},
        controller: SongListController,
        templateUrl: '/public/modules/songList/songList.html'
    };

    SongListController.$inject = ['playlistService'];

    angular.module('app')
    .component('songList', componentRegistry);
})();
