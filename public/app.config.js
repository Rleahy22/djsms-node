(function() {
    "use strict";

    angular
        .module('app')
        .config(config);

    function config ($locationProvider, $stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('layout', {
                url: '/',
                templateUrl: '/public/modules/layout.html'
            })
            .state('layout.playlists', {
                url: 'playlists',
                template: '<playlists></playlists>'
            })
            .state('layout.playlist', {
                url: 'playlists/:playlistId',
                template: '<player></player>'
            });

        $urlRouterProvider.otherwise("/");
    }
})();
