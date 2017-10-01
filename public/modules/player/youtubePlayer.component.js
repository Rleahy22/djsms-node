(function() {
    "use strict";

    class YoutubePlayer {
        constructor ($window, _) {
            Object.assign(this, { $window, _ });

            this.player = {};
            this.ready = false;
        }

        $onInit () {
            /* istanbul ignore next */
            if (this.$window.YT && this.$window.YT.loaded) {
                this.loadPlayer();
            } else {
                this.$window.onYouTubePlayerAPIReady = () => {
                    this.loadPlayer();
                };
            }
        };

        $onChanges (changesObj) {
            let { videos, activeVideo } = changesObj;

            if (videos && videos.currentValue && this.ready) {
                this.updatePlaylist();
            } else if (activeVideo && activeVideo.currentValue && this.ready) {
                this.changeVideo(activeVideo.currentValue);
            }
        }

        addVideosToPlaylist () {
            this.player.cuePlaylist(this.playerPlaylist);
        }

        changeVideo (index) {
            let currentIndex = this.player.getPlaylistIndex();
            if (currentIndex !== index) {
                this.player.playVideoAt(index);
            }
        }

        /* istanbul ignore next */
        loadPlayer () {
            this.player = new YT.Player('ytplayer', {
                playerVars: { 'autoplay': 1 },
                events: {
                    'onReady': this.onPlayerReady.bind(this),
                    'onStateChange': this.onStateChange.bind(this)
                }
            });
        }

        onPlayerReady () {
            this.ready = true;
            if (!(_.isEmpty(this.videos))) {
                this.playerPlaylist = _.map(this.videos, 'videoid');
                this.addVideosToPlaylist();
            }
        }

        onStateChange () {
            let currentIndex = this.player.getPlaylistIndex();

            if (currentIndex !== this.activeVideo && this.updatedPlaylist) {
                this.updatePlaylist();
            }

            this.activeVideo = currentIndex;
        }

        updatePlaylist () {
            this.playerPlaylist = _.map(this.videos, 'videoid');
            let currentTime = this.player.getCurrentTime();
            let currentIndex = this.player.getPlaylistIndex();

            this.player.loadPlaylist(this.playerPlaylist, currentIndex, currentTime);
        }
    }

    const componentRegistry = {
        bindings: {
            activeVideo: '<',
            videos: '<',
        },
        controller: YoutubePlayer,
        template: '<div id="ytplayer"></div>'
    };

    componentRegistry.$inject = ['$window', 'lodash'];

    angular.module('app')
    .component('youtubePlayer', componentRegistry);
})();
