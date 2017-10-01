"use strict";

const koa        = require('koa');
const bodyParser = require('koa-body-parser');
const router     = require('./routes');
const less       = require('koa-less');
const serve      = require('koa-static');
const http       = require('http');
const socketIO   = require('socket.io');
const config     = require('./config/config')();

let app = koa();

app.use(bodyParser());
app.use(less(__dirname + '/'));
app.use(serve(__dirname + '/'));

app.use(function *(next) {
  let start = new Date();
  yield next;
  let ms = new Date() - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

let server = http.createServer(app.callback());
let io     = socketIO(server);

router(app, io);

server.listen(config.port || 20001, function() {
    console.log('Listening on port %s', config.port || "20001");
});

process.on('uncaughtException', function (err) {
    console.log('uncaughtException', err, err.stack);
});
