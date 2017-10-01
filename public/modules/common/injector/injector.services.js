(function () {
    "use strict";

    class lodash {
        constructor ($window) {
            return $window._;
        }
    }

    angular.module('app')
        .service('lodash', lodash);

    lodash.$inject = ['$window'];
})();
