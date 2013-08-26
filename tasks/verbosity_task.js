/*
 * grunt-verbosity
 * https://github.com/ericclemmons/grunt-verbosity
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

var Verbosity = require('./lib/verbosity');

module.exports = function(grunt) {

  grunt.registerMultiTask('verbosity', 'Adjust verbosity for individual grunt tasks', function(target) {
    var name      = this.name || 'verbosity';
    var hooker    = grunt.util.hooker;
    var settings  = this.options({
      mode: 'HIDDEN'
    });

    this.requiresConfig([name, this.target, 'tasks'].join('.'));

    new Verbosity(grunt.log, settings.mode, this.data.tasks);
  });

};
