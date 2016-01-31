"use strict";

(function() {
    angular.module('app')
    .factory('websocket', websocket);

    websocket.$inject = ['$window'];

    function websocket($window) {
        var socket = $window.io.connect();

        return socket;
    }
})();
