"use strict";

var fs         = require('fs');
var path       = require('path');
var yamlConfig = require('node-yaml-config');
var dbConfig   = yamlConfig.load(__dirname + '/../config/config.yml').db;
var Sequelize  = require('sequelize');
var sequelize  = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: "postgres",
        returning: true,
        omitNull: true,
        logging: dbConfig.logging
    }
);
var models = {};

fs.readdirSync(__dirname + '/')
.filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function(file) {
    var model = sequelize.import(path.join(__dirname + '/', file));
    models[model.name] = model;
});

Object.keys(models).forEach(function (modelName) {
    console.log(modelName);
    if (models[modelName].options.hasOwnProperty('associate')) {
        models[modelName].options.associate(models);
    }
});

module.exports = models;
module.exports.sequelize = sequelize;
