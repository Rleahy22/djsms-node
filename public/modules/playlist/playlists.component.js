(function() {
    "use strict";

    class PlaylistsCtrl {
        constructor ($state, playlistService) {
            Object.assign(this, { $state, playlistService });

            this.playlists = [];
        }

        $onInit () {
            this.playlistService.retrieveAll()
            .then((response) => {
                this.playlists = response;
            });
        }

        createPlaylist () {
            this.playlistService.create(this.newTitle)
            .then((response) => {
                this.$state.go('layout.playlist', { playlistId: response.id });
            });
        }
    }

    const componentRegistry = {
        bindings: {},
        controller: PlaylistsCtrl,
        templateUrl: '/public/modules/playlist/playlists.html'
    };

    componentRegistry.$inject = ['$state', 'playlistService'];

    angular.module('app')
    .component('playlists', componentRegistry);
})();
