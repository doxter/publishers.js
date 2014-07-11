module.exports = function(grunt) {
  'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
          dist: {
            src: ['src/intro.js', 'src/DoxterDownloader.js', 'src/outro.js'],
              dest: 'dist/built.js'
              }
            },
        uglify: {
            options: {
              mangle: false
            },
            my_target: {
                files: {
                    'dest/doxter_publisher.min.js': ['dist/built.js'],
                    'public/doxter_publisher.min.js': ['dist/built.js']
                }
            }
        },
        jasmine : {
            src : 'src/DoxterDownloader.js',
            options : {
                vendor: ['vendor/*.js',
                    'vendor/**/*.js'],
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('test', ['jasmine']);

    grunt.registerTask('build', ['concat','uglify']);
    grunt.registerTask('default', ['test']);

};
