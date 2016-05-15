(function() {
    "use strict";

    var componentRegistry = {
        bindings: {
            activeVideo:     '=',
            playlist:        '=',
            updatedPlaylist: '='
        },
        controller: controller,
        template: '<div id="ytplayer"></div>'
    };

    function controller($scope, $window, _) {
        var $ctrl = this;

        $ctrl.addVideosToPlaylist = addVideosToPlaylist;
        $ctrl.changeVideo         = changeVideo;
        $ctrl.loadPlayer          = loadPlayer;
        $ctrl.onPlayerReady       = onPlayerReady;
        $ctrl.onStateChange       = onStateChange;
        $ctrl.player              = {};
        $ctrl.ready               = false;
        $ctrl.updatePlaylist      = updatePlaylist;

        $ctrl.$onInit = function() {
            /* istanbul ignore next */
            if ($window.YT && $window.YT.loaded) {
                $ctrl.loadPlayer();
            } else {
                $window.onYouTubePlayerAPIReady = function() {
                    $ctrl.loadPlayer();
                };
            }
        };

        function addVideosToPlaylist() {
            $ctrl.player.cuePlaylist($ctrl.playerPlaylist);
        }

        function changeVideo(index) {
            var currentIndex = $ctrl.player.getPlaylistIndex();
            if (currentIndex !== index) {
                $ctrl.player.playVideoAt(index);
            }
        }

        /* istanbul ignore next */
        function loadPlayer() {
            $ctrl.player = new YT.Player('ytplayer', {
                playerVars: { 'autoplay': 1 },
                events: {
                    'onReady': $ctrl.onPlayerReady,
                    'onStateChange': $ctrl.onStateChange
                }
            });
        }

        function onPlayerReady() {
            $ctrl.ready = true;
            if (!(_.isEmpty($ctrl.playlist.videos))) {
                $ctrl.playerPlaylist = _.pluck($ctrl.playlist.videos, 'videoid');
                $ctrl.addVideosToPlaylist();
            }
        }

        function onStateChange() {
            var currentIndex = $ctrl.player.getPlaylistIndex();

            if (currentIndex !== $ctrl.playlist.activeVideo && $ctrl.updatedPlaylist) {
                $ctrl.playlist = $ctrl.updatedPlaylist;
                $ctrl.updatedPlaylist = undefined;
                $ctrl.updatePlaylist();
            }

            $ctrl.playlist.activeVideo = currentIndex;
            $scope.$apply();
        }

        function updatePlaylist() {
            $ctrl.playerPlaylist = _.pluck($ctrl.playlist.videos, 'videoid');
            var currentTime = $ctrl.player.getCurrentTime();
            var currentIndex = $ctrl.player.getPlaylistIndex();
            $ctrl.player.loadPlaylist($ctrl.playerPlaylist, currentIndex, currentTime);
        }

        $scope.$watch('$ctrl.updatedPlaylist.videos', function() {
            if ($ctrl.updatedPlaylist && $ctrl.player.getPlayerState) {
                if ($ctrl.player.getPlayerState() !== 1) {
                    $ctrl.playlist = $ctrl.updatedPlaylist;
                    $ctrl.updatedPlaylist = undefined;
                    $ctrl.updatePlaylist();
                }
            }
        });

        $scope.$watch('$ctrl.playlist.activeVideo', function() {
            if ($ctrl.playlist && $ctrl.ready) {
                $ctrl.changeVideo($ctrl.playlist.activeVideo);
            }
        });
    }

    componentRegistry.$inject = ['$scope', '$window', 'lodash'];

    angular.module('app')
    .component('youtubePlayer', componentRegistry);
})();
