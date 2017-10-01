"use strict";

const router = require("koa-router")();
const views = require('co-views');
const Playlist = require('./services/playlists');
const Text = require('./services/texts');
const Video = require('./services/videos');
const appConfig = require('./config/config')();

const config = JSON.stringify({
    baseUrl: appConfig.baseUrl,
    youtubeKey: appConfig.youtubeKey
});

const render = views('views/', {
    map: {
        html: 'hogan'
    }
});

module.exports = function(app, io) {
    let Socket;

    io.on('connection', function (socket) {
        console.log('connection established');
        Socket = socket;
    });

    router.get('/playlists', function *(next) {
        yield next;
        this.body = yield render('index', {
            config: config
        });
    });

    router.get('/playlists/all', function *(next) {
        yield next;
        let playlists = yield Playlist.retrieveAll();
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
        let playlist = yield Playlist.create(this.body);
        this.body = yield {
            playlist: playlist
        };
    })
    .get('/playlists/get/:id', function *(next) {
        yield next;
        let playlist = yield Playlist.retrieve(this.params.id);
        this.body = yield {
            playlist: playlist
        };
    })
    .put('/playlists/:id', function *(next) {
        yield next;
        this.body = this.request.body;
        let playlist = yield Playlist.update(this.body);
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
        let match = /(^\d+)\s(.+)$/.exec(this.request.body.Body);
        // let playlistId = match[1];
        let query      = match[2];
        // let playlist   = yield Playlist.retrieve(playlistId);
        let result     = yield Text.search(query);

        // let body = {
        //     playlist: playlist,
        //     video: {
        //         thumbnail: result.snippet.thumbnails.default.url,
        //         title: result.snippet.title,
        //         videoid: result.id.videoId
        //     }
        // };

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
