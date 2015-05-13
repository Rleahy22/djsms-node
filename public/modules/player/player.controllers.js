"use strict";

angular.module('app')
.controller('PlayerCtrl', PlayerCtrl);

function PlayerCtrl() {
    var vm = this;
    vm.playlist = [
        {
            videoId: 'M7lc1UVf-VE',
            title: 'this',
            thumbnail: 'http://whatever.com'
        },
        {
            videoId: 'tnXO-i7944M',
            title: 'Dan Wahlin - AngularJS in 20ish Minutes - NG-Conf 2014',
            thumbnail: 'https://thing.com'
        }
    ];
}