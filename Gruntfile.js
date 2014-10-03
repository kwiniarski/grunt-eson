/*
 * grunt-eson
 * https://github.com/kwiniarski/grunt-eson
 *
 * Copyright (c) 2014 Krzysztof Winiarski
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    eson: {
      options: {
        replace: {
          '{root}': 'tmp/images'
        }
      },
      defaults: {
        options: {
        },
        files: {
          'tmp/defaults.json': ['test/fixtures/database.json', 'test/fixtures/profile.json']
        }
      },
      custom: {
        options: {
          beautify: 2,
          replace: {
            '{root}': 'tmp'
          }
        },
        files: {
          'tmp/custom.json': ['test/fixtures/*.json']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'eson', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
