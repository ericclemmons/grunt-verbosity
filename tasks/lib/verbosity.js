/*
 * verbosity
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

module.exports = Verbosity;

function Verbosity(logger, mode, tasks) {
  this.mode     = (mode || 'normal').toUpperCase();
  this.tasks    = tasks;
  this.enabled  = false;

  var header    = logger.header;
  var writeln   = logger.writeln;

  this.init = function() {
    logger.header = this.header.bind(this);
  };

  this.disable = function() {
    logger.writeln = writeln;

    this.enabled = logger.muted = false;
  };

  this.enable = function() {
    this.enabled = logger.muted = true;

    logger.writeln = this.writeln.bind(this);
  };

  this.header = function(message) {
    var matches   = Verbosity.match(message);
    var matching  = tasks.filter(function(task) {
      return matches.indexOf(task) !== -1;
    });

    if (matching.length) {
      header.call(logger, message);
      this.enable();
    } else {
      this.disable();
      header.call(logger, message);
    }

    return logger;
  };

  this.writeln = function(message) {
    if (message && message.length) {
      var wrap = Verbosity.modes[this.mode];

      this.disable();
      logger.write(wrap(message));
      this.enable();
    }

    return logger;
  };

  if (!Verbosity.hasMode(this.mode)) {
    throw new Error('Verbosity mode not defined: ' + this.mode);
  }

  this.init();
};

Verbosity.modes = {
  'HIDDEN':   function(message) { return ''; },
  'NORMAL':   function(message) { return message + "\n"; },
  'ONELINE':  function(message) { return message + "\r"; },
  'DOT':      function(message) { return '.'; }
};

Verbosity.PATTERN = /Running\s\"(.+)\"\s\((.+)\)\stask/;

Verbosity.hasMode = function(mode) {
  return mode && Verbosity.modes.hasOwnProperty(mode);
};

Verbosity.match = function(message) {
  var matches = message && message.match(Verbosity.PATTERN);

  return matches || [];
};
