"use strict";

angular.module('app')
.directive('youtubePlayer', youtubePlayer);

youtubePlayer.$inject = ['$window', 'lodash'];

function youtubePlayer($window, _) {
    var directive = {
        link: link,
        templateUrl: '/modules/player/youtubePlayer.html',
        restrict: 'EA',
        scope: {
            playlist: '='
        }
    };

    return directive;

    function link(scope/* ,element, attrs */) {
        scope.addVideosToPlaylist = addVideosToPlaylist;
        scope.loadPlayer          = loadPlayer;
        scope.nextVideo           = nextVideo;
        scope.onPlayerReady       = onPlayerReady;
        scope.player              = {};
        scope.playerPlaylist      = _.pluck(scope.playlist, 'videoId');
        scope.playStateImg        = 'images/play-button.png';
        scope.previousVideo       = previousVideo;
        scope.ready               = false;
        scope.togglePlay          = togglePlay;
        scope.updatePlaylist      = updatePlaylist;
        scope.updateState         = updateState;

        /* istanbul ignore next */
        if ($window.YT && $window.YT.loaded) {
            scope.loadPlayer();
        } else {
            $window.onYouTubePlayerAPIReady = function() {
                scope.loadPlayer();
            };
        }

        /* istanbul ignore next */
        function loadPlayer() {
            scope.player = new YT.Player('ytplayer', {
                playerVars: { 'autoplay': 1, 'controls': 0 },
                events:{
                    'onReady': scope.onPlayerReady,
                    'onStateChange': scope.updateState
                }
            });
        }

        function onPlayerReady() {
            scope.ready = true;
            scope.addVideosToPlaylist();
        }

        function addVideosToPlaylist() {
            scope.player.cuePlaylist(scope.playerPlaylist);
        }

        function togglePlay() {
            var isPlaying = scope.player.getPlayerState();
            if (isPlaying === 1) {
                scope.player.pauseVideo();
            } else {
                scope.player.playVideo();
            }
        }

        function updateState(event) {
            if (event.data === 1) {
                scope.playStateImg = 'images/pause-button.png';
            } else {
                scope.playStateImg = 'images/play-button.png';
            }
            scope.$digest();
        }

        function nextVideo() {
            scope.player.nextVideo();
        }

        function previousVideo() {
            scope.player.previousVideo();
        }

        function updatePlaylist() {
            scope.playerPlaylist = _.pluck(scope.playlist, 'videoId');
            var currentTime = scope.player.getCurrentTime();
            var currentIndex = scope.player.getPlaylistIndex();
            scope.player.loadPlaylist(scope.playerPlaylist, currentIndex, currentTime);
        }

        scope.$watch('playlist.length', function() {
            if (scope.ready) {
                scope.updatePlaylist();
            }
        });
    }
}