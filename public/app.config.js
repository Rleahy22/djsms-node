"use strict";

angular
    .module('app')
    .config(config);

function config($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('layout', {
            url: '/',
            templateUrl: '/modules/layout.html'
        })
        .state('layout.playlists', {
            url: 'playlists',
            templateUrl: '/modules/playlist/playlists.html',
            controller: 'PlaylistsCtrl as playlists'
        })
        .state('layout.playlist', {
            url: 'playlists/:playlistId',
            templateUrl: '/modules/player/player.html',
            controller: 'PlayerCtrl as player'
        });

    $urlRouterProvider.otherwise("/");
}