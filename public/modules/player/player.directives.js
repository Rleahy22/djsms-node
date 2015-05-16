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
            playlist: '='
        }
    };

    return directive;

    function link(scope/* ,element, attrs */) {
        scope.addVideosToPlaylist = addVideosToPlaylist;
        scope.loadPlayer          = loadPlayer;
        scope.onPlayerReady       = onPlayerReady;
        scope.player              = {};
        scope.playerPlaylist      = _.pluck(scope.playlist, 'videoId');
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

        /* istanbul ignore next */
        function loadPlayer() {
            scope.player = new YT.Player('ytplayer', {
                playerVars: { 'autoplay': 1 },
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