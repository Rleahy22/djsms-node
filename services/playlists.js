"use strict";

var db = require('../models/index');

exports.create = function *(body) {
    return yield db.playlist.create(body);
};

exports.retrieve = function *(playlistId) {
    return yield db.playlist.findOne({
        where: {id: playlistId},
        include: {model: db.video}
    });
};

exports.retrieveAll = function *() {
    return yield db.playlist.findAll();
};