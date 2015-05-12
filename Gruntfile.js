module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-jshint');

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
        }
    });
};