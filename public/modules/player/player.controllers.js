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
            vm.playlist.videos = [
                {
                    videoId: 'M7lc1UVf-VE',
                    title: 'YouTube Developers Live: Embedded Web Player Customization',
                    thumbnail: 'https://i.ytimg.com/vi/M7lc1UVf-VE/default.jpg'
                },
                {
                    videoId: 'tnXO-i7944M',
                    title: 'Dan Wahlin - AngularJS in 20ish Minutes - NG-Conf 2014',
                    thumbnail: 'https://i.ytimg.com/vi/i9MHigUZKEM/default.jpg'
                }
            ];
        });
    }

    function addVideoToPlaylist() {
        vm.playlist.videos.push(vm.searchResult);
        vm.searchText = null;
        vm.searchResult = null;
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
                    videoId: result.id.videoId
                };
            });
        }
    }
}