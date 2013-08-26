'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('log', 'Dumb logger for testing grunt-verbosity', function(target) {
    var settings = this.options({
      total: 5
    });

    var total = 0;

    while (total++ < settings.total) {
      grunt.log.writeln('Log message #' + total);

      var start = Date.now();

      while (Date.now() - start < 100);
    }
  });

};
