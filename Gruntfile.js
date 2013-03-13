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

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    copy: {
      fixtures: {
        files: [
          { expand: true, cwd: 'test/fixtures/', src: '**', dest: 'tmp/' }
        ]
      }
    },

    // Configuration to be run (and then tested).
    verbosity: {
      hidden: {
        tasks: ['copy']
      },
      oneline: {
        options: { mode: 'oneline' },
        tasks: ['copy:fixtures']
      },
      normal: {
        options: { mode: 'normal' },
        tasks: ['copy:fixtures']
      },
      dot: {
        options: { mode: 'dot' },
        tasks: ['copy:fixtures']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'verbosity:hidden', 'copy', 'verbosity:oneline', 'copy', 'verbosity:normal', 'copy', 'verbosity:dot', 'copy', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
