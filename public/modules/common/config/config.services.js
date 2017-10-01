(function() {
    "use strict";

    class configService {
        constructor ($window) {
            this.$window = $window;
        }

        getConfig () {
            return this.$window.config.app;
        }
    }

    angular.module('app')
    .service('configService', configService);

    configService.$inject = ['$window'];
})();
