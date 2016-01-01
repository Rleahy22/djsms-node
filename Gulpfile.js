var gulp     = require('gulp');
var jshint   = require('gulp-jshint');
var Server   = require('karma').Server;
var mocha    = require('gulp-mocha')
var istanbul = require('gulp-istanbul');

gulp.task('karma', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('pre-test', function () {
  return gulp.src([
        'app.js',
        'routes.js',
        'services/*.js',
        'models/**/*.js'
    ])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});


gulp.task('mocha', ['pre-test'], function() {
    return gulp.src('test/**/*spec.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                lines: 80,
                statements: 80
            }
        }));
});

gulp.task('lint-ui', function() {
    return gulp.src([
            'app.js',
            'routes.js',
            'services/*.js',
            'models/**/*.js',
            'public/**/*.js',
            '!public/**/*.spec.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function() {
    return gulp.src('public/**/*.spec.js')
        .pipe(jshint('.jshintrctest'))
        .pipe(jshint.reporter('default'));
});

gulp.task('ci', ['lint-ui', 'lint-test', 'mocha', 'karma']);
