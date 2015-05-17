"use strict";

var db = require('../models/index');

exports.create = function *(body) {
    return yield db.playlist.create(body);
};

exports.retrieve = function *(playlistId) {
    return yield db.playlist.find(playlistId);
};

exports.retrieveAll = function *() {
    return yield db.playlist.findAll();
};