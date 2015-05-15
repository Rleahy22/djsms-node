"use strict";

module.exports = function(sequelize, DataTypes) {
    var Playlist = sequelize.define('playlist', {
        title: DataTypes.STRING,
    }, {
        timestamps: true,
        createdAt: 'createdat',
        updatedAt: 'updatedat'

    });

    return Playlist;
};