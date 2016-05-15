(function() {
    "use strict";

    const componentRegistry = {
        bindings: {},
        controller: PlayerCtrl,
        template: `
            <md-content layout="column" layout-padding role="main" class="md-accent djsms-player">
                <md-toolbar>
                    <div class="md-toolbar-tools">
                        <h2 class="md-toolbar-item md-breadcrumb">
                            <span><a ui-sref="layout.playlists">Playlists</a></span>
                            <span class="seperator-icon">&gt;</span>
                            <span md-breadcrumb-page>{{$ctrl.playlist.title}}</span>
                        </h2>
                    </div>
                </md-toolbar>
                <md-input-container class="youtube-search">
                    <form ng-submit="$ctrl.addVideoToPlaylist($ctrl.searchResult.videoId)">
                        <input
                            type="text"
                            ng-model="$ctrl.searchText"
                            class="search-input"
                            aria-label="Search Youtube"
                            ng-keyup="$ctrl.search()"
                            layout-align="center center"
                            placeholder="Search for Song"
                        >
                    </form>
                </md-input-container>
                <md-button class="search-results" ng-if="$ctrl.searchResult.thumbnail" ng-click="$ctrl.addVideoToPlaylist($ctrl.searchResult.videoId)">
                    <div layout="row" layout-align="center center">
                        <img class="result-image" src="{{$ctrl.searchResult.thumbnail}}">
                        <span class="result-text">{{$ctrl.searchResult.title}}</span>
                    </div>
                </md-button>
                <youtube-player
                    class="youtube-player"
                    playlist="$ctrl.playlist"
                    active-video="$ctrl.activeVideo"
                    updated-playlist="$ctrl.updatedPlaylist"
                    ng-show="$ctrl.playlist.videos.length"
                    layout="column"
                    layout-align="center center">
                </youtube-player>
                <md-list class="song-list">
                    <md-list-item
                        ng-repeat="video in $ctrl.playlist.videos track by $index"
                        class="song-row md-default-theme"
                        ng-class="{'md-accent': $index === $ctrl.playlist.activeVideo}"
                        ng-click="$ctrl.playVideo($index)"
                    >
                        <img class="song-image" src="{{video.thumbnail}}">
                        <span>{{video.title}}</span>
                        <md-button ng-click="$ctrl.deleteVideo(video.id, $event)" class="song-delete-btn">X</md-button>
                    </md-list-item>
                </md-list>
            </md-content>
        `
    };

    function PlayerCtrl($stateParams, youtubeSearch, playlistService, _, websocketService) {
        var $ctrl = this;

        $ctrl.addVideoToPlaylist       = addVideoToPlaylist;
        $ctrl.addSocketVideoToPlaylist = addSocketVideoToPlaylist;
        $ctrl.deleteVideo              = deleteVideo;
        $ctrl.playlistId               = $stateParams.playlistId;
        $ctrl.playVideo                = playVideo;
        $ctrl.search                   = search;
        $ctrl.searchResult             = {};
        $ctrl.updatedPlaylist          = undefined;
        $ctrl.websocket                = websocketService;

        $ctrl.websocket.on('text', function (data) {
            addSocketVideoToPlaylist(data.video);
        });

        $ctrl.$onInit = function() {
            playlistService.retrieve($ctrl.playlistId)
            .then(function(result) {
                $ctrl.playlist = result;
            });
        };

        function addSocketVideoToPlaylist(textSearchResult) {
            $ctrl.playlist.videos.push(textSearchResult);
            playlistService.addVideo($ctrl.playlist, textSearchResult)
            .then(function(result) {
                $ctrl.updatedPlaylist = result;
            });
        }

        function addVideoToPlaylist() {
            $ctrl.playlist.videos.push($ctrl.searchResult);
            playlistService.addVideo($ctrl.playlist, $ctrl.searchResult)
            .then(function(result) {
                $ctrl.searchText = null;
                $ctrl.searchResult = null;
                $ctrl.updatedPlaylist = result;
            });
        }

        function deleteVideo(videoId, event) {
            if (event.stopPropagation) { event.stopPropagation(); }
            if (event.preventDefault) { event.preventDefault(); }
            event.cancelBubble = true;
            event.returnValue = false;

            playlistService.deleteVideo(videoId)
            .then(function() {
                _.remove($ctrl.playlist.videos, function(video) {
                    return video.id === videoId;
                });
            });
        }

        function playVideo(index) {
            $ctrl.playlist.activeVideo = index;
        }

        function search() {
            if ($ctrl.searchText) {
                youtubeSearch.search($ctrl.searchText)
                .then(function(result) {
                    $ctrl.searchResult = {
                        thumbnail: result.snippet.thumbnails.default.url,
                        title: result.snippet.title,
                        videoid: result.id.videoId
                    };
                });
            } else {
                $ctrl.searchResult = null;
            }
        }
    }

    componentRegistry.$inject = ['$stateParams',
        'youtubeSearch',
        'playlistService',
        'lodash',
        'websocketService'
    ];

    angular.module('app')
    .component('player', componentRegistry);
})();
