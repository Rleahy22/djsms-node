"use strict";

angular.module('app')
.factory('lodash', lodash);

lodash.$inject = ['$window'];

function lodash($window) {
    return $window._;
}