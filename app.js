"use strict";

var koa = require('koa');
var router = require('koa-router');
var views = require('co-views');
var less = require('koa-less');
var serve = require('koa-static');
var Playlist = require('./services/playlists');
var app = koa();

var config = JSON.stringify({
    youtubeKey: process.env.YOUTUBE_KEY
});

var render = views('views/', {
    map: {
        html: 'hogan'
    }
});

app.use(less(__dirname + '/public'));
app.use(serve(__dirname + '/public'));

app.use(function *(next){
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

app.use(router(app));
app.get('/layout/player/:id', function *(next) {
    yield next;
    this.body = yield render('index', {
        config: config
    });

});
app.get('/layout/player/get/:id', function *(next) {
    yield next;
    var playlist = yield Playlist.retrieve(this.params.id);
    this.body = yield {
        playlist: playlist
    };
});

app.listen(8000, function() {
    console.log('Listening on port 8000');
});

process.on('uncaughtException', function (err) {
    console.log('uncaughtException', err, err.stack);
});