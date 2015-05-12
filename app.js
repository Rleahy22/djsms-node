"use strict";

var koa = require('koa');
var router = require('koa-router');
var views = require('co-views');
var less = require('koa-less');
var serve = require('koa-static');
var app = koa();

var render = views('views/', {
    map: {
        html: 'swig'
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
app.get(/.+/, function *(next) {
    yield next;
    this.body = yield render('index');
});

app.listen(8000, function() {
    console.log('Listening on port 8000');
});