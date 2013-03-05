'use strict';

var grunt = require('grunt');
var Verbosity = require('../tasks/lib/verbosity');

exports.Verbosity = {
  hasMode: function(test) {
    test.expect(1);

    test.equal(false, Verbosity.hasMode('fake'));

    test.done();
  },
  match: function(test) {
    var message = 'Running "copy:fixtures" (copy) task';
    var matches = Verbosity.match(message);

    test.expect(3);

    test.equal(matches[0], message);
    test.equal(matches[1], 'copy:fixtures');
    test.equal(matches[2], 'copy');

    test.done();
  }
};

exports.verbosity = {
  setUp: function(callback) {
    this.logger = {
      write: function() {}
    };
    callback();
  },
  fakeModeThrowsError: function(test) {
    test.expect(1);

    test.throws(function() {
      var v = new Verbosity(null, 'fake');
    }, 'Error', 'Verbosity mode not defined: FAKE');

    test.done();
  },
  modeIsCapitalized: function(test) {
    var v = new Verbosity(null, 'normal');

    test.expect(1);

    test.equal('NORMAL', v.mode);

    test.done();
  },
  afterUnexpectedTask: function(test) {
    var v = new Verbosity(null, null, ['expected']);

    test.expect(2);

    test.equal(v.enabled, false);
    v.after('Running "actual:task" (actual) task');
    test.equal(v.enabled, false);

    test.done();
  },
  afterExpectedTask: function(test) {
    var v = new Verbosity(this.logger, null, ['expected']);

    test.expect(2);

    test.equal(v.enabled, false);
    v.after('Running "expected:task" (expected) task');
    test.equal(v.enabled, true);

    test.done();
  },
  afterTasks: function(test) {
    var v = new Verbosity(this.logger, null, ['expected']);

    test.expect(6);

    test.equal(v.enabled, false);
    v.before('Running "actual:task" (actual) task');
    test.equal(v.enabled, false);
    v.after('Running "actual:task" (actual) task');
    test.equal(v.enabled, false);

    test.equal(v.enabled, false);
    v.before('Running "expected:task" (expected) task');
    test.equal(v.enabled, false);
    v.after('Running "expected:task" (expected) task');
    test.equal(v.enabled, true);

    test.done();
  }
};
