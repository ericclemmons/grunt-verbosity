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

    test.expect(5);

    test.equal(true,        Array.isArray(Verbosity.match()));
    test.equal(true,        Array.isArray(Verbosity.match('')));
    test.equal(matches[0],  message);
    test.equal(matches[1],  'copy:fixtures');
    test.equal(matches[2],  'copy');

    test.done();
  }
};

exports.verbosity = {
  setUp: function(callback) {
    this.logger = {
      header:   function() {},
      write:    function() {},
      writeln:  function() {}
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
    var v = new Verbosity(this.logger, 'normal');

    test.expect(1);

    test.equal('NORMAL', v.mode);

    test.done();
  },
  writeln: function(test) {
    var v = new Verbosity(this.logger, 'dot');

    test.expect(3);

    this.logger.write = function(message) {
      test.equal('.', message);
    };

    test.equal(this.logger, v.writeln());
    test.equal(this.logger, v.writeln('howdy'));

    test.done();
  }
};
