/*
 * verbosity
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

module.exports = Verbosity;

function Verbosity(logger, mode, targets) {
  this.logger   = logger;
  this.mode     = (mode || 'normal').toUpperCase();
  this.targets  = targets;
  this.enabled  = false;

  this.disable = function() {
    this.enabled = logger.muted = false;
  };

  this.enable = function() {
    this.enabled = logger.muted = true;
  };

  this.before = function(message) {
    if (!message) {
      return false;
    }

    if (Verbosity.match(message)) {
      var was = this.enabled;

      this.disable();

      // Finish last modified line
      if (was) {
        logger.write("\n");
      }
    } else if (this.enabled && message) {
      this.disable();
      logger.write(this.wrap(message));
      this.enable();
    }
  };

  this.after = function(message) {
    if (!message) {
      return false;
    }

    var tasks = Verbosity.match(message);

    if (tasks) {
      var raw       = tasks[0];
      var specific  = tasks[1];
      var generic   = tasks[2];
      var targets   = this.targets.filter(function(target) {
        return tasks.indexOf(target) !== -1;
      });

      // Start modifying verbosity for expected targets
      if (targets.length) {
        this.enable();
      }
    }
  };

  this.wrap = function(message) {
    var wrapper = Verbosity.modes[this.mode];

    return wrapper(message);
  };

  if (!Verbosity.hasMode(this.mode)) {
    throw new Error('Verbosity mode not defined: ' + this.mode);
  }
};

Verbosity.modes = {
  'HIDDEN':   function(message) { return null; },
  'NORMAL':   function(message) { return message + "\n"; },
  'ONELINE':  function(message) { return message + "\r"; },
  'DOT':      function(message) { return '.'; }
};

Verbosity.PATTERN = /Running\s\"(.+)\"\s\((.+)\)\stask/;

Verbosity.hasMode = function(mode) {
  return mode && Verbosity.modes.hasOwnProperty(mode);
};

Verbosity.match = function(message) {
  return message && message.match(Verbosity.PATTERN);
};
