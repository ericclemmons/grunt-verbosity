/*
 * grunt-verbosity
 * https://github.com/ericclemmons/grunt-verbosity
 *
 * Copyright (c) 2013 Eric Clemmons
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
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    log: {
      clear: { options: { total:  1 } },
      test: { options: {total: 5 } }
    },

    // Configuration to be run (and then tested).
    verbosity: {
      hidden: {
        tasks: ['log:test']
      },
      oneline: {
        options: { mode: 'oneline' },
        tasks: ['log:test']
      },
      normal: {
        options: { mode: 'normal' },
        tasks: ['log:test']
      },
      dot: {
        options: { mode: 'dot' },
        tasks: ['log:test']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadTasks('test');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', [
    'verbosity:hidden',   'log:test', 'log:clear',
    'verbosity:oneline',  'log:test', 'log:clear',
    'verbosity:normal',   'log:test', 'log:clear',
    'verbosity:dot',      'log:test', 'log:clear',
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
