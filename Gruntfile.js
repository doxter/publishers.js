module.exports = function(grunt) {
  'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        jasmine : {
            src : 'src/**/*.js',
            options : {
                vendor: [
                    'vendor/jasmine/jasmine-ajax.js'],
                specs : 'spec/**/*.js'
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'spec/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['karma']);

};
