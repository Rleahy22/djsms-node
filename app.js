"use strict";

var koa        = require('koa');
var bodyParser = require('koa-body-parser');
var router     = require('./routes');
var less       = require('koa-less');
var serve      = require('koa-static');
var app        = koa();

app.use(bodyParser());
app.use(less(__dirname + '/public'));
app.use(serve(__dirname + '/'));

app.use(function *(next) {
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s %s - %s ms', this.method, this.url, ms);
});

router(app);

app.listen(8000, function() {
    console.log('Listening on port 8000');
});

process.on('uncaughtException', function (err) {
    console.log('uncaughtException', err, err.stack);
});
