"use strict";

angular.module('app')
.controller('PlayerCtrl', PlayerCtrl);

PlayerCtrl.$inject = ['$stateParams', 'youtubeSearch', 'playlistService'];

function PlayerCtrl($stateParams, youtubeSearch, playlistService) {
    var vm = this;
    vm.addVideoToPlaylist = addVideoToPlaylist;
    vm.playlistId = $stateParams.playlistId;
    vm.playVideo = playVideo;
    vm.search = search;
    vm.searchResult = {};

    activate();

    function activate() {
        playlistService.retrieve(vm.playlistId)
        .then(function(result) {
            vm.playlist = result;
        });
    }

    function addVideoToPlaylist() {
        vm.playlist.videos.push(vm.searchResult);
        playlistService.addVideo(vm.playlist, vm.searchResult)
        .then(function(result) {
            vm.searchText = null;
            vm.searchResult = null;
            vm.playlist = result;
        });
    }

    function playVideo(index) {
        vm.playlist.activeVideo = index;
    }

    function search() {
        if (vm.searchText) {
            youtubeSearch.search(vm.searchText)
            .then(function(result) {
                vm.searchResult = {
                    thumbnail: result.snippet.thumbnails.default.url,
                    title: result.snippet.title,
                    videoid: result.id.videoId
                };
            });
        }
    }
}