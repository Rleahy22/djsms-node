"use strict";

module.exports = function(sequelize, DataTypes) {
    var Video = sequelize.define('video', {
        videoid:   DataTypes.STRING,
        title:     DataTypes.STRING,
        thumbnail: DataTypes.STRING
    }, {
        timestamps: true,
        createdAt: 'createdat',
        updatedAt: 'updatedat',
        associate: function(models) {
            Video.belongsToMany(models.playlist, {
                through: 'playlistsvideos',
                foreignKey: 'videoid'
            });
        }
    });

    return Video;
};