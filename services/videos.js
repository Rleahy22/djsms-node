"use strict";

var db = require('../models/index');
var Q  = require('q');

exports.delete = function *(videoId) {
    var destroyPromise = Q.defer();

    db.video.findOne({
        where: {id: videoId}
    })
    .then(function(video) {
        video.destroy()
        .then(function(result) {
            destroyPromise.resolve(result);
        });
    });

    return yield destroyPromise.promise;
};
