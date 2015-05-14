"use strict";

angular.module('app')
.controller('PlayerCtrl', PlayerCtrl);

PlayerCtrl.$inject = ['youtubeSearch'];

function PlayerCtrl(youtubeSearch) {
    var vm = this;
    vm.addVideoToPlaylist = addVideoToPlaylist;
    vm.playlist = [
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
    vm.search = search;
    vm.searchResult = {};

    function search() {
        youtubeSearch.search(vm.searchText)
        .then(function(result) {
            vm.searchResult = {
                thumbnail: result.snippet.thumbnails.default.url,
                title: result.snippet.title,
                videoId: result.id.videoId
            };
        });
    }

    function addVideoToPlaylist() {
        vm.playlist.push(vm.searchResult);
        vm.searchResult = {};
    }
}