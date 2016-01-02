"use strict";

var request    = require("request");
var _          = require("lodash");
var Q          = require("q");
var youtubeKey = require("node-yaml-config").load(__dirname + '/../config/config.yml').youtubeKey;

var search = function *(query) {
    var searchPromise = Q.defer();

    var url           = 'https://www.googleapis.com/youtube/v3/search?';
    var key           = 'key=' + youtubeKey;
    var part          = '&part=snippet';
    var maxResults    = '&maxResults=5';

    query = '&q=' + encodeURIComponent(query);
    url   = url + key + part + maxResults + query;

    request.get(url, function(error, response, body) {
        body = JSON.parse(body);
        if (!error && response.statusCode == 200) {
            _.each(body.items, function(item) {
                if (item.id.kind === "youtube#video") {
                    searchPromise.resolve(item);
                }
            });
        } else {
            searchPromise.reject(error);
        }
    });

    return yield searchPromise.promise;
};

module.exports = {
    search: search
};
