"use strict";

var db = require('../models/index');

exports.retrieve = function *(playlistId) {
    return yield db.playlist.find(playlistId);
};