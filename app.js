"use strict";

var koa        = require('koa');
var bodyParser = require('koa-body-parser');
var router     = require('./routes');
var less       = require('koa-less');
var serve      = require('koa-static');
var http       = require('http');
var socketIO   = require('socket.io');
var config     = require('./config/config')();

var app = koa();

app.use(bodyParser());
app.use(less(__dirname + '/'));
app.use(serve(__dirname + '/'));

app.use(function *(next) {
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

var server = http.createServer(app.callback());
var io     = socketIO(server);

router(app, io);

server.listen(config.port || 20001, function() {
    console.log('Listening on port %s', config.port || "20001");
});

process.on('uncaughtException', function (err) {
    console.log('uncaughtException', err, err.stack);
});
