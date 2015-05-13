"use strict";

angular.module('app')
.directive('youtubePlayer', youtubePlayer);

youtubePlayer.$inject = ['$window', '$q', 'lodash'];

function youtubePlayer($window, $q, _) {
    var directive = {
        link: link,
        templateUrl: 'modules/player/youtubePlayer.html',
        restrict: 'EA',
        scope: {
            playlist: '='
        }
    };

    return directive;

    function link(scope, element, attrs) {
        scope.player;
        scope.isPlaying;
        scope.togglePlay = togglePlay;
        scope.loadPlayer = loadPlayer;
        scope.onPlayerReady = onPlayerReady;
        scope.addVideosToPlaylist = addVideosToPlaylist;
        scope.playStateImg = 'images/pause-button.png';
        scope.ready = false;

        if ($window.YT && $window.YT.loaded) {
            scope.loadPlayer()
        } else {
            $window.onYouTubePlayerAPIReady = function() {
                scope.loadPlayer()
            };
        }

        function loadPlayer() {
            var playerPromise = $q.defer();
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
            scope.isPlaying = true;
            scope.playStateImg = 'images/pause-button.png';
            scope.addVideosToPlaylist();
        }

        function addVideosToPlaylist() {
            _.each(scope.playlist, function(video) {
                scope.player.loadVideoById(video.videoId);
            });
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