module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-istanbul-coverage');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.initConfig({
        wiredep: {
            task: {
                src: [
                    'views/index.html',   // .html support...
                ],
                ignorePath: '../public/',
            }
        },
        jshint: {
            ui: {
                src: [
                    'app.js',
                    'routes.js',
                    'services/*.js',
                    'models/**/*.js',
                    'public/**/*.js',
                    '!public/**/*.spec.js'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            },
            test: {
                src: [
                    'public/**/*.spec.js',
                ],
                options: {
                    jshintrc: '.jshintrctest'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                },
                src: ['test/**/*spec.js']
            }
        },
        mocha_istanbul: {
            coverage: {
                src: './test',
                options: {
                    mask: '**/*spec.js',
                    coverageFolder: 'coverage/node',
                }
            }
        },
        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: 'coverage/node*',
                    check: {
                        lines: 80,
                        statements: 80
                    }
                }
            }
        },
        coverage: {
            default: {
                options: {
                    thresholds: {
                        'statements': 95
                    },
                    dir: 'coverage',
                    root: './'
                }
            }
        }
    });

    grunt.registerTask('ci', ['jshint', 'mochaTest', 'mocha_istanbul', 'istanbul_check_coverage', 'karma', 'coverage']);
};
