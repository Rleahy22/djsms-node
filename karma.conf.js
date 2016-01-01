// Karma configuration
// Generated on Wed May 13 2015 20:13:11 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
        'https://www.youtube.com/player_api',
        'node_modules/lodash/index.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/angular-material/angular-material.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/bardjs/dist/bard.js',
        'public/app.module.js',
        'public/app.config.js',
        'public/modules/**/*.js',
        'public/modules/**/*.html',
        'public/modules/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'public/modules/**/!(*.spec).js': ['coverage'],
        'public/modules/**/*.html':       ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
        moduleName: "templates",
        stripPrefix: 'public'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'threshold'],

    coverageReporter: {
        reporters: [
            {
                type: 'json',
                dir: 'coverage'
            },
            {
                type: 'html',
                dir: 'coverage'
            }
        ]
    },

    thresholdReporter: {
        statements: 95,
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
