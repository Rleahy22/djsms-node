(function() {
    "use strict";

    angular
        .module('app')
        .config(config);

    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('layout', {
                url: '/',
                templateUrl: '/public/modules/layout.html'
            })
            .state('layout.playlists', {
                url: 'playlists',
                templateUrl: '/public/modules/playlist/playlists.html'
            })
            .state('layout.playlist', {
                url: 'playlists/:playlistId',
                templateUrl: '/public/modules/player/player.html'
            });

        $urlRouterProvider.otherwise("/");
    }
})();
