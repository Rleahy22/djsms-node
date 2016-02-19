(function() {
    "use strict";

    angular.module('app')
    .controller('PlaylistsCtrl', PlaylistsCtrl);

    PlaylistsCtrl.$inject = ['$state', 'playlistService'];

    function PlaylistsCtrl($state, playlistService) {
        var vm = this;

        vm.createPlaylist = createPlaylist;
        vm.playlists      = [];

        activate();

        function activate() {
            playlistService.retrieveAll()
            .then(function(response) {
                vm.playlists = response;
            });
        }

        function createPlaylist() {
            playlistService.create(vm.newTitle)
            .then(function(response) {
                $state.go('layout.playlist', {playlistId: response.id});
            });
        }
    }
})();
