"use strict";

angular.module('app')
.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl($window) {
    var vm = this;
    vm.player;
    vm.isPlaying;
    vm.togglePlay = togglePlay;
    vm.playStateImg = 'images/pause-button.png';
    vm.ready = false;

    $window.onYouTubePlayerAPIReady = function() {
        vm.player = new YT.Player('ytplayer', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            playerVars: { 'autoplay': 1, 'controls': 0 },
        });
        vm.ready = true;
        vm.isPlaying = true;
        vm.playStateImg = 'images/pause-button.png';
    };

    function togglePlay() {
        if (vm.isPlaying) {
            vm.player.pauseVideo();
            vm.playStateImg = 'images/play-button.png';
        } else {
            vm.player.playVideo();
            vm.playStateImg = 'images/pause-button.png';
        }
        vm.isPlaying = !vm.isPlaying;
    }
}