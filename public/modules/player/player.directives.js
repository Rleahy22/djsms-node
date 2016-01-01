"use strict";

angular.module('app')
.directive('youtubePlayer', youtubePlayer);

youtubePlayer.$inject = ['$window', 'lodash'];

function youtubePlayer($window, _) {
    var directive = {
        link: link,
        template: '<div id="ytplayer"></div>',
        restrict: 'EA',
        scope: {
            activeVideo:     '=',
            playlist:        '=',
            updatedPlaylist: '='
        }
    };

    return directive;

    function link(scope/* ,element, attrs */) {
        scope.addVideosToPlaylist = addVideosToPlaylist;
        scope.changeVideo         = changeVideo;
        scope.loadPlayer          = loadPlayer;
        scope.onPlayerReady       = onPlayerReady;
        scope.onStateChange       = onStateChange;
        scope.player              = {};
        scope.ready               = false;
        scope.updatePlaylist      = updatePlaylist;

        /* istanbul ignore next */
        if ($window.YT && $window.YT.loaded) {
            scope.loadPlayer();
        } else {
            $window.onYouTubePlayerAPIReady = function() {
                scope.loadPlayer();
            };
        }

        function addVideosToPlaylist() {
            scope.player.cuePlaylist(scope.playerPlaylist);
        }

        function changeVideo(index) {
            var currentIndex = scope.player.getPlaylistIndex();
            if (currentIndex !== index) {
                scope.player.playVideoAt(index);
            }
        }

        /* istanbul ignore next */
        function loadPlayer() {
            scope.player = new YT.Player('ytplayer', {
                playerVars: { 'autoplay': 1 },
                events: {
                    'onReady': scope.onPlayerReady,
                    'onStateChange': scope.onStateChange
                }
            });
        }

        function onPlayerReady() {
            scope.ready = true;
            if (!(_.isEmpty(scope.playlist.videos))) {
                scope.playerPlaylist = _.pluck(scope.playlist.videos, 'videoid');
                scope.addVideosToPlaylist();
            }
        }

        function onStateChange() {
            var currentIndex = scope.player.getPlaylistIndex();

            if (currentIndex !== scope.playlist.activeVideo && scope.updatedPlaylist) {
                scope.playlist = scope.updatedPlaylist;
                scope.updatedPlaylist = undefined;
                scope.updatePlaylist();
            }

            scope.playlist.activeVideo = currentIndex;
            scope.$apply();
        }

        function updatePlaylist() {
            scope.playerPlaylist = _.pluck(scope.playlist.videos, 'videoid');
            var currentTime = scope.player.getCurrentTime();
            var currentIndex = scope.player.getPlaylistIndex();
            scope.player.loadPlaylist(scope.playerPlaylist, currentIndex, currentTime);
        }

        // scope.$watch('playlist.videos.length', function() {
        //     if (scope.ready) {
        //         scope.updatePlaylist();
        //     }
        // });

        scope.$watch('playlist.activeVideo', function() {
            if (scope.playlist && scope.ready) {
                scope.changeVideo(scope.playlist.activeVideo);
            }
        });
    }
}
