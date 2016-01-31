(function() {
    "use strict";

    angular.module('app')
    .service('websocketService', websocketService);

    websocketService.$inject = ['$window'];

    function websocketService($window) {
        var socket = $window.io.connect();

        return socket;
    }
})();
