"use strict";

angular
    .module('app')
    .config(config);

function config($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('layout', {
            url: '/layout',
            templateUrl: '/modules/layout.html'
        })
        .state('layout.player', {
            url: '/player',
            templateUrl: '/modules/player/player.html',
            controller: 'PlayerCtrl as player'
        });

    $urlRouterProvider.otherwise("/layout");
}