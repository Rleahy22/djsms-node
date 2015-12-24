"use strict";

module.exports = function(sequelize, DataTypes) {
    var Playlist = sequelize.define('playlist', {
        id: {type: DataTypes.INTEGER, unique: true, primaryKey: true},
        title: DataTypes.STRING,
    }, {
        timestamps: true,
        createdAt: 'createdat',
        updatedAt: 'updatedat',
        associate: function(models) {
            Playlist.belongsToMany(models.video, {
                through: 'playlistsvideos',
                foreignKey: 'playlistid'
            });
        }
    });

    return Playlist;
};
