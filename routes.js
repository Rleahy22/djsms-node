"use strict";

var router   = require("koa-router");
var views    = require('co-views');
var Playlist = require('./services/playlists');

var config = JSON.stringify({
    youtubeKey: process.env.YOUTUBE_KEY
});
var render = views('views/', {
    map: {
        html: 'hogan'
    }
});

module.exports = function(app) {
    app.use(router(app));

    app.get('/playlists/', function *(next) {
        yield next;
        this.body = yield render('index', {
            config: config
        });
    });

    app.get('/playlists/all', function *(next) {
        yield next;
        var playlists = yield Playlist.retrieveAll();
        this.body = yield {
            playlists: playlists
        };
    });
    app.get('/playlists/:id', function *(next) {
        yield next;
        this.body = yield render('index', {
            config: config
        });
    });
    app.post('/playlists/create', function *(next) {
        yield next;
        this.body = this.request.body;
        var playlist = yield Playlist.create(this.body);
        this.body = yield {
            playlist: playlist
        };

    });
    app.get('/playlists/get/:id', function *(next) {
        yield next;
        var playlist = yield Playlist.retrieve(this.params.id);
        this.body = yield {
            playlist: playlist
        };
    });
};