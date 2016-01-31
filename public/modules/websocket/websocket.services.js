"use strict";

(function() {
    angular.module('app')
    .factory('websocket', websocket);

    function websocket() {
        var socket = io.connect();

        return socket;
    }
})();
