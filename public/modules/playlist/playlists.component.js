(function() {
    "use strict";

    const componentRegistry = {
        bindings: {},
        controller: PlaylistsCtrl,
        template: `
            <md-content layout="column" flex layout-padding role="main" class="md-accent playlists-all">
                <md-toolbar>
                    <div class="md-toolbar-tools">
                        <h2 class="md-toolbar-item">Playlists</h2>
                    </div>
                </md-toolbar>
                <form ng-submit="$ctrl.createPlaylist()">
                    <md-input-container class="playlist-create">
                        <input
                            type="text"
                            ng-model="$ctrl.newTitle"
                            class="create-input"
                            aria-label="Create new Playlist"
                            layout-align="center center"
                            placeholder="Enter Playlist Name"
                        >
                    </md-input-container>
                    <md-input-container>
                        <md-button type='submit' ng-disabled="!$ctrl.newTitle">Create Playlist</md-button>
                    </md-input-container>
                </form>
                <md-list class="playlists-list">
                    <md-list-item ng-repeat="playlist in $ctrl.playlists track by $index" class="song-row md-default-theme">
                        <a ui-sref="layout.playlist({playlistId: playlist.id})" class="md-button">{{playlist.title}}</a>
                    </md-list-item>
                </md-list>
            </md-content>
        `
    };

    function PlaylistsCtrl($state, playlistService) {
        var $ctrl = this;

        $ctrl.createPlaylist = createPlaylist;
        $ctrl.playlists      = [];

        activate();

        function activate() {
            playlistService.retrieveAll()
            .then(function(response) {
                $ctrl.playlists = response;
            });
        }

        function createPlaylist() {
            playlistService.create($ctrl.newTitle)
            .then(function(response) {
                $state.go('layout.playlist', {playlistId: response.id});
            });
        }
    }

    componentRegistry.$inject = ['$state', 'playlistService'];

    angular.module('app')
    .component('playlists', componentRegistry);
})();
