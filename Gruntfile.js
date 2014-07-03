module.exports = function(grunt) {
  'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
              mangle: false
            },
            my_target: {
                files: {
                    'dest/doxter_publisher.min.js': ['src/DoxterDownloader.js']
                }
            }
        },
        jasmine : {
            src : 'src/**/*.js',
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
;

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('default', ['test']);

};
