"use strict";

var db = require('../models/index');
var Q  = require('q');

var create = function *(body) {
    return yield db.playlist.create(body);
};

var retrieve = function *(playlistId) {
    return yield db.playlist.findOne({
        where: {id: playlistId},
        include: {model: db.video}
    });
};

var retrieveAll = function *() {
    return yield db.playlist.findAll();
};

var update = function *(body) {
    var updatePromise = Q.defer();

    db.playlist.findOne({
        where: {id: body.playlist.id}
    })
    .then(function(result) {
        var playlist = result;
        db.video.findOrCreate({
            where: {
                videoid:   body.video.videoid,
                title:     body.video.title,
                thumbnail: body.video.thumbnail
            }
        })
        .spread(function(result) {
            var video = result;
            playlist.addVideo(video)
            .then(function() {
                db.playlist.findOne({
                    where: {id: playlist.id},
                    include: {model: db.video}
                })
                .then(function(result) {
                    updatePromise.resolve(result);
                });
            });
        });
    });

    return yield updatePromise.promise;
};

module.exports = {
    create:      create,
    retrieve:    retrieve,
    retrieveAll: retrieveAll,
    update:      update
};
