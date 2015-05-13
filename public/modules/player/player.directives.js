"use strict";

angular.module('app')
.directive('youtubePlayer', youtubePlayer);

youtubePlayer.$inject = ['$window', 'lodash'];

function youtubePlayer($window, _) {
    var directive = {
        link: link,
        templateUrl: 'modules/player/youtubePlayer.html',
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

        if ($window.YT && $window.YT.loaded) {
            scope.loadPlayer();
        } else {
            $window.onYouTubePlayerAPIReady = function() {
                scope.loadPlayer();
            };
        }

        function loadPlayer() {
            scope.player = new YT.Player('ytplayer', {
                height: '390',
                width: '640',
                playerVars: { 'autoplay': 1, 'controls': 0 },
                events:{
                    'onReady': scope.onPlayerReady
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
                scope.playStateImg = 'images/play-button.png';
            } else {
                scope.player.playVideo();
                scope.playStateImg = 'images/pause-button.png';
            }
        }

        function nextVideo() {
            scope.player.nextVideo();
        }

        function previousVideo() {
            scope.player.previousVideo();
        }
    }
}