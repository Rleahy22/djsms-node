(function() {
    'use strict';

    const componentRegistry = {
        bindings: {},
        controller: songListController,
        template: `
            <md-list class="song-list">
                <md-list-item
                    ng-repeat="video in $ctrl.playlist.videos track by $index"
                    class="song-row md-default-theme"
                    ng-class="{'md-accent': $index === $ctrl.playlist.activeVideo}"
                    ng-click="$ctrl.playVideo($index)"
                >
                    <img class="song-image" src="{{video.thumbnail}}">
                    <span class="song-title">{{video.title}}</span>
                    <md-button ng-click="$ctrl.deleteVideo(video.id, $event)" class="song-delete-btn">X</md-button>
                </md-list-item>
            </md-list>
        `
    };

    function songListController ($scope, playlistService) {
        var $ctrl = this;

        $ctrl.$scope          = $scope;
        $ctrl.playlist        = playlistService.currentPlaylist;
        $ctrl.playlistService = playlistService;
        $ctrl.playVideo       = playVideo;

        $scope.$watch('$ctrl.playlistService.currentPlaylist', function(newVal) {
            $ctrl.playlist = newVal;
        });

        function playVideo(index) {
            $ctrl.playlistService.currentPlaylist.activeVideo = index;
        }
    }

    songListController.$inject = ['$scope', 'playlistService'];

    angular.module('app')
    .component('songList', componentRegistry);
})();
