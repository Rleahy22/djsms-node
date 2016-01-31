"use strict";

var router     = require("koa-router")();
var views      = require('co-views');
var Playlist   = require('./services/playlists');
var Text       = require('./services/texts');
var Video      = require('./services/videos');
var yamlConfig = require('node-yaml-config');
var config     = yamlConfig.load(__dirname + '/config/config.yml');

var config = JSON.stringify({
    youtubeKey: config.youtubeKey
});
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN); // jshint ignore:line

var render = views('views/', {
    map: {
        html: 'hogan'
    }
});

module.exports = function(app, io) {
    var Socket;

    io.on('connection', function (socket) {
        console.log('connection established');
        Socket = socket;
    });

    router.get('/playlists/', function *(next) {
        yield next;
        this.body = yield render('index', {
            config: config
        });
    });

    router.get('/playlists/all', function *(next) {
        yield next;
        var playlists = yield Playlist.retrieveAll();
        this.body = yield {
            playlists: playlists
        };
    })
    .get('/playlists/:id', function *(next) {
        yield next;
        this.body = yield render('index', {
            config: config
        });
    })
    .post('/playlists/create', function *(next) {
        yield next;
        this.body = this.request.body;
        var playlist = yield Playlist.create(this.body);
        this.body = yield {
            playlist: playlist
        };
    })
    .get('/playlists/get/:id', function *(next) {
        yield next;
        var playlist = yield Playlist.retrieve(this.params.id);
        this.body = yield {
            playlist: playlist
        };
    })
    .put('/playlists/:id', function *(next) {
        yield next;
        this.body = this.request.body;
        var playlist = yield Playlist.update(this.body);
        this.body = yield {
            playlist: playlist
        };
    })
    .del('/videos/:id', function *(next) {
        yield next;
        this.body = this.request.body;
        yield Video.destroy(this.params.id);
    })
    .post('/text', function *(next) {
        yield next;
        var match = /(^\d+)\s(.+)$/.exec(this.request.body.Body);
        var playlistId = match[1];
        var query      = match[2];
        var playlist   = yield Playlist.retrieve(playlistId);
        var result     = yield Text.search(query);

        var body = {
            playlist: playlist,
            video: {
                thumbnail: result.snippet.thumbnails.default.url,
                title: result.snippet.title,
                videoid: result.id.videoId
            }
        };

        Socket.emit('text', {
            video: {
                thumbnail: result.snippet.thumbnails.default.url,
                title: result.snippet.title,
                videoid: result.id.videoId
            }
        });
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
