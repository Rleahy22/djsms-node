"use strict";

angular.module('app')
.controller('PlayerCtrl', PlayerCtrl);

PlayerCtrl.$inject = ['$stateParams', 'youtubeSearch', 'playlistService', 'lodash', 'websocket'];

function PlayerCtrl($stateParams, youtubeSearch, playlistService, _, websocket) {
    var vm = this;

    vm.addVideoToPlaylist = addVideoToPlaylist;
    vm.deleteVideo        = deleteVideo;
    vm.playlistId         = $stateParams.playlistId;
    vm.playVideo          = playVideo;
    vm.search             = search;
    vm.searchResult       = {};
    vm.updatedPlaylist    = undefined;
    vm.websocket          = websocket;

    activate();
    vm.websocket.on('news', function (data) {
        console.log(data);
    });

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
            vm.updatedPlaylist = result;
        });
    }

    function deleteVideo(videoId, event) {
        if (event.stopPropagation) { event.stopPropagation(); }
        if (event.preventDefault) { event.preventDefault(); }
        event.cancelBubble = true;
        event.returnValue = false;

        playlistService.deleteVideo(videoId)
        .then(function() {
            _.remove(vm.playlist.videos, function(video) {
                return video.id === videoId;
            });
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
        } else {
            vm.searchResult = null;
        }
    }
}
