process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine', 'sinon'],

    files: [
        'https://www.youtube.com/player_api',
        'node_modules/lodash/lodash.js',
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

    exclude: [
    ],
    preprocessors: {
        'public/modules/**/!(*.spec).js': ['coverage'],
        'public/modules/**/*.html':       ['ng-html2js']
    },
    ngHtml2JsPreprocessor: {
        moduleName: "templates",
        stripPrefix: 'public'
    },
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

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['ChromeHeadless'],

    singleRun: true
  });
};
