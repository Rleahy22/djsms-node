"use strict";

angular.module('app')
.directive('youtubePlayer', youtubePlayer);

function youtubePlayer($window) {
    var directive = {
        link: link,
        templateUrl: 'modules/player/youtubePlayer.html',
        restrict: 'EA'
    };

    return directive;

    function link(scope, element, attrs) {
        scope.player;
        scope.isPlaying;
        scope.togglePlay = togglePlay;
        scope.loadPlayer = loadPlayer;
        scope.playStateImg = 'images/pause-button.png';
        scope.ready = false;

        if ($window.YT && $window.YT.loaded) {
            loadPlayer();
        } else {
            $window.onYouTubePlayerAPIReady = function() {
                loadPlayer();
            };
        }

        function loadPlayer() {
            scope.player = new YT.Player('ytplayer', {
                height: '390',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                playerVars: { 'autoplay': 1, 'controls': 0 },
            });
            scope.ready = true;
            scope.isPlaying = true;
            scope.playStateImg = 'images/pause-button.png';
        }

        function togglePlay() {
            if (scope.isPlaying) {
                scope.player.pauseVideo();
                scope.playStateImg = 'images/play-button.png';
            } else {
                scope.player.playVideo();
                scope.playStateImg = 'images/pause-button.png';
            }
            scope.isPlaying = !scope.isPlaying;
        }
    }
}