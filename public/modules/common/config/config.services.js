"use strict";

angular.module('app')
.factory('configService', configService);

configService.$inject = ['$window'];

function configService($window) {
    return $window.config.app;
}