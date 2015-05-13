"use strict";

angular.module('app')
.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl() {
    var vm = this;
    vm.playlist = [
        {
            videoId: 'M7lc1UVf-VE',
            title: 'this',
            thumbnail: 'http:whatever.com'
        }
    ]
}