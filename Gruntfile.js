module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-istanbul-coverage');

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
            all: [
                'Gruntfile.js',
                'app.js',
                'public/**/*.js',
                '!public/bower_components/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        coverage: {
            default: {
                options: {
                    thresholds: {
                        'statements': 5
                    },
                    dir: 'coverage',
                    root: './'
                }
            }
        }
    });

    grunt.registerTask('ci', ['karma', 'coverage']);
};